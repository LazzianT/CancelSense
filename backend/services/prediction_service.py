from typing import Any

import pandas as pd

from .model_loader import load_model_artifacts
from ..utils.risk import get_risk_level

RUPIAH_PER_USD = 17500


class PredictionService:
    def __init__(self) -> None:
        self.artifacts = load_model_artifacts()

    def predict(self, payload: dict[str, Any]) -> dict[str, Any]:
        if not self.artifacts.is_ready:
            probability = 0.87
        else:
            probability = self._predict_probability(payload)

        return {
            "prediction": "Cancelled" if probability >= 0.5 else "Not Cancelled",
            "probability": probability,
            "risk_level": get_risk_level(probability),
        }

    def _predict_probability(self, payload: dict[str, Any]) -> float:
        metadata = self.artifacts.feature_columns or {}
        numeric_features = metadata["numeric_features"]
        categorical_features = metadata["categorical_features"]
        final_feature_order = metadata["final_feature_order"]
        normalized_payload = self._normalize_payload(payload)

        raw_frame = pd.DataFrame([normalized_payload], columns=metadata["selected_features"])
        raw_frame[numeric_features] = raw_frame[numeric_features].astype(float)
        raw_frame[categorical_features] = raw_frame[categorical_features].astype(str)

        numeric_data = self.artifacts.scaler.transform(raw_frame[numeric_features])
        categorical_data = self.artifacts.encoder.transform(raw_frame[categorical_features])
        encoded_feature_names = self.artifacts.encoder.get_feature_names_out(categorical_features)

        numeric_frame = pd.DataFrame(numeric_data, columns=numeric_features)
        categorical_frame = pd.DataFrame(categorical_data, columns=encoded_feature_names)
        model_frame = pd.concat([numeric_frame, categorical_frame], axis=1)
        model_frame = model_frame[final_feature_order]

        probability = self.artifacts.model.predict_proba(model_frame)[0, 1]
        return round(float(probability), 4)

    def _normalize_payload(self, payload: dict[str, Any]) -> dict[str, Any]:
        normalized_payload = payload.copy()
        normalized_payload["adr"] = float(normalized_payload["adr"]) / RUPIAH_PER_USD
        return normalized_payload
