import httpx
import os
from typing import Dict, List, Any
from .gemini_service import GeminiService

class ClassificationService:
    def __init__(self):
        self.gemini_service = GeminiService()
        self.opie_api_key = os.getenv("OPIE_API_KEY", "09fac56e-fdcf-460a-9f39-05a2bda3f3cf")
        self.opie_base_url = os.getenv("OPIE_API_URL", "https://api.opie.com")
        if not self.opie_api_key:
            raise ValueError("OPIE API key is required")
    async def detect_boundaries(self, image_url: str, params: Dict = None) -> List[Dict[str, Any]]:
        headers = {
            "Authorization": f"Bearer {self.opie_api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        request_data = {
            "image_url": image_url,
            "detection_type": params.get("detection_type", "crop_boundary") if params else "crop_boundary",
            "confidence_threshold": params.get("confidence_threshold", 0.6) if params else 0.6,
            "output_format": "json"
        }
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.opie_base_url}/boundary-detection",
                headers=headers,
                json=request_data
            )
            response.raise_for_status()
            result = response.json()
            return result.get("results", [])
