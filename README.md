inspiration...

8/14/2026... 

linkedin post about $$$
:-)

Searched Recruiter
Searched possible links to Recruiter
found --- voiplike SIP provider overseas
 --- create demo project to prove ability



Thats the one

Got it — that’s the Forward Deployed Engineer post.

I’d actually be a little more cautious than my earlier “7/10” assessment. The RedHire side appears real, but the more important question is whether the undisclosed client company and the claims in that post can be independently verified.

The claims are pretty specific: an AI-native SaaS company, 800K+ calls/month across DACH, profitable from launch, and backing involving a Sequoia Scout. Those are exactly the kinds of claims worth checking before you invest time in an interview.

If you're considering applying, I can investigate that particular post all the way down to the client—including figuring out which company it is, whether the 800K-call claim is credible, funding/investors, approximate valuation, and whether the job itself looks genuine.

Investigate

I dug into it. The LinkedIn post is legitimate, and I was able to identify the company behind the “mystery” FDE role. It is fonio.ai. And the story is considerably stronger than it initially looked.

The match is extremely strong

Raphael Redmer's RedHire post says the client:

is an AI-native SaaS company
is remote or Vienna
automates 800K+ calls/month across DACH
was profitable from launch
was backed by angels including a Sequoia Scout

Those details line up almost perfectly with fonio.ai:

In December 2025, fonio reported approximately 800,000 calls/month, nearly 4,000 DACH customers, and profitability.
Its investors included a Sequoia Scout.
It is headquartered in Vienna and was founded in 2024.

So I'm comfortable saying the client in Raphael's post was fonio.ai.

And here's the really interesting part

Since Raphael made that post, fonio has exploded.

On June 9, 2026, fonio announced a $17 million / €14.6 million seed round led by 20VC at a:

$140 million valuation / €120 million valuation

That's a huge jump from the little bootstrapped company described in the original recruiting post.



Absolutely. fonio.ai is much more substantial than I initially assumed from the RedHire post. I investigated it because of the FDE opportunity you were looking at.

7
What fonio does

At its core, fonio is an AI communications platform for businesses.

Its original product is an AI phone agent that answers and handles customer calls. A business can give the AI rules, company information, calendars and integrations, and it can:

answer inbound calls 24/7
qualify customers/leads
schedule appointments
answer questions
route calls
collect information
create transcripts
transfer complicated situations to humans

They're expanding from voice into WhatsApp, email, chatbots and eventually an AI-first CRM.

So think:

AI receptionist + customer-service agent + sales/lead-qualification agent + business communications platform

rather than simply a chatbot.

The company is growing FAST

This is the part that caught my attention.

In June 2026, fonio announced:

$17 million Series/Seed financing at a $140 million valuation, led by 20VC. Total funding is now over $20 million.

The company's reported numbers around the financing were:

Metric	Reported
Valuation	$140M
Latest funding	$17M
Total funding	>$20M
Customers	7,000+
Calls/month	2M+
Markets	9
Employees	40+, with later company updates saying 50+
Growth	~30–40% MoM

And there's a particularly interesting revenue number: CEO Daniel Keinrath said the company added $1.5 million of ARR in a single recent month and was targeting $10M ARR by summer 2026.

Those are company-reported figures, so I'd treat them as claims rather than independently audited financials.

Who founded it?

Daniel Keinrath — CEO
Matthias Gruber — CTO/co-founder









If you mean what physical hardware fonio uses, the answer is: very little on the customer side.

Fonio is fundamentally a cloud/telephony software platform. Their documentation says the AI can be connected to a fonio-provided phone number or the customer's existing phone system.

Customer-side hardware

A typical deployment could be:

Caller
→ cellular/PSTN
→ Twilio/carrier infrastructure
→ fonio cloud
→ AI voice processing
→ CRM/calendar/database
→ human employee if needed

Fonio's current pricing explicitly says its telephony is provided through Twilio, and its higher-tier plans support an own SIP trunk.

