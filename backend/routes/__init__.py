from flask import Flask

from .health import health_bp
from .prediction import prediction_bp


def register_routes(app: Flask) -> None:
    app.register_blueprint(health_bp)
    app.register_blueprint(prediction_bp)
