from fastapi import FastAPI
from backend.app.routers import auth, analytics, marketplace, portfolio, verification
from backend.app.database import engine
from backend.app.models.base import Base

app = FastAPI(title="Company Dashboard API", version="0.1.0", docs_url="/docs")

# Create DB tables (for dev; use migrations later)
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(marketplace.router, prefix="/marketplace", tags=["Marketplace"])
app.include_router(portfolio.router, prefix="/portfolio", tags=["Portfolio"])
app.include_router(verification.router, prefix="/verification", tags=["Verification"])

