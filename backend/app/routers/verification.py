from fastapi import APIRouter, Depends, HTTPException
from backend.app.schemas.verification import VerificationQueueItem, ReviewDecision  # Corrected import
from backend.app.services.verification_service import add_to_verification_queue, get_verification_queue, review_verification
from backend.app.database import get_db
from backend.app.dependencies import verify_api_key, get_current_user

router = APIRouter()

@router.post("/push", response_model=dict)
def push_verification(data: VerificationQueueItem, db=Depends(get_db), api_key=Depends(verify_api_key)):
    # Called by farmer backend
    try:
        queue_id = add_to_verification_queue(db, data)
        return {"status": "success", "queue_id": queue_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/queue", response_model=list[VerificationQueueItem])
def get_queue(db=Depends(get_db), user=Depends(get_current_user)):
    return get_verification_queue(db, user["company_id"])

@router.post("/review", response_model=dict)
def post_review(decision: ReviewDecision, db=Depends(get_db), user=Depends(get_current_user)):
    return review_verification(db, decision.queue_id, decision.status)
