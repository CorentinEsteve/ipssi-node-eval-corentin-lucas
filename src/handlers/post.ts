import { RequestHandler } from 'express'
import db from '../db'
import { body, check, validationResult } from "express-validator";

export const getPosts: RequestHandler = async (req, res) => {
    const posts = await db.post.findMany({
        include: {
            comments: true,
          },
     })
        res.status(200).json({ posts })
    }

export const getPostDate: RequestHandler = async (req, res) => {
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
    catch{
        res.status(400).json({ message:"error get post date" })
    }
}

export const postPost: RequestHandler = async (req, res) => {
    try{
        validationResult(req).throw()
        const posts = await db.post.create({
            data: {
                authorId: req.user.id,
                title : req.body.title,
                content: req.body.content,
                published: req.body.published,
            }
        })
        res.status(201).json({ posts })
    }
    catch(err){
        console.log("erreur : " + err)
        res.status(400).json({ message:"error creation post" })
    }
}

export const deletePost: RequestHandler = async (req, res) => {
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
}

export const putPost: RequestHandler = async (req, res) => {
    if (req.user.role == "ADMIN" || req.user.id == req.body.authorId ) {
        try{
            const post = await db.post.update({
                where: {
                    id: req.params.uuid,
                },
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    published: req.body.published,
                },
            })
            res.status(200).json({ post })
        }
        catch(err){
            res.status(400).json({ message:"error update post" })
        }
    }
    else{
        console.log(req.user.id + " " + req.body.authorId)
        console.log(req.user.role)
        res.status(401).json({ message: "You are not allowed to update this post" });
    }
    
    }