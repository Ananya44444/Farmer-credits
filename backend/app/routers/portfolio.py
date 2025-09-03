from fastapi import APIRouter, Depends
from backend.app.schemas.portfolio import CreditItem  # Corrected import
from backend.app.services.portfolio_service import get_portfolio
from backend.app.database import get_db
from backend.app.dependencies import get_current_user

router = APIRouter()

@router.get("/credits", response_model=list[CreditItem])
def fetch_portfolio(db=Depends(get_db), user=Depends(get_current_user)):
    return get_portfolio(db, user["company_id"])
