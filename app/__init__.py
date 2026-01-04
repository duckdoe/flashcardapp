from flask import Flask
from app.routes import router
from app.models import create_tables

app = Flask(__name__)


def create_app():
    app.register_blueprint(router)
    create_tables()
    return app
