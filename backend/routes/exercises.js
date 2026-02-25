const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const exercises = await prisma.exercise.findMany();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/lesson/:lessonId', async (req, res) => {
    const { lessonId } = req.params;
    try {
        const exercises = await prisma.exercise.findMany({
            where: { lessonId: parseInt(lessonId) },
        });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { question, answer, lessonId } = req.body;
    try {
        const exercise = await prisma.exercise.create({
            data: {
                question,
                answer,
                lessonId,
            },
        });
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;