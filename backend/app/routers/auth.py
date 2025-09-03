from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from backend.app.schemas.auth import TokenResponse
from backend.app.services.auth_service import authenticate_user
from backend.app.utils.jwt_utils import create_access_token, decode_token  # Added decode_token
from backend.app.database import get_db
from backend.app.dependencies import oauth2_scheme  # Added import for oauth2_scheme

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"company_id": user.id, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/refresh", response_model=TokenResponse)
def refresh(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    new_token = create_access_token(data={"company_id": payload["company_id"], "role": payload["role"]})
    return {"access_token": new_token, "token_type": "bearer"}
