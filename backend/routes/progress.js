const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const progress = await prisma.userProgress.findMany({
            where: { userId: parseInt(userId) },
        });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { userId, lessonId } = req.body;
    try {
        const progress = await prisma.userProgress.create({
            data: { userId, lessonId, completed: true, },
        });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;