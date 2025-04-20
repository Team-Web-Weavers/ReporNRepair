from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database.db_config import get_db_connection  # Make sure path is correct
import psycopg2
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


auth = Blueprint('auth', __name__,url_prefix="/auth")

# Email Configuration
EMAIL_ADDRESS = "eduler.notes@gmail.com"
EMAIL_PASSWORD = "clkipyqkgcayzmbk"

# Function to send email
def send_email(to_email, user_name):
    subject = "Welcome to Our Platform"
    body = f"Hello {user_name},\n\nThank you for registering!\n\nBest regards,\nTeam Eduler"

    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


# Route to Register User
@auth.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        userid=data.get("user_id")
        name=data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")
 
        hashed_password = generate_password_hash(password)
        

        # PostgreSQL Insert
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (userid, name,role, email, password) VALUES (%s,%s, %s, %s, %s)",
            (userid, name,role, email, hashed_password)
        )
        conn.commit()
        cur.close()
        conn.close()

        # Send confirmation email
        if send_email(email, name):
            return jsonify({"message": "Registration successful. Confirmation email sent!"}), 201
        else:
            return jsonify({"message": "User registered, but email could not be sent."}), 201

    except psycopg2.errors.UniqueViolation:
        return jsonify({"error": "Email already exists."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@auth.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        conn = get_db_connection()
        cur = conn.cursor()

        # Fetch user from database
        cur.execute("SELECT userid, password, role FROM users WHERE email = %s", (email,))
        user = cur.fetchone()

        if user:
            userid, hashed_password, role = user

            if check_password_hash(hashed_password, password):
                return jsonify({
            'status': 'success',
            'message': 'Login successful',
            'userid': userid,
            'userType': role
        }), 200
            else:
                return jsonify({'status': 'error', 'message': 'Incorrect password'}), 401
        else:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404


    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()
