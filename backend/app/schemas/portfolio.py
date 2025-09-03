from pydantic import BaseModel

class CreditItem(BaseModel):
    id: int
    amount: int
    blockchain_tx: str