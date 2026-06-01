from flask import Flask
from flask_cors import CORS

from .config import Config
from .routes import register_routes


def create_app(config_class: type[Config] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, resources={r"/*": {"origins": app.config["CORS_ORIGINS"]}})
    register_routes(app)

    return app
