import asyncio
import json
import os
from typing import Dict, Any, Optional
from dataclasses import dataclass
import websockets
import requests
from livekit import RoomServiceClient, Room, Participant
from livekit.protocol import TrackKind
import redis
import logging

from llm.provider import LLMProvider
from llm.ollama import OllamaProvider
from tools.calendar import CalendarTool
from tools.customers import CustomerTool
from tools.knowledge import KnowledgeTool

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class CallContext:
    call_id: str
    customer_id: Optional[str] = None
    customer_name: Optional[str] = None
    intent: Optional[str] = None
    current_step: str = "greeting"
    conversation_history: list = None
    
    def __post_init__(self):
        if self.conversation_history is None:
            self.conversation_history = []

class VoiceAgent:
    def __init__(self):
        self.llm = OllamaProvider(
            model="llama2",
            base_url=os.getenv("OLLAMA_URL", "http://localhost:11434")
        )
        self.calendar_tool = CalendarTool()
        self.customer_tool = CustomerTool()
        self.knowledge_tool = KnowledgeTool()
        self.redis_client = redis.Redis(
            host=os.getenv("REDIS_HOST", "localhost"),
            port=int(os.getenv("REDIS_PORT", 6379)),
            decode_responses=True
        )
        self.active_calls: Dict[str, CallContext] = {}
        self.room_client = RoomServiceClient(
            os.getenv("LIVEKIT_URL", "http://localhost:7880"),
            os.getenv("LIVEKIT_API_KEY", "devkey"),
            os.getenv("LIVEKIT_API_SECRET", "devsecret")
        )

    async def handle_incoming_call(self, call_id: str, customer_data: Optional[Dict] = None):
        """Handle an incoming call from a customer."""
        logger.info(f"Handling incoming call: {call_id}")
        
        # Create call context
        context = CallContext(call_id=call_id)
        if customer_data:
            context.customer_id = customer_data.get("id")
            context.customer_name = customer_data.get("name")
        
        self.active_calls[call_id] = context
        
        # Join the call room
        room_name = f"call-{call_id}"
        try:
            room = await self.room_client.create_room(room_name)
            logger.info(f"Joined room: {room_name}")
        except Exception as e:
            logger.error(f"Failed to join room: {e}")
            return

        # Start conversation
        await self.process_call(call_id)

    async def process_call(self, call_id: str):
        """Process the call with AI agent."""
        context = self.active_calls.get(call_id)
        if not context:
            logger.error(f"Call context not found: {call_id}")
            return

        # Load prompt template
        with open("prompts/receptionist.txt", "r") as f:
            base_prompt = f.read()

        try:
            while True:
                # Get current message from transcript (via WebSocket or LiveKit)
                user_input = await self.get_user_input(call_id)
                if user_input is None:
                    break

                context.conversation_history.append({
                    "role": "user",
                    "content": user_input
                })

                # Build prompt with context
                prompt = self.build_prompt(base_prompt, context)
                
                # Get AI response
                response = await self.llm.generate(
                    prompt=prompt,
                    context=context.conversation_history,
                    temperature=0.7
                )

                # Process any tool calls in the response
                response_text = await self.process_tools(response, context)

                # Update context
                context.conversation_history.append({
                    "role": "assistant",
                    "content": response_text
                })

                # Send response back
                await self.send_response(call_id, response_text)

                # Check if call should end
                if self.should_end_call(response_text, context):
                    await self.end_call(call_id)
                    break

        except Exception as e:
            logger.error(f"Error processing call {call_id}: {e}")
            await self.end_call(call_id)

    def build_prompt(self, base_prompt: str, context: CallContext) -> str:
        """Build the prompt with context."""
        prompt = base_prompt
        
        # Add customer context
        if context.customer_name:
            prompt += f"\nCustomer Name: {context.customer_name}"
        
        if context.intent:
            prompt += f"\nDetected Intent: {context.intent}"
        
        prompt += f"\nCurrent Step: {context.current_step}"
        
        # Add recent conversation
        recent_history = context.conversation_history[-5:]
        if recent_history:
            prompt += "\n\nRecent Conversation:"
            for msg in recent_history:
                prompt += f"\n{msg['role']}: {msg['content']}"
        
        return prompt

    async def process_tools(self, response: str, context: CallContext) -> str:
        """Process any tool calls in the response."""
        # Check for tool call patterns in response
        if "{{TOOL:" in response:
            # Extract tool call
            tool_parts = response.split("{{TOOL:")[1].split("}}")[0]
            tool_name, tool_args = tool_parts.split(":", 1)
            tool_args = json.loads(tool_args)
            
            if tool_name == "schedule_appointment":
                result = await self.calendar_tool.schedule_appointment(
                    customer_id=context.customer_id,
                    **tool_args
                )
                return f"I've scheduled your appointment for {tool_args.get('date')} at {tool_args.get('time')}. Is there anything else I can help with?"
            
            elif tool_name == "lookup_customer":
                result = await self.customer_tool.lookup_customer(**tool_args)
                if result:
                    context.customer_id = result.get("id")
                    context.customer_name = result.get("name")
                    return f"Found customer {result.get('name')}. How can I help you today?"
                return "I couldn't find that customer. Can you please provide your phone number or email?"
            
            elif tool_name == "search_knowledge":
                result = await self.knowledge_tool.search(**tool_args)
                return f"Based on our knowledge base: {result}"
        
        return response

    def should_end_call(self, response: str, context: CallContext) -> bool:
        """Determine if the call should end."""
        end_phrases = [
            "goodbye",
            "have a great day",
            "thank you for calling",
            "is there anything else"
        ]
        return any(phrase in response.lower() for phrase in end_phrases)

    async def get_user_input(self, call_id: str) -> Optional[str]:
        """Get user input from the call stream."""
        # This would be replaced with actual audio/text streaming from LiveKit
        # For demo, we'll simulate with Redis pub/sub
        try:
            message = self.redis_client.blpop(f"call:{call_id}:input", timeout=30)
            if message:
                return json.loads(message[1]).get("text")
        except Exception as e:
            logger.error(f"Error getting user input: {e}")
        return None

    async def send_response(self, call_id: str, text: str):
        """Send AI response back to the call."""
        # Publish response to Redis for WebSocket bridge
        self.redis_client.publish(
            f"call:{call_id}:output",
            json.dumps({"text": text})
        )
        
        # Also send via LiveKit data channel
        try:
            room_name = f"call-{call_id}"
            await self.room_client.send_data(
                room_name,
                json.dumps({"type": "transcript", "speaker": "AI", "text": text})
            )
        except Exception as e:
            logger.error(f"Error sending response via LiveKit: {e}")

    async def end_call(self, call_id: str):
        """End the call and cleanup."""
        logger.info(f"Ending call: {call_id}")
        
        # Cleanup context
        if call_id in self.active_calls:
            del self.active_calls[call_id]
        
        # Close room
        try:
            room_name = f"call-{call_id}"
            await self.room_client.delete_room(room_name)
        except Exception as e:
            logger.error(f"Error deleting room: {e}")
        
        # Notify API
        try:
            requests.post(
                f"{os.getenv('API_URL', 'http://localhost:3001')}/api/calls/end",
                json={"callId": call_id}
            )
        except Exception as e:
            logger.error(f"Error notifying API: {e}")

    async def start_agent(self):
        """Start the agent and listen for incoming calls."""
        logger.info("Starting VoiceForge Agent...")
        
        # Subscribe to call events
        await self.room_client.subscribe_to_room_events()
        
        # Keep running
        try:
            while True:
                # Check for new calls via Redis
                message = self.redis_client.blpop("agent:new_call", timeout=1)
                if message:
                    call_data = json.loads(message[1])
                    call_id = call_data.get("call_id")
                    customer_data = call_data.get("customer")
                    asyncio.create_task(self.handle_incoming_call(call_id, customer_data))
                await asyncio.sleep(0.1)
        except KeyboardInterrupt:
            logger.info("Shutting down agent...")

if __name__ == "__main__":
    agent = VoiceAgent()
    asyncio.run(agent.start_agent())