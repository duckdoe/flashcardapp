from flask import Flask
from app.api import api_router
from app.views import view_router

app = Flask(__name__)


def create_app():
    app.register_blueprint(view_router)
    app.register_blueprint(api_router)
    return app
