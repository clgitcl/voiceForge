import aiohttp
import os
from typing import Dict, Any, Optional
from datetime import datetime

class CalendarTool:
    def __init__(self):
        self.api_url = os.getenv("API_URL", "http://localhost:3001")

    async def schedule_appointment(
        self,
        customer_id: str,
        date: str,
        time: str,
        duration: int = 30,
        type: str = "consultation",
        notes: Optional[str] = None
    ) -> Dict[str, Any]:
        """Schedule an appointment."""
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.api_url}/api/appointments",
                json={
                    "customerId": customer_id,
                    "date": f"{date}T{time}:00Z",
                    "duration": duration,
                    "type": type,
                    "notes": notes
                }
            ) as response:
                if response.status == 201:
                    return await response.json()
                else:
                    return {"error": f"Failed to schedule appointment: {response.status}"}

    async def get_availability(self, date: str) -> Dict[str, Any]:
        """Get available time slots for a date."""
        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.api_url}/api/appointments/availability",
                params={"date": date}
            ) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    return {"error": f"Failed to get availability: {response.status}"}