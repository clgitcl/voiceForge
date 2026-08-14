import aiohttp
import json
from typing import List, Dict, Any, Optional
from .provider import LLMProvider

class OllamaProvider(LLMProvider):
    def __init__(self, model: str = "llama2", base_url: str = "http://localhost:11434"):
        self.model = model
        self.base_url = base_url

    async def generate(
        self,
        prompt: str,
        context: List[Dict[str, str]],
        temperature: float = 0.7
    ) -> str:
        # Format conversation history
        messages = []
        if context:
            messages = context
        
        # Add system prompt
        messages.insert(0, {
            "role": "system",
            "content": prompt
        })

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": self.model,
                    "messages": messages,
                    "stream": False,
                    "options": {
                        "temperature": temperature,
                        "num_predict": 256
                    }
                }
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get("message", {}).get("content", "")
                else:
                    raise Exception(f"Ollama API error: {response.status}")

    async def stream(
        self,
        prompt: str,
        context: List[Dict[str, str]],
        temperature: float = 0.7
    ):
        # Implementation for streaming
        pa