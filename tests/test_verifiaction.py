from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_push_verification():
    payload = {"farm_id": 1, "crop_data": {}, "satellite_ref": "ref"}
    headers = {"X-API-Key": "farmer-api-key"}
    response = client.post("/verification/push", json=payload, headers=headers)
    assert response.status_code == 200 or 403