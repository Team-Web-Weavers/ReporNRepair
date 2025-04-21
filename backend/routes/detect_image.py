from flask import Blueprint, request, jsonify
from models.road_problem import get_road_problem_model
from PIL import Image
import io
import base64

image_detection = Blueprint('detect_problems', __name__, url_prefix="/imgdetect")

# Load model once
pipe, processor = get_road_problem_model()

@image_detection.route("/detect-problems", methods=['POST'])
def detect():
    try:
        data = request.json
        problem_type = data.get('problemType')
        base64_image = data.get('image')  # This should be raw base64 string

        # Bypass image validation if problem is not Road Damage
        if problem_type not in ["Road Damage",'Sidewalk Damage','Illegal Dumping','Fallen Tree/Branch']:
            return jsonify({"message": "Image validation bypassed for this problem type"}), 200

        if not base64_image:
            return jsonify({"message": "No image data provided"}), 400

        # Decode base64 to image bytes
        image_bytes = base64.b64decode(base64_image)
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Run inference
        prediction = pipe(image)
        label = prediction[0]['label']
        print(label)

        if "damaged" in label:
            return jsonify({"message": "Image validated successfully"}), 200
        else:
            return jsonify({"message": "No road damage detected"}), 406

    except Exception as e:
        print("Error in detection:", str(e))
        return jsonify({"message": "Error during image processing"}), 500
