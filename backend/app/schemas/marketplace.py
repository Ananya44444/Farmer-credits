from pydantic import BaseModel


class CreditListing(BaseModel):
    id: int
    amount: int
    available: bool

class PurchaseRequest(BaseModel):
    credit_id: int