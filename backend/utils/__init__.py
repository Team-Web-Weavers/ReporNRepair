from flask import Blueprint, jsonify

utils_bp = Blueprint("utils_bp", __name__,url_prefix="/utils")

@utils_bp.route("/", methods=["GET"])
def test_util():
    return jsonify({"message": "Utils working!"})