So they don't appear to require proprietary phones, AI appliances, PBX hardware, or an on-premise server.

What about servers / GPUs?

This is where it gets interesting.

I cannot find public evidence that fonio owns or operates its own GPU hardware. Given the architecture they're describing, I'd expect their AI infrastructure to be primarily cloud-based, potentially using third-party model/voice providers alongside their own orchestration and proprietary components.

And that's consistent with what we've already found about Matthias: his important contribution appears to be the software orchestration layer, not custom AI hardware.

SIP is important

For enterprise customers, fonio supports SIP trunk integration.

That means fonio can potentially sit alongside an existing corporate phone environment rather than requiring the company to replace all its phones.

Conceptually:

Existing corporate phones
        │
        ▼
   PBX / SIP system
        │
        ├──────────► Human employee
        │
        ▼
   SIP / Internet
        │
        ▼
      fonio
        │
        ▼
     AI agent

That's actually very relevant to your IT background.

If you're looking at the Forward Deployed Engineer position, I would expect some customers to have messy real-world environments involving SIP, PBXs, phone systems, networking, APIs, CRMs and authentication. Fonio's ability to integrate with an existing phone system means the FDE may have to troubleshoot the boundary between all of those systems.

So your enterprise infrastructure + networking + troubleshooting + API experience could be more relevant to fonio than the job title initially suggests.

If you want, I can 
investigate exactly what an FDE at fonio would likely be doing day-to-day, including the hardware/networking/telephony knowledge you'd need for the interview.

Is voip? 

Yes — fonio is essentially a VoIP/cloud-telephony platform, but with an AI layer on top.

The basic path is:

Traditional phone network / SIP
→ Internet/VoIP
→ fonio
→ AI voice agent
→ customer/business system

Fonio explicitly supports SIP trunking, and its telephony infrastructure uses Twilio.

The important distinction:

VoIP: carries the voice call over IP.
Fonio: uses that telephony infrastructure and adds AI conversation, routing, scheduling, CRM integration, transcription, etc.
SIP: is one of the protocols/integration methods used to connect phone systems to fonio.

So if you're familiar with PBXs, SIP, RTP, VoIP, DNS, firewalls, NAT, networking and troubleshooting, that could be genuinely useful for the Fonio FDE role.

And given your infrastructure background, VoIP isn't a random side topic here—it could be one of the areas worth brushing up on before talking to RedHire.




Yes. Let's make LiveKit its own hands-on project, separate from PortalCore and the Fonio research.

LiveKit Project

Goal: Build a small voice-AI/VoIP lab that teaches you the pieces relevant to the Fonio FDE role.

livekit-fde-lab/
├── README.md
├── server/
├── client/
├── agent/
├── sip/
├── docs/
└── tests/
Phase 1 — LiveKit fundamentals

We'll build:

Browser
→ WebRTC
→ LiveKit room
→ audio participant

Then add:

AI Agent
→ Speech-to-Text
→ LLM
→ Text-to-Speech
→ LiveKit

Then:

SIP phone
→ SIP
→ LiveKit
→ AI Agent

That final piece is the really valuable one for understanding Fonio.

Phase 2 — Infrastructure

We'll deliberately introduce the kinds of problems an FDE encounters:

firewall/NAT
SIP registration
RTP/media
DNS
authentication
API keys
Webhooks
call transfer
logging
packet troubleshooting
Phase 3 — Cloud

Eventually we'll deploy it so you have:

Internet
   │
   ▼
Cloud VM / LiveKit Cloud
   │
   ├── WebRTC
   ├── SIP
   └── AI Agent
          │
          └── External API
First milestone

I'd start very small:

LiveKit Lab #1: Two clients join a room and exchange audio.

Once that works, we'll add the AI agent. Then SIP.

That gives you a real project you can actually explain in an interview:

