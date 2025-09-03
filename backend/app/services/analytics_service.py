from sqlalchemy.orm import Session
from backend.app.models.credit import CarbonCredit
from typing import List, Dict, Any

def get_trends(db: Session, company_id: int) -> List[Dict[str, Any]]:
    credits = db.query(CarbonCredit).filter(CarbonCredit.owner_id == company_id).all()
    # Simple mock trends calculation
    trends = [{"date": "2025-09-01", "amount": sum(c.amount for c in credits)}]
    return trends

def calculate_roi(db: Session, company_id: int) -> float:
    credits = db.query(CarbonCredit).filter(CarbonCredit.owner_id == company_id).all()
    # Simple mock ROI
    total = sum(c.amount for c in credits)
    return total * 0.05  # 5% ROI
