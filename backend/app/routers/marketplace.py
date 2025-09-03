from fastapi import APIRouter, Depends, HTTPException
from backend.app.schemas.marketplace import CreditListing, PurchaseRequest  # Corrected import
from backend.app.services.marketplace_service import list_credits, purchase_credit
from backend.app.database import get_db
from backend.app.dependencies import get_current_user

router = APIRouter()

@router.get("/credits", response_model=list[CreditListing])
def get_credits(db=Depends(get_db)):
    return list_credits(db)

@router.post("/purchase", response_model=dict)
def buy_credit(request: PurchaseRequest, db=Depends(get_db), user=Depends(get_current_user)):
    try:
        return purchase_credit(db, request.credit_id, user["company_id"])
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