“I built a LiveKit voice communications lab, starting with WebRTC rooms, then added an AI agent and SIP integration. I used it to understand the signaling, media, API, and troubleshooting boundaries involved in production voice-AI systems.”

That's a much stronger FDE story than simply saying you've read about LiveKit.

Video integration?






Yes. And given everything we've uncovered about Fonio, I would build a competing product as a serious portfolio project, not just a toy demo.

Let's call it VoiceForge for now.

What we're building

A multi-channel AI communications platform:

                    VOICEFORGE
                        │
          ┌─────────────┼─────────────┐
          │             │             │
        PHONE        WHATSAPP       WEB
          │             │             │
         SIP          Messages      WebRTC
          │             │             │
          └─────────────┼─────────────┘
                        │
                 AI Agent Platform
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       Knowledge      Tools        Workflows
          │             │             │
          └─────────────┼─────────────┘
                        │
             ┌──────────┼──────────┐
             │          │          │
           CRM      Calendar    Database

The key is that we don't try to clone Fonio's entire business. We build a technically credible smaller version that demonstrates the architecture.

Core stack

I'd use:

Frontend

React
TypeScript
Vite

Backend

Node.js
TypeScript
Fastify or Express
PostgreSQL

Real-time

LiveKit
WebRTC
SIP

LiveKit's current Agents framework supports Python and Node.js, realtime audio/video/data, tools, multimodality and telephony.

AI

STT
LLM
TTS
turn detection
function/tool calling

Infrastructure

Docker
Linux
Nginx
PostgreSQL
Redis later
cloud deployment later
Phase 1 — AI phone receptionist

This is our Fonio MVP.

             PHONE
               │
              SIP
               │
               ▼
          ┌─────────┐
          │ LiveKit │
          └────┬────┘
               │
               ▼
          AI AGENT
          /   |   \
        STT  LLM  TTS
               │
               ▼
          BUSINESS API

LiveKit already provides the plumbing for SIP trunks, SIP participants and outbound calls.

And importantly, a telephone caller becomes a LiveKit participant, just like a browser user.

That's exactly the architecture we want to understand.

Phase 2 — Business tools

The AI shouldn't just talk.

It should do things.

For example:

Caller: "I'd like to schedule an appointment tomorrow."

AI:

→ identify customer
→ check calendar
→ find available times
→ confirm time
→ create appointment
→ send confirmation

Our backend:

POST /api/appointments
GET  /api/availability
GET  /api/customers/:id
POST /api/messages

This is where your PortalCore API experience becomes directly useful.

Phase 3 — Knowledge base

Give each business its own knowledge base.




Absolutely. Then we build this for $0. We don't need to buy anything yet.

In fact, I'd change the plan: no paid APIs, no paid cloud, no domain, no phone number until we have a working local product.

$0 development stack
Component	Free approach
Frontend	React + TypeScript
Backend	Node.js + TypeScript
Database	PostgreSQL on your machine
Containers	Docker/Podman
Real-time audio/video	Self-hosted LiveKit
AI	Gemini API Free Tier
Code	Git + GitHub
Development OS	Your existing Windows/Linux environment
Phone/SIP	Later — don't spend money yet
Hosting	Later — local first

LiveKit is open source and can be self-hosted. Its documentation specifically supports running it locally, including Windows/Linux, with livekit-server --dev.

Google's Gemini API currently has a Free Tier with free input/output tokens for selected models, subject to rate limits.

Our $0 architecture
                  YOUR COMPUTER
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      React          Node.js       PostgreSQL
        │              │              │
        └──────────────┼──────────────┘
                       │
                    LiveKit
                       │
              ┌────────┴────────┐
              │                 │
          Microphone          Camera
              │                 │
              └────────┬────────┘
                       │
                    AI Agent
                       │
                    Gemini

And no telephone required initially.

We'll use your browser as the "phone."

What we'll build first

VoiceForge v0.1 — $0

