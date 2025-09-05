import os
from dotenv import load_dotenv

def setup_environment():
    """Setup environment variables and verify API keys"""
    load_dotenv()
    opie_key = os.getenv("OPIE_API_KEY", "09fac56e-fdcf-460a-9f39-05a2bda3f3cf")
    os.environ["OPIE_API_KEY"] = opie_key
    if len(opie_key) != 36 or opie_key.count('-') != 4:
        print("⚠️  Warning: OPIE API key format seems incorrect")
    else:
        print(f"✅ OPIE API key loaded: {opie_key[:8]}...{opie_key[-4:]}")
    return opie_key

if __name__ == "__main__":
    setup_environment()
    print("Environment setup complete!")
