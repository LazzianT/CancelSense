from __future__ import annotations

from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from sklearn.metrics import f1_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from xgboost import XGBClassifier

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATASET_PATH = PROJECT_ROOT / "developer" / "hotel_booking.csv"
MODEL_DIR = PROJECT_ROOT / "backend" / "model"
RANDOM_STATE = 42
TARGET_COLUMN = "is_canceled"

NUMERIC_FEATURES = [
    "lead_time",
    "previous_cancellations",
    "booking_changes",
    "total_of_special_requests",
    "adr",
    "stays_in_weekend_nights",
    "stays_in_week_nights",
]

CATEGORICAL_FEATURES = [
    "deposit_type",
    "market_segment",
    "customer_type",
]

SELECTED_FEATURES = [
    "lead_time",
    "deposit_type",
    "market_segment",
    "customer_type",
    "previous_cancellations",
    "booking_changes",
    "total_of_special_requests",
    "adr",
    "stays_in_weekend_nights",
    "stays_in_week_nights",
]


@dataclass(frozen=True)
class ExportMetadata:
    categorical_features: list[str]
    encoded_feature_names: list[str]
    final_feature_order: list[str]
    model_type: str
    numeric_features: list[str]
    selected_features: list[str]
    target_column: str
    test_metrics: dict[str, float]


def load_dataset(path: Path = DATASET_PATH) -> pd.DataFrame:
    return pd.read_csv(path)


def clean_dataset(df: pd.DataFrame) -> pd.DataFrame:
    cleaned = df.copy()
    cleaned["children"] = cleaned["children"].fillna(0)
    cleaned.loc[cleaned["adr"] < 0, "adr"] = cleaned["adr"].median()
    cleaned = cleaned[cleaned["adults"] != 0]
    cleaned = cleaned[cleaned["children"] != 10]
    cleaned = cleaned[cleaned["babies"] != 10]
    cleaned = cleaned.dropna(subset=SELECTED_FEATURES + [TARGET_COLUMN])
    return cleaned.reset_index(drop=True)


def build_feature_matrix(
    df: pd.DataFrame,
    scaler: StandardScaler | None = None,
    encoder: OneHotEncoder | None = None,
    fit: bool = False,
) -> tuple[pd.DataFrame, StandardScaler, OneHotEncoder, list[str]]:
    numeric_frame = df[NUMERIC_FEATURES].astype(float)
    categorical_frame = df[CATEGORICAL_FEATURES].astype(str)

    if fit:
        scaler = StandardScaler()
        encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
        scaled_numeric = scaler.fit_transform(numeric_frame)
        encoded_categorical = encoder.fit_transform(categorical_frame)
    else:
        if scaler is None or encoder is None:
            raise ValueError("scaler and encoder are required when fit=False")
        scaled_numeric = scaler.transform(numeric_frame)
        encoded_categorical = encoder.transform(categorical_frame)

    encoded_feature_names = encoder.get_feature_names_out(CATEGORICAL_FEATURES).tolist()
    final_feature_order = NUMERIC_FEATURES + encoded_feature_names

    numeric_output = pd.DataFrame(scaled_numeric, columns=NUMERIC_FEATURES, index=df.index)
    categorical_output = pd.DataFrame(
        encoded_categorical,
        columns=encoded_feature_names,
        index=df.index,
    )
    features = pd.concat([numeric_output, categorical_output], axis=1)
    return features[final_feature_order], scaler, encoder, final_feature_order


def train_model(X_train: pd.DataFrame, y_train: pd.Series) -> XGBClassifier:
    negative_count = int((y_train == 0).sum())
    positive_count = int((y_train == 1).sum())
    scale_pos_weight = negative_count / positive_count

    model = XGBClassifier(
        colsample_bytree=0.9,
        eval_metric="logloss",
        learning_rate=0.1,
        max_depth=7,
        n_estimators=250,
        n_jobs=-1,
        random_state=RANDOM_STATE,
        scale_pos_weight=scale_pos_weight,
        subsample=0.8,
    )
    model.fit(X_train, y_train)
    return model


def evaluate_model(model: XGBClassifier, X_test: pd.DataFrame, y_test: pd.Series) -> dict[str, float]:
    predictions = model.predict(X_test)
    probabilities = model.predict_proba(X_test)[:, 1]

    return {
        "f1": round(f1_score(y_test, predictions), 4),
        "precision": round(precision_score(y_test, predictions), 4),
        "recall": round(recall_score(y_test, predictions), 4),
        "roc_auc": round(roc_auc_score(y_test, probabilities), 4),
    }


def export_artifacts(
    model: XGBClassifier,
    scaler: StandardScaler,
    encoder: OneHotEncoder,
    metadata: ExportMetadata,
    model_dir: Path = MODEL_DIR,
) -> None:
    model_dir.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, model_dir / "model.pkl")
    joblib.dump(scaler, model_dir / "scaler.pkl")
    joblib.dump(encoder, model_dir / "encoder.pkl")
    joblib.dump(asdict(metadata), model_dir / "feature_columns.pkl")


def run_export() -> dict[str, Any]:
    raw_df = load_dataset()
    df = clean_dataset(raw_df)
    X = df[SELECTED_FEATURES]
    y = df[TARGET_COLUMN].astype(int)

    X_train_raw, X_test_raw, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=RANDOM_STATE,
        stratify=y,
    )

    X_train, scaler, encoder, final_feature_order = build_feature_matrix(X_train_raw, fit=True)
    X_test, _, _, _ = build_feature_matrix(
        X_test_raw,
        scaler=scaler,
        encoder=encoder,
        fit=False,
    )

    model = train_model(X_train, y_train)
    metrics = evaluate_model(model, X_test, y_test)

    metadata = ExportMetadata(
        categorical_features=CATEGORICAL_FEATURES,
        encoded_feature_names=encoder.get_feature_names_out(CATEGORICAL_FEATURES).tolist(),
        final_feature_order=final_feature_order,
        model_type="XGBClassifier",
        numeric_features=NUMERIC_FEATURES,
        selected_features=SELECTED_FEATURES,
        target_column=TARGET_COLUMN,
        test_metrics=metrics,
    )
    export_artifacts(model, scaler, encoder, metadata)

    return {
        "artifacts_dir": str(MODEL_DIR),
        "metrics": metrics,
        "selected_features": SELECTED_FEATURES,
        "transformed_feature_count": len(final_feature_order),
    }


if __name__ == "__main__":
    result = run_export()
    print("CancelSense ML export complete")
    print(result)