Open browser.
Click Start Call.
Browser joins LiveKit room.
Microphone activates.
AI agent joins.
You speak.
AI hears you.
Gemini processes the request.
AI responds.
Conversation appears in our dashboard.

Then we add:

v0.2
→ PostgreSQL

v0.3
→ knowledge base

v0.4
→ function calling

v0.5
→ calendar

v0.6
→ human handoff

v0.7
→ video

v0.8
→ SIP

v0.9
→ WhatsApp

v1.0
→ deploy it publicly

And we can use what you already have

This is particularly nice because you already have experience with React, TypeScript, PostgreSQL, APIs, Linux, Windows Server, Docker/Podman and cloud environments.

We don't need to learn everything simultaneously.

We'll build it one component at a time, verify each component, and only move forward when it works.

One caveat: Gemini's Free Tier has model-specific rate limits, so it's great for our development/testing but isn't something I'd design a production commercial service around.

Bottom line: $0 to start.

And I think that's the right approach. We can get surprisingly far before spending a penny.











Absolutely. I’d make the skeleton modular from day one, with Llama/Ollama behind an interface so we're not locked into one model. LiveKit Agents supports Python and Node.js, realtime audio/video/data, telephony, and self-hosting; Ollama exposes a local REST API, so this architecture fits the open-source goal well.

VoiceForge GitHub skeleton

LiveKit Agents GitHub
Ollama GitHub

voiceforge/
│       │   │   └── knowledge.py
│       │   ├── llm/
│       │   │   ├── provider.py
│       │   │   └── ollama.py
│       │   └── prompts/
│       │       └── receptionist.txt
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/
│   │
│   ├── core/
│   │   ├── types/
│   │   ├── config/
│   │   └── logging/
│   │
│   ├── ai/
│   │   ├── llm/
│   │   ├── stt/
│   │   ├── tts/
│   │   └── tools/
│   │
│   └── communications/
│       ├── livekit/
│       ├── webrtc/
│       └── sip/
│
├── infrastructure/
│   │
│   ├── postgres/
│   │   └── init.sql
│   │
│   ├── livekit/
│   │   └── livekit.yaml
│   │
│   ├── ollama/
│   │   └── Modelfile
│   │
│   └── nginx/
│       └── nginx.conf
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── docs/
│   │
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── voice-flow.md
│   │   └── video-flow.md
│   │
│   ├── ai/
│   │   ├── llama.md
│   │   ├── prompts.md
│   │   └── tools.md
│   │
│   ├── networking/
│   │   ├── sip.md
│   │   ├── rtp.md
│   │   ├── webrtc.md
│   │   └── troubleshooting.md
│   │
│   └── deployment/
│       └── local.md
│
└── tests/
    ├── api/
    ├── agent/
    └── integration/
The first working path

Don't build all of that immediately.

Our v0.1 should be:

Browser
   │
   │ WebRTC
   ▼
LiveKit
   │
   ▼
VoiceForge Agent
   │
   ▼
Ollama
   │
   ▼
Llama

Ollama's local API runs at localhost:11434 by default and supports chat requests, so our agent can communicate with the local model without a paid AI API.

Then:

v0.2  PostgreSQL
v0.3  Function calling
v0.4  Knowledge base
v0.5  Calendar
v0.6  Human handoff
v0.7  Video
v0.8  SIP
v0.9  WhatsApp
v1.0  Multi-tenant platform
One architectural decision I'd make now

Keep the LLM behind this interface:

             LLMProvider
                  │
       ┌──────────┼──────────┐
       │          │          │
     Ollama     Gemini     OpenAI
       │
      Llama

That means our application never says:

"Use Llama."

It says:

"Give me an LLM provider."

Then Ollama is the default.

That is true vendor-neutral architecture.

And I'd use Python for the agent

LiveKit officially supports both Python and Node.js agents, and its current examples include production-style Python voice agents.


---
Excellent. This tells me the skeleton was designed with the right overall architecture, but there are a few things I would fix before we try to run it.

