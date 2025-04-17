from flask import Blueprint, jsonify

routes_bp = Blueprint("routes_bp", __name__,url_prefix="/api")

@routes_bp.route("/", methods=["GET"])
def test_route():
    return jsonify({"message": "Routes working!"})
