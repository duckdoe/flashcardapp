from flask import Blueprint, render_template, request, jsonify
from app.security import verify_hash
from app.models import select_user_by_email

router = Blueprint("routes", __name__)


@router.get("/login")
def greet():
    return render_template("login.html")


@router.post("/login")
def process_login():
    form = request.form

    email = form.get("email")
    password = form.get("password")

    user = select_user_by_email(email=email)

    if not user:
        return jsonify(error="")

    is_same_password = verify_hash(password, user.get("password"))
    if not is_same_password:
        return jsonify(error="incorrect password", status_code=403), 403

    return jsonify(access_token=)