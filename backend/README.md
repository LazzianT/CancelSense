# CancelSense Backend

Flask API foundation for the CancelSense hotel booking cancellation prediction dashboard.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
python -m backend.app
```

## Endpoints

- `GET /health`
- `POST /predict`

The `/predict` endpoint loads exported artifacts from `backend/model/` when they are available.

## ML Export

```bash
source .venv/bin/activate
python -m backend.ml.train_export
```

The export workflow writes:

- `backend/model/model.pkl`
- `backend/model/scaler.pkl`
- `backend/model/encoder.pkl`
- `backend/model/feature_columns.pkl`

The production inference contract follows the PRD prediction form fields:

- `lead_time`
- `deposit_type`
- `market_segment`
- `customer_type`
- `previous_cancellations`
- `booking_changes`
- `total_of_special_requests`
- `adr`
- `stays_in_weekend_nights`
- `stays_in_week_nights`

`adr` is accepted from the frontend in Indonesian Rupiah and converted to USD during inference using `1 USD = Rp17,500`, because the trained model expects ADR in the dataset's original scale.
