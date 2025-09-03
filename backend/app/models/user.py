from sqlalchemy import Column, Integer, String
from backend.app.models.base import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)  # Hashed in production
    role = Column(String, default="company")

