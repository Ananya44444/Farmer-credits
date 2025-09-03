from sqlalchemy import Column, Integer, String, JSON
from backend.app.models.base import Base

class Verification(Base):
    __tablename__ = "verifications"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer)
    crop_data = Column(JSON)
    satellite_ref = Column(String)
    status = Column(String, default="pending")  # pending, approved, rejected
