from sqlalchemy.orm import Session
from backend.app.models.user import User
from typing import Optional

def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    """
    Authenticate a user by username and password.
    Returns the User object if valid, else None.
    """
    # In production, use hashed passwords
    user = db.query(User).filter(User.username == username, User.password == password).first()
    return user
