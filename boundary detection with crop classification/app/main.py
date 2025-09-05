import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(
    title="Crop Classification API with OPIE Integration",
    description="AI-powered crop classification system with OPIE boundary detection",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from services.gemini_service import GeminiService
from services.classification_service import ClassificationService
from services.confidence_service import ConfidenceService
from models.crop_types import CropClassificationRequest, CropClassificationResponse
from utils.image_preprocessing import ImagePreprocessor

gemini_service = GeminiService()
classification_service = ClassificationService()
confidence_service = ConfidenceService()
image_preprocessor = ImagePreprocessor()

@app.get("/health")
async def health_check():
    return {"status": "up"}

# Example endpoint stub for crop boundary detection
@app.post("/boundary-detection")
async def boundary_detection(request: CropClassificationRequest):
    try:
        result = await classification_service.detect_boundaries(request.image_url)
        return CropClassificationResponse(results=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
