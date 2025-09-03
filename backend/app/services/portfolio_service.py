from sqlalchemy.orm import Session
from backend.app.models.credit import CarbonCredit
from typing import List

def get_portfolio(db: Session, company_id: int) -> List[CarbonCredit]:
    """
    Fetch all carbon credits owned by a specific company.
    """
    return db.query(CarbonCredit).filter(CarbonCredit.owner_id == company_id).all()
