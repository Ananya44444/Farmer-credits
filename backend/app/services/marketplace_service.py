from sqlalchemy.orm import Session
from backend.app.models.credit import CarbonCredit
from backend.app.utils.blockchain_utils import purchase_on_blockchain
from typing import Any, Dict, List

def list_credits(db: Session) -> List[CarbonCredit]:
    """
    Return all available carbon credits.
    """
    return db.query(CarbonCredit).filter(CarbonCredit.available == True).all()

def purchase_credit(db: Session, credit_id: int, company_id: int) -> Dict[str, Any]:
    """
    Purchase a carbon credit and record the blockchain transaction.
    """
    credit = db.query(CarbonCredit).filter(CarbonCredit.id == credit_id).first()
    if not credit or not credit.available:
        raise ValueError("Credit unavailable")

    tx_hash = purchase_on_blockchain(credit_id, company_id)
    credit.owner_id = company_id
    credit.available = False
    credit.blockchain_tx = tx_hash
    db.commit()

    return {"status": "success", "tx_hash": tx_hash}
