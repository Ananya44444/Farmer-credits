from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_credits():
    response = client.get("/marketplace/credits")
    assert response.status_code == 200