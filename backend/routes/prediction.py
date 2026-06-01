from flask import Blueprint, jsonify, request

from ..services.prediction_service import PredictionService
from ..utils.validators import validate_prediction_payload

prediction_bp = Blueprint("prediction", __name__)
prediction_service = PredictionService()


@prediction_bp.post("/predict")
def predict():
    payload = request.get_json(silent=True)
    validation_error = validate_prediction_payload(payload)

    if validation_error:
        return jsonify({"error": validation_error}), 400

    result = prediction_service.predict(payload)
    return jsonify(result)
