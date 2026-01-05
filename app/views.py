from flask import Blueprint, render_template

view_router = Blueprint("views", __name__)


@view_router.get("/")
def index():
    return render_template("homepage.html")
