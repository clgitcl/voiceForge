import express from 'express';
import { AccessToken, AgentDispatchClient } from 'livekit-server-sdk';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const prisma = new PrismaClient();

// Start a new call
router.post('/start', async (req, res) => {
  try {
    const callId = uuidv4();
    const roomName = `call-${callId}`;

    // Create LiveKit access token
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY || 'devkey',
      process.env.LIVEKIT_API_SECRET || 'devsecret',
      {
        identity: `agent-${callId}`,
        name: 'VoiceForge Agent',
      }
    );

    token.addGrant({
      room: roomName,
      roomJoin: true,
      roomCreate: true,
      canPublish: true,
      canSubscribe: true,
    });

    const jwt = await token.toJwt();

    // Create call record in database
    const call = await prisma.call.create({
      data: {
        id: callId,
        roomName,
        status: 'active',
        startedAt: new Date(),
        agentId: 'default-agent',
      },
    });

const dispatchClient = new AgentDispatchClient(
  process.env.LIVEKIT_URL || 'http://livekit:7880',
  process.env.LIVEKIT_API_KEY || 'devkey',
  process.env.LIVEKIT_API_SECRET || 'devsecret'
);

await dispatchClient.createDispatch(roomName, 'voiceforge-agent');

    res.json({
      callId,
      roomName,
      roomUrl: `ws://${process.env.LIVEKIT_HOST || 'localhost:7880'}`,
      token: jwt,
    });
  } catch (error) {
    console.error('Error starting call:', error);
    res.status(500).json({ error: 'Failed to start call' });
  }
});

// End a call
router.post('/end', async (req, res) => {
  try {
    const { callId } = req.body;

    await prisma.call.update({
      where: { id: callId },
      data: {
        status: 'completed',
        endedAt: new Date(),
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error ending call:', error);
    res.status(500).json({ error: 'Failed to end call' });
  }
});

// Get all calls
router.get('/', async (req, res) => {
  try {
    const calls = await prisma.call.findMany({
      orderBy: { startedAt: 'desc' },
      take: 50,
    });
    res.json(calls);
  } catch (error) {
    console.error('Error fetching calls:', error);
    res.status(500).json({ error: 'Failed to fetch calls' });
  }
});

// Get call details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const call = await prisma.call.findUnique({
      where: { id },
      include: {
        transcript: true,
        customer: true,
      },
    });

    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    res.json(call);
  } catch (error) {
    console.error('Error fetching call:', error);
    res.status(500).json({ error: 'Failed to fetch call' });
  }
});

export default router;
