from pydantic import BaseModel
from typing import List, Dict, Any

class TrendsResponse(BaseModel):
    trends: List[Dict[str, Any]]  # ✅ fixed

class ROIResponse(BaseModel):
    roi: float

