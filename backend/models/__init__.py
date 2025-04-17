from flask import Blueprint, jsonify

models_bp = Blueprint("models_bp", __name__,url_prefix="/models")

@models_bp.route("/", methods=["GET"])
def test_model():
    return jsonify({"message": "Models working!"})