What you already have
                    VoiceForge
                        │
                 Docker Compose
                        │
 ┌──────────┬──────────┼──────────┬──────────┐
 │          │          │          │          │
Postgres  Redis     LiveKit     Ollama      Nginx
 │                     │           │
 │                     │           │
 └────────────── API ──┴──── Agent─┘
                         │
                       Web

That's a legitimate distributed architecture.

One important issue

Your Compose file says:

livekit:
  image: livekit/livekit-server:v1.4.0

That's very old compared with current LiveKit releases.

We're building this specifically to learn current LiveKit/AI-agent architecture, so I don't want to lock the project to a 2023-era server before we even start.

Also, your Compose file has:

version: '3.8'

Modern Docker Compose doesn't require the version field anymore.

Another important issue

You have:

ollama:
  image: ollama/ollama:latest

That's fine for development, but latest isn't reproducible. Eventually we'll pin a specific version.

And this is important for your $0 goal

Your Ollama container currently has:

volumes:
  - ollama_data:/root/.ollama

That's good.

It means when we download Llama, the model survives container restarts.

But the model isn't actually downloaded yet.

So right now:

Ollama
  │
  └── empty model store

We'll eventually have:

Ollama
  │
  └── Llama
       │
       └── local inference
The architecture I'd use

For our first version:

Browser
   │
   │ WebRTC
   ▼
LiveKit
   │
   ▼
Python Agent
   │
   ▼
Ollama
   │
   ▼
Llama

Then the agent can call:

              Llama
                │
          decides to use tool
                │
                ▼
        VoiceForge API
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
    PostgreSQL Calendar Knowledge

That's the important part.

Llama doesn't directly access PostgreSQL.

The agent exposes controlled tools.

Before changing anything

Let's inspect the actual agent because that's the heart of the system.

Run:

cat apps/agent/requirements.txt

Then:

cat apps/agent/Dockerfile

Then:

cat infrastructure/livekit/livekit.yml

Then:

cat infrastructure/ollama/Modelfile

I especially want to see the LiveKit version and Python dependencies before we touch Docker Compose.

One thing I DON'T want you to do yet

Don't run:

docker compose up

yet.

We could end up debugging six containers simultaneously, when what we really want is:

1. PostgreSQL ✓
2. Ollama ✓
3. Llama ✓
4. LiveKit ✓
5. Agent ✓
6. Web ✓

one layer at a time.

That's much easier—and it teaches you what every component is actually doing.

And honestly, the skeleton is pretty good. We're not starting from scratch; we're doing the engineering pass before first launch.

clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$ cat apps/agent/requirements.txt
fastapi==0.104.1
uvicorn==0.24.0
websockets==12.0
requests==2.31.0
python-dotenv==1.0.0
openai==0.28.0
anthropic==0.7.7
google-cloud-speech==2.22.0
google-cloud-texttospeech==2.15.0
pyttsx3==2.90
pygame==2.5.2
pyaudio==0.2.11
soundfile==0.12.1
numpy==1.24.3
scipy==1.11.2
pydantic==2.4.2
redis==5.0.0
asyncpg==0.29.0
sqlalchemy==2.0.21
livekit==0.4.0
livekit-api==0.9.0clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/c

Good — and this exposes the biggest thing I'd change before we run anything.

The current requirements.txt is a mixture of an older LiveKit stack, cloud AI SDKs, local audio libraries, and web-server dependencies. For our $0/open-source VoiceForge, it's unnecessarily heavy.

What we actually need

For v0.1, the agent should be much simpler:

LiveKit
   ↓
Python Agent
   ↓
Ollama
   ↓
Llama

We don't need all of this yet:

❌ OpenAI
❌ Anthropic
❌ Google Cloud Speech
❌ Google Cloud TTS
❌ pygame
❌ PyAudio
❌ scipy
❌ soundfile
❌ FastAPI inside the agent

