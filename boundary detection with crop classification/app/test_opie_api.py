import asyncio
import httpx

async def test_opie_api():
    api_key = "09fac56e-fdcf-460a-9f39-05a2bda3f3cf"
    base_url = "https://api.opie.com"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    test_data = {
        "image_url": "https://example.com/test-crop-image.jpg",
        "detection_type": "crop_boundary",
        "confidence_threshold": 0.6
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        print("Testing OPIE API connection...")
        health_response = await client.get(f"{base_url}/health", headers=headers)
        print(f"Health check status: {health_response.status_code}")
        response = await client.post(
            f"{base_url}/boundary-detection", headers=headers, json=test_data)
        print(f"API Response Status: {response.status_code}")
        print(f"API Response: {response.text}")
        if response.status_code == 200:
            print("✅ OPIE API is working correctly!")
        else:
            print(f"❌ API returned error: {response.status_code}")
if __name__ == "__main__":
    asyncio.run(test_opie_api())

