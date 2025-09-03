from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from backend.app.models.base import Base  # Fixed import

class CarbonCredit(Base):
    __tablename__ = "credits"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    amount = Column(Integer)  # CO2 tonnes
    available = Column(Boolean, default=True)
    blockchain_tx = Column(String, nullable=True)  # Store tx hash
