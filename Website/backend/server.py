from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from model import MedicalImageClassifier
import tempfile
import os

app = FastAPI()

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the classifier
classifier = MedicalImageClassifier()

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(await file.read())
        temp_path = temp_file.name
    
    try:
        # Classify the image
        results = classifier.classify_image(temp_path)
        return {"analysis": results}
    finally:
        # Clean up temporary file
        os.unlink(temp_path)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)