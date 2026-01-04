from flask import Flask
from app.routes import router

app = Flask(__name__)


def create_app():
    app.register_blueprint(router)
    return app
