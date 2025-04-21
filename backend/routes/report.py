import base64
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database.db_config import get_db_connection
import psycopg2
import datetime

complaints_bp = Blueprint("complaints_bp", __name__, url_prefix="/complaints")

@complaints_bp.route("/submit-complaints", methods=["POST"])
@cross_origin()
def create_complaint():
    try:
        # Get form data (JSON + FormData mixed)
        category = request.json.get("problemType")  # corresponds to problem_type
        location = request.json.get("location")
        description = request.json.get("description")
        userid = request.json.get("userid")
        submitted_at = request.json.get("date")  # date (yyyy-mm-dd)
        image_file = request.files.get("image")
        print(request.json)

        # Check required fields
        if not all([category, location, description, userid, submitted_at]):
            return jsonify({"error": "Missing required fields"}), 400

        # Convert image to base64
        image_base64 = None
        if image_file:
            image_data = image_file.read()
            image_base64 = base64.b64encode(image_data).decode("utf-8")

        # Save to PostgreSQL
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO complaints (problem_type, location, description, userid, image_data, submitted_at)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            category,
            location,
            description,
            userid,
            image_base64,
            submitted_at
        ))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Complaint submitted successfully"}), 201

    except psycopg2.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
