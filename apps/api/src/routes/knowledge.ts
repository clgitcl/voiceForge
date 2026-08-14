import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get knowledge base entries
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const where: any = {};

    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const entries = await prisma.knowledgeBase.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(entries);
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge' });
  }
});

// Create knowledge entry
router.post('/', async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const entry = await prisma.knowledgeBase.create({
      data: {
        title,
        content,
        category,
        tags,
      },
    });
    res.status(201).json(entry);
  } catch (error) {
    console.error('Error creating knowledge entry:', error);
    res.status(500).json({ error: 'Failed to create knowledge entry' });
  }
});

// Search knowledge
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const entries = await prisma.knowledgeBase.findMany({
      where: {
        OR: [
          { title: { contains: q as string, mode: 'insensitive' } },
          { content: { contains: q as string, mode: 'insensitive' } },
          { tags: { has: q as string } },
        ],
      },
    });
    res.json(entries);
  } catch (error) {
    console.error('Error searching knowledge:', error);
    res.status(500).json({ error: 'Failed to search knowledge' });
  }
});

export default router;