Those aren't necessarily bad packages. They're just not part of our first architecture.





clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$ cat apps/agent/src/ageny.py
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
    asyncio.run(agent.start_agent())clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$


































































































































Okay — now I see what we inherited. This isn't just a skeleton; it's an early VoiceForge implementation with a fairly specific architecture.

And there are several things we should not carry forward unchanged.

What this agent currently does
Redis
  │
  │ new_call
  ▼
VoiceAgent
  │
  ├── CustomerTool
  ├── CalendarTool
  ├── KnowledgeTool
  │
  ▼
OllamaProvider
  │
  ▼
Llama 2
  │
  ▼
Redis / LiveKit

So the original author was already thinking about:

AI receptionist
customer lookup
appointment scheduling
knowledge-base search
conversation context
Redis call queues
LiveKit
Ollama

That's actually a useful starting point.

But there are serious problems
1. It's using the old LiveKit API

This:







There we go. Now we have the full picture.

The existing OllamaProvider is actually usable conceptually, but it's built around the older custom agent architecture.

Current flow
agent.py
   │
   ▼
OllamaProvider
   │
   │ POST /api/chat
   ▼
Ollama
   │
   ▼
llama2

That's not inherently bad. In fact, Ollama's /api/chat endpoint is perfectly reasonable for a direct local integration.

The bigger question is: do we want the agent to talk directly to Ollama, or let LiveKit Agents manage the LLM layer?

For VoiceForge, I'd do the latter once we move into actual realtime voice.

What I'd preserve

This abstraction is good:

class LLMProvider(ABC):

It gives us:

LLMProvider
    │
    ├── Ollama
    ├── OpenAI
    ├── Anthropic
    └── other provider

That's valuable for a competing communications platform.

I'd eventually make the interface more explicit:

LLMProvider
├── generate()
├── stream()
└── tool calling

But don't change it yet.

What needs fixing
1. aiohttp

Again, we're moving toward httpx, so we'll eventually remove this dependency.

2. Hardcoded Llama 2

Current:

model: str = "llama2"

We should use:

OLLAMA_MODEL

because Llama 2 is no longer the model I'd choose for our first build.

3. stream() is unfinished

This:

async def stream(...):
    # Implementation for streaming

isn't actually implemented.

For a voice system, streaming becomes very important.

We eventually want:

User speaks
    ↓
STT chunks
    ↓
LLM begins generating
    ↓
TTS begins speaking
    ↓
User hears response

rather than:

User speaks
    ↓
wait...
    ↓
complete LLM response
    ↓
wait...
    ↓
TTS

Latency is everything in conversational voice.

The architecture I want us to build

Here's where this project gets interesting.

Phase 1 — Local LLM

Get this working:










Yep — that message is actually very specific: Docker Desktop is installed/running, but Ubuntu isn't integrated with it yet.

You do not need to install Docker inside Ubuntu.

Do this in Docker Desktop on Windows
Open Docker Desktop.
Go to Settings.
Select Resources.
Select WSL Integration.
Turn on:
Enable integration with my default WSL distro
Ubuntu
Click Apply & Restart.

The relevant setting is documented by Docker here: Docker Desktop WSL 2 integration

Then restart WSL

From Windows PowerShell, run:

wsl --shutdown

Wait a few seconds, then open Ubuntu again.

Go back to VoiceForge:

cd /mnt/c/Users/clopez/Desktop/projects/voiceForge

Test:

docker --version

Then:

docker compose version
What we're looking for

Something along these lines:

Docker version 29.x.x
Docker Compose version v2.x.x

Don't install docker.io or Podman. We want the Docker Desktop WSL integration so your existing docker-compose.yml can run directly from this Ubuntu terminal.

Once docker --version works, paste the two version outputs and we'll move on to getting Ollama + Llama running first, before bringing up the entire VoiceForge stack.

Yesterday 10:40 PM
next. 

