import { RequestHandler } from 'express'
import db from '../db'

export const checkPostOwnership: RequestHandler = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const post = await db.post.findUnique({ where: { id:uuid } });
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        const userId = req.user?.id;
        if (post.userId !== userId) {
            return res.status(401).json({ error: 'Unauthorized.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export const checkCommentOwnership: RequestHandler = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const comment = await db.comment.findUnique({ where: { id:uuid  } });
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

        const userId = req.user?.id;
        const post = await db.post.findUnique({ where: { id: comment.id } });
        if (post && post.userId !== userId) {
            return res.status(401).json({ error: 'Unauthorized.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

