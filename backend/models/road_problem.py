from transformers import AutoModelForImageClassification, AutoImageProcessor, pipeline

def get_road_problem_model():
    """
    Load and return the bone fracture detection model.
    """
    pipe = pipeline("image-classification", model="edixo/road_good_damaged_condition")
    processor = AutoImageProcessor.from_pretrained("edixo/road_good_damaged_condition")
    model = AutoModelForImageClassification.from_pretrained("edixo/road_good_damaged_condition")
    
    return pipe, processor