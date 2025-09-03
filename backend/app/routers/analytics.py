from fastapi import APIRouter, Depends
from backend.app.schemas.analytics import TrendsResponse, ROIResponse  # Corrected import
from backend.app.services.analytics_service import get_trends, calculate_roi
from backend.app.database import get_db
from backend.app.dependencies import get_current_user

router = APIRouter()

@router.get("/trends", response_model=TrendsResponse)
def fetch_trends(db=Depends(get_db), user=Depends(get_current_user)):
    return get_trends(db, user["company_id"])

@router.get("/roi", response_model=ROIResponse)
def fetch_roi(db=Depends(get_db), user=Depends(get_current_user)):
    return calculate_roi(db, user["company_id"])