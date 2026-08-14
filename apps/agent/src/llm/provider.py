from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class LLMProvider(ABC):
    @abstractmethod
    async def generate(
        self,
        prompt: str,
        context: List[Dict[str, str]],
        temperature: float = 0.7
    ) -> str:
        pass

    @abstractmethod
    async def stream(
        self,
        prompt: str,
        context: List[Dict[str, str]],
        temperature: float = 0.7
    ):
        pass