Yep. Assuming Docker Desktop's WSL Integration → Ubuntu is now enabled, let's move forward.

1. Verify Docker

From your VoiceForge directory:

cd /mnt/c/Users/clopez/Desktop/projects/voiceForge


docker --version
docker compose version

If both work, check the engine:

docker info

You should see Docker's server information rather than a connection error.

2. Don't start all 8 services yet

Our Compose file has:

PostgreSQL
Redis
LiveKit
Ollama
API
Agent
Web
Nginx

We don't want eight things failing at once. 😄

Let's start with Ollama only:

docker compose up -d ollama

Then:

docker compose ps

You should see ollama running.

3. Check Ollama

Run:

curl http://localhost:11434/api/tags

Initially, you'll probably get something like:

{"models":[]}

That's actually good — it means Ollama itself is working, but we haven't installed a model yet.

4. Pull a model

For our first VoiceForge experiment, I'd start with a relatively small model rather than immediately downloading a giant one:

docker exec -it voiceforge-ollama-1 ollama pull llama3.2:3b

The exact container name may differ. If Docker says it can't find voiceforge-ollama-1, run:

docker compose ps

and use the actual Ollama container name.

Then test:

docker exec -it <ollama-container-name> ollama run llama3.2:3b

Ask it:

You are the VoiceForge receptionist. Say hello to a caller.

If it answers, we've achieved a major milestone:

Docker
  ↓
Ollama
  ↓
Llama
  ↓
Local AI

No OpenAI. No Anthropic. No cloud API. $0 AI inference cost.

After that we'll wire the model into our Python agent, and then tackle LiveKit voice.

clopez@LAPTOP-0NJCT5EI:~$ cd /mnt/c/Users/clopez/Desktop/projects/voiceForge
version
docker compose versionclopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$
clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$ docker --version
Docker version 29.7.2, build a7dcaa6
clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$ docker compose version

