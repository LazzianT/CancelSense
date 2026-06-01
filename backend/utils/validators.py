from typing import Any

REQUIRED_PREDICTION_FIELDS = {
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
}


def validate_prediction_payload(payload: Any) -> str | None:
    if not isinstance(payload, dict):
        return "Request body must be a JSON object."

    missing_fields = sorted(REQUIRED_PREDICTION_FIELDS - payload.keys())

    if missing_fields:
        return f"Missing required fields: {', '.join(missing_fields)}."

    return None
