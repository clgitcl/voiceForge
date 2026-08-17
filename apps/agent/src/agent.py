import logging
import os

from dotenv import load_dotenv

from livekit.agents import Agent, AgentServer, AgentSession, JobContext, cli
from livekit.plugins import openai, silero


# Load environment variables
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("voiceforge-agent")

server = AgentServer()


class VoiceForgeAgent(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""
You are VoiceForge, a professional AI receptionist.

You answer incoming customer calls politely and efficiently.

Your responsibilities include:
- Greeting callers.
- Understanding why they are calling.
- Helping with appointments.
- Looking up customer information when appropriate.
- Keeping responses concise and conversational.
- Asking one question at a time.
- Ending calls politely when the caller is finished.

Speak naturally and conversationally.
Do not give long explanations unless the caller asks for details.
"""
        )


@server.rtc_session(agent_name="voiceforge-agent")
async def entrypoint(ctx: JobContext):
    logger.info("VoiceForge agent job received")
    logger.info("Room: %s", ctx.room.name)

    # Verify required configuration
    openai_key = os.getenv("OPENAI_API_KEY")

    if not openai_key:
        raise RuntimeError("OPENAI_API_KEY is not configured")

    ollama_url = os.getenv(
        "OLLAMA_BASE_URL",
        "http://ollama:11434/v1",
    )

    ollama_model = os.getenv(
        "OLLAMA_MODEL",
        "tinyllama",
    )

    logger.info("Using Ollama model: %s", ollama_model)
    logger.info("Using Ollama URL: %s", ollama_url)
    logger.info("OpenAI STT: whisper-1")
    logger.info("OpenAI TTS: tts-1 / alloy")
    logger.info("Silero VAD enabled")

    session = AgentSession(
        # Speech-to-text
        stt=openai.STT(
            model="whisper-1",
            language="en",
        ),

        # Local LLM through Ollama
        llm=openai.LLM.with_ollama(
            model=ollama_model,
            base_url=ollama_url,
        ),

        # Text-to-speech
        tts=openai.TTS(
            model="tts-1",
            voice="alloy",
        ),

        # Voice activity detection
        vad=silero.VAD.load(),
    )

    await ctx.connect()

    await session.start(
        agent=VoiceForgeAgent(),
        room=ctx.room,
    )

    logger.info(
        "VoiceForge agent connected to room: %s",
        ctx.room.name,
    )


if __name__ == "__main__":
    cli.run_app(server)
