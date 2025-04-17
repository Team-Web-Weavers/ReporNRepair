from flask import Flask
from flask_cors import CORS

# Import Blueprints
from routes import routes_bp
from models import models_bp
from utils import utils_bp
from database import database_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(routes_bp)
app.register_blueprint(models_bp)
app.register_blueprint(utils_bp)
app.register_blueprint(database_bp)

if __name__ == "__main__":
    app.run(debug=True)
