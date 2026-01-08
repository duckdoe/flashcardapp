from flask import Blueprint, render_template

view_router = Blueprint("views", __name__)


@view_router.get("/")
def index_page():
    return render_template("homepage.html")


@view_router.get("/edit/<id>")
def edit_page(id):
    return render_template("edit-page.html")
