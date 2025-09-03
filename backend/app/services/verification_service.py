from sqlalchemy.orm import Session
from backend.app.models.verification import Verification
from backend.app.schemas.verification import VerificationQueueItem
from backend.app.utils.ai_utils import verify_farm_data

def add_to_verification_queue(db: Session, data: VerificationQueueItem):
    queue_item = Verification(
        farm_id=data.farm_id,
        crop_data=data.crop_data,
        satellite_ref=data.satellite_ref,
        status="pending"
    )
    db.add(queue_item)
    db.commit()
    db.refresh(queue_item)
    # Optional: Call AI stub for verification
    verify_farm_data(queue_item.farm_id)
    return queue_item.id

def get_verification_queue(db: Session, company_id: int):
    # Assuming company can see all pending items for now
    return db.query(Verification).filter(Verification.status == "pending").all()

def review_verification(db: Session, queue_id: int, status: str):
    item = db.query(Verification).filter(Verification.id == queue_id).first()
    if not item:
        raise ValueError("Queue item not found")
    item.status = status
    db.commit()
    return {"status": "updated"}
