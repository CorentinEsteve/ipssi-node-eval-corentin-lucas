import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

const app = Router()

app.get('/posts', async (req, res) => {
 const posts = await db.post.findMany({
    include: {
        comments: true,
      },
 })
    res.status(200).json({ posts })
})

app.get('/posts/:date', async (req, res) => {

    var tmp = +req.params.date
    var date = new Date(tmp * 1000)
    try{
        const posts = await db.post.findMany({
            where: {
                createdAt: {
                    gte: date,
                }
            },
            include: {
                comments: true, 
              }
        })
        res.status(200).json({ posts }) 
    }
    catch{}
})

app.post('/posts',  async (req: Request, res: Response) => {
    try{
        validationResult(req).throw()
        const posts = await db.post.create({
            data: {
                authorId: req.user.id,
                title : req.body.title,
                content: req.body.content,
            }
        })
        res.status(201).json({ posts })
    }
    catch(err){
        console.log("erreur : " + err)
        res.status(400).json({ message:"error creation post" })
    }
})

app.delete('/posts/:uuid', async (req, res) => {
    try{
        if (req.user.role !== "ADMIN" ) {
            const post = await db.post.delete({
                where: {
                    id: req.params.uuid,
                },
                select: {
                    authorId: true,
                }
            })
            res.status(200).json({ post })
            if (post?.authorId !== req.user.id) {
                return res.status(403).json({ message: "You are not allowed to delete this post" });
            }
        }
    }
    catch(err){
        res.status(400).json({ message:"error delete post" })
    }
})

app.put('/posts/:uuid', async (req, res) => {
    try{
        const post = await db.post.update({
            where: {
                id: req.params.uuid,
            },
            data: {
                title: req.body.title,
                content: req.body.content,
            }
        })
        res.status(200).json({ post })
    }
    catch(err){
        res.status(400).json({ message:"error update post" })
    }
})

app

export default app