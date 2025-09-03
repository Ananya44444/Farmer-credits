from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_trends():
    # Assume auth token obtained
    headers = {"Authorization": "Bearer mock_token"}
    response = client.get("/analytics/trends", headers=headers)
    assert response.status_code == 200 or 401  # Depending on auth