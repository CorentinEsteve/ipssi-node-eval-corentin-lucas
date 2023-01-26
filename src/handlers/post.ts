import { RequestHandler } from 'express'
import db from '../db'

export const getPosts: RequestHandler = async (req, res) => {
    const posts = await db.post.findMany({
        include: {
            comments: true,
        },
    })
    res.status(200).json({ posts })
}