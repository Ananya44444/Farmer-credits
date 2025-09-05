import os

class Config:
    OPIE_API_KEY = "09fac56e-fdcf-460a-9f39-05a2bda3f3cf"
    OPIE_API_URL = "https://api.opie.com"
    GEMINI_API_KEY = "your_gemini_key_here"
    @classmethod
    def get_opie_key(cls):
        return os.getenv("OPIE_API_KEY", cls.OPIE_API_KEY)
