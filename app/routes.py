from flask import Blueprint, render_template

router = Blueprint("routes", __name__)


@router.get("/")
def greet():
    return render_template("greet.html")
