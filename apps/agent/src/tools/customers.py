import aiohttp
import os
from typing import Dict, Any, Optional

class CustomerTool:
    def __init__(self):
        self.api_url = os.getenv("API_URL", "http://localhost:3001")

    async def lookup_customer(self, phone: Optional[str] = None, email: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """Look up a customer by phone or email."""
        async with aiohttp.ClientSession() as session:
            params = {}
            if phone:
                params["phone"] = phone
            if email:
                params["email"] = email
            
            async with session.get(
                f"{self.api_url}/api/customers/search",
                params=params
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return data[0] if data else None
                return None

    async def create_customer(self, name: str, phone: str, email: Optional[str] = None, notes: Optional[str] = None) -> Dict[str, Any]:
        """Create a new customer."""
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.api_url}/api/customers",
                json={
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "notes": notes
                }
            ) as response:
                if response.status == 201:
                    return await response.json()
                else:
                    return {"error": f"Failed to create customer: {response.status}"}