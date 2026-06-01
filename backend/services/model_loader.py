from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any

import joblib

from ..config import Config


@dataclass(frozen=True)
class ModelArtifacts:
    feature_columns: dict[str, Any] | None
    model: Any | None
    scaler: Any | None
    encoder: Any | None

    @property
    def is_ready(self) -> bool:
        return self.model is not None


def _load_if_exists(path: Path) -> Any | None:
    if not path.exists():
        return None

    return joblib.load(path)


@lru_cache(maxsize=1)
def load_model_artifacts() -> ModelArtifacts:
    return ModelArtifacts(
        feature_columns=_load_if_exists(Config.FEATURE_COLUMNS_PATH),
        model=_load_if_exists(Config.MODEL_PATH),
        scaler=_load_if_exists(Config.SCALER_PATH),
        encoder=_load_if_exists(Config.ENCODER_PATH),
    )
