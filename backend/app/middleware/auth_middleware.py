from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer
from backend.app.utils.jwt_utils import decode_token

class AuthMiddleware(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials = await super().__call__(request)
        if credentials:
            token = credentials.credentials
            payload = decode_token(token)
            if not payload:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
            request.state.user = payload  # Attach user to request
        else:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization")
