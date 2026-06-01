from pathlib import Path


class Config:
    BASE_DIR = Path(__file__).resolve().parent
    MODEL_DIR = BASE_DIR / "model"
    MODEL_PATH = MODEL_DIR / "model.pkl"
    SCALER_PATH = MODEL_DIR / "scaler.pkl"
    ENCODER_PATH = MODEL_DIR / "encoder.pkl"
    FEATURE_COLUMNS_PATH = MODEL_DIR / "feature_columns.pkl"
    CORS_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]
    JSON_SORT_KEYS = False
