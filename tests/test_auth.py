from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.main import app
from app.models.user import User
from app.database import Base, get_db
from app.config import DATABASE_URL

client = TestClient(app)

# Use in-memory DB for tests
TEST_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

def test_login():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    db.add(User(username="test", password="test", role="company"))
    db.commit()
    db.close()
    response = client.post("/auth/login", data={"username": "test", "password": "test"})
    assert response.status_code == 200
    Base.metadata.drop_all(bind=engine)