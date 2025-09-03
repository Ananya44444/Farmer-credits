from pydantic import BaseModel
from typing import Dict, Any  # ✅ use Any, not 'any'

class VerificationQueueItem(BaseModel):
    farm_id: int
    crop_data: Dict[str, Any]  # ✅ fixed
    satellite_ref: str

class ReviewDecision(BaseModel):
    queue_id: int
    status: str  # pending, approved, rejected
