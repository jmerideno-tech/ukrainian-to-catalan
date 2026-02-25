const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { username, email, password, },
        });
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;