from flask import Blueprint, request, jsonify
from ollama import chat, ChatResponse
import psycopg2

image_detection = Blueprint('detect_problems', __name__,url_prefix="/imgdetect")

image_detection.route("/detect-problems",methods=['POST'])
def detect():
    return " hello "