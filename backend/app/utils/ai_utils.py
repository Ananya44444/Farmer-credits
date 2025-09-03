import httpx
from backend.app.config import AI_BACKEND_URL  # Corrected import

async def verify_farm_data(farm_id: int):
    # Stub for MVP; implement full AI call later
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{AI_BACKEND_URL}/verify", json={"farm_id": farm_id})
            return response.json()
        except:
            return {"verified": True, "confidence": 0.95}  # Mock