Docker Compose version v5.3.1
clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$
clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$ docker info
Client:
 Version:    29.7.2
 Context:    default
 Debug Mode: false
 Plugins:
  agent: Docker AI Agent Runner (Docker Inc.)
    Version:  v1.119.0
    Path:     /usr/local/lib/docker/cli-plugins/docker-agent
  ai: Docker AI Agent - Ask Gordon (Docker Inc.)
    Version:  v1.30.0
    Path:     /usr/local/lib/docker/cli-plugins/docker-ai
  buildx: Docker Buildx (Docker Inc.)
    Version:  v0.36.0-desktop.1
    Path:     /usr/local/lib/docker/cli-plugins/docker-buildx
  compose: Docker Compose (Docker Inc.)
    Version:  v5.3.1
    Path:     /usr/local/lib/docker/cli-plugins/docker-compose
  debug: Get a shell into any image or container (Docker Inc.)
    Version:  0.0.47
    Path:     /usr/local/lib/docker/cli-plugins/docker-debug
  desktop: Docker Desktop commands (Docker Inc.)
    Version:  v0.4.3
    Path:     /usr/local/lib/docker/cli-plugins/docker-desktop
  dhi: CLI for managing Docker Hardened Images (Docker Inc.)
    Version:  v0.0.7
    Path:     /usr/local/lib/docker/cli-plugins/docker-dhi
  extension: Manages Docker extensions (Docker Inc.)
    Version:  v0.2.31
    Path:     /usr/local/lib/docker/cli-plugins/docker-extension
  init: Creates Docker-related starter files for your project (Docker Inc.)
    Version:  v1.4.0
    Path:     /usr/local/lib/docker/cli-plugins/docker-init
  mcp: Docker MCP Plugin (Docker Inc.)
    Version:  v0.43.3
    Path:     /usr/local/lib/docker/cli-plugins/docker-mcp
  model: Docker Model Runner (Docker Inc.)
    Version:  v1.2.6
    Path:     /usr/local/lib/docker/cli-plugins/docker-model
  offload: Docker Offload (Docker Inc.)
    Version:  v0.6.9
    Path:     /usr/local/lib/docker/cli-plugins/docker-offload
  pass: Docker Pass Secrets Manager Plugin (beta) (Docker Inc.)
    Version:  v0.2.0
    Path:     /usr/local/lib/docker/cli-plugins/docker-pass
  sandbox: "docker sandbox" is deprecated, use Docker Sandboxes instead (Docker Inc.)
    Version:  v0.13.0
    Path:     /usr/local/lib/docker/cli-plugins/docker-sandbox
  scout: Docker Scout (Docker Inc.)
    Version:  v1.24.0
    Path:     /usr/local/lib/docker/cli-plugins/docker-scout

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 0
 Server Version: 29.7.2
 Storage Driver: overlayfs
  driver-type: io.containerd.snapshotter.v1
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: 2
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local splunk syslog
 CDI spec directories:
  /etc/cdi
  /var/run/cdi
 Discovered Devices:
  cdi: docker.com/gpu=webgpu
 Swarm: inactive
 Runtimes: io.containerd.runc.v2 nvidia runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: e53c7c1516c3b2bff98eb76f1f4117477e6f4e66
 runc version: v1.3.6-0-g491b69ba
 init version: de40ad0
 Security Options:
  seccomp
   Profile: builtin
  cgroupns
 Kernel Version: 6.18.33.2-microsoft-standard-WSL2
 Operating System: Docker Desktop
 OSType: linux
 Architecture: x86_64
 CPUs: 4
 Total Memory: 7.7GiB
 Name: docker-desktop
 ID: 9bffc6e8-d799-4707-8664-5b3b38190785
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 HTTP Proxy: http.docker.internal:3128
 HTTPS Proxy: http.docker.internal:3128
 No Proxy: hubproxy.docker.internal
 Labels:
  com.docker.desktop.address=unix:///var/run/docker-cli.sock
 Experimental: false
 Insecure Registries:
  hubproxy.docker.internal:5555
  ::1/128
  127.0.0.0/8
 Live Restore Enabled: false
 Firewall Backend: iptables

clopez@LAPTOP-0NJCT5EI:/mnt/c/Users/clopez/Desktop/projects/voiceForge$
















































































Excellent. Docker is fully operational through WSL2. We can move on.

Your environment is actually pretty nice for this project:

Docker: 29.7.2
Compose: 5.3.1
WSL2: working
Linux kernel: 6.18.33
CPU: 4 cores
RAM available to Docker: 7.7 GiB
NVIDIA runtime is present, although Docker currently reports only a WebGPU CDI device.

That last point is worth remembering if we eventually want GPU-accelerated local inference.

Next: start Ollama only

From:

/mnt/c/Users/clopez/Desktop/projects/voiceForge

run:

docker compose up -d ollama

Then:

docker compose ps
If Ollama is running

Check its API:

curl http://localhost:11434/api/tags

You should get JSON back.

Then get the actual container name:

docker compose ps -q ollama

We'll use that ID to pull the model:

docker exec -it $(docker compose ps -q ollama) ollama pull llama3.2:3b

One important thing: your Docker host has only 7.7 GiB RAM, so I specifically want to start with llama3.2:3b, not a large 8B/14B model. We can benchmark it before deciding whether a larger model makes sense.

Then verify:

docker exec -it $(docker compose ps -q ollama) ollama list

You should see:

NAME            ID       SIZE
llama3.2:3b     ...
Then test the model

Run:

docker exec -it $(docker compose ps -q ollama) ollama run llama3.2:3b

And type:

You are the VoiceForge receptionist. A customer just called. Greet them professionally and ask how you can help.

If Llama answers, we have:

Windows
  │
WSL2
  │
Docker Desktop
  │
Ollama container
  │
Llama 3.2 3B

That's our first real VoiceForge AI milestone.

Don't start the other seven containers yet. Let's prove the AI engine works first.














