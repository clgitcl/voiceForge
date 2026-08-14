import aiohttp
import os
from typing import List, Dict, Any

class KnowledgeTool:
    def __init__(self):
        self.api_url = os.getenv("API_URL", "http://localhost:3001")

    async def search(self, query: str, category: Optional[str] = None) -> List[Dict[str, Any]]:
        """Search the knowledge base."""
        async with aiohttp.ClientSession() as session:
            params = {"q": query}
            if category:
                params["category"] = category
            
            async with session.get(
                f"{self.api_url}/api/knowledge/search",
                params=params
            ) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    return []

    async def get_entry(self, entry_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific knowledge base entry."""
        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.api_url}/api/knowledge/{entry_id}"
            ) as response:
                if response.status == 200:
                    return await response.json()
                return None