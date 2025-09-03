from dotenv import load_dotenv
import os

load_dotenv("infra/.env")

DATABASE_URL = os.getenv("DATABASE_URL")
JWT_SECRET = os.getenv("JWT_SECRET")
POLYGON_RPC = os.getenv("POLYGON_RPC")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
AI_BACKEND_URL = os.getenv("AI_BACKEND_URL")
FARMER_BACKEND_API_KEY = os.getenv("FARMER_BACKEND_API_KEY")