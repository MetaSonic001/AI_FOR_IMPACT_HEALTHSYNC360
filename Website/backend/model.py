from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
import numpy as np

class MedicalImageClassifier:
    def __init__(self, model_name="microsoft/resnet-50"):
        self.processor = AutoImageProcessor.from_pretrained(model_name)
        self.model = AutoModelForImageClassification.from_pretrained(model_name)
        self.model.eval()

    def preprocess_image(self, image_path):
        image = Image.open(image_path).convert("RGB")
        inputs = self.processor(images=image, return_tensors="pt")
        return inputs

    def classify_image(self, image_path):
        inputs = self.preprocess_image(image_path)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            
        # Get top 5 predictions
        probabilities = torch.nn.functional.softmax(logits, dim=-1)
        top_5_indices = probabilities.topk(5).indices[0]
        
        results = []
        for idx in top_5_indices:
            label = self.model.config.id2label[idx.item()]
            score = probabilities[0][idx].item()
            results.append({
                "label": label,
                "score": float(score)
            })
        
        return results
