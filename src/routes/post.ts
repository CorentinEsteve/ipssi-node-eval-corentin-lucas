import express from 'express';
import db from '../db';
import { checkPostOwnership } from '../handlers/post';
import { protect } from '../modules/auth'

const app = express.Router()

app.get('/', async (req, res) => {
    const posts = await db.post.findMany();
    res.json(posts);
});

app.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const post = await db.post.findUnique({ where: { id: uuid } });
    if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
    }
    res.json(post);
});

app.post('/', protect, async (req, res) => {
    const { title, body } = req.body;
    const userId = req.user?.id;
    const post = await db.post.create({ data: { title, body, userId } });
    res.json(post);
});

app.put('/:uuid', protect, checkPostOwnership, async (req, res) => {
    const { uuid } = req.params;
    const { title, body } = req.body;
    const post = await db.post.update({ where: { id: uuid }, data: { title, body } });
    res.json(post);
});

app.delete('/:uuid', protect, checkPostOwnership, async (req, res) => {
    const { uuid } = req.params;
    const post = await db.post.delete({ where: { id: uuid } });
    res.json(post);
});

export default app;