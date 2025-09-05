from pydantic import BaseModel
from typing import List, Dict, Any

class CropClassificationRequest(BaseModel):
    image_url: str

class CropClassificationResponse(BaseModel):
    results: List[Dict[str, Any]]
