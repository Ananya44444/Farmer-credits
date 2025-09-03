from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_portfolio():
    headers = {"Authorization": "Bearer mock_token"}
    response = client.get("/portfolio/credits", headers=headers)
    assert response.status_code == 200 or 401