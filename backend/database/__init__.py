from flask import Blueprint, jsonify
from .db_config import get_db_connection

database_bp = Blueprint('database', __name__,url_prefix="/database")

@database_bp.route('/', methods=['GET'])
def check_db_connection():
    try:
        connection = get_db_connection()
        connection.close()
        return jsonify({"status": "success", "message": "Database connection successful"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500