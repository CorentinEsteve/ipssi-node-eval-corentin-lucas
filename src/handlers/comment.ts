import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

export const getComments: RequestHandler = async (req, res) => {
    try {
        validationResult(req).throw()
        const comment = await db.comment.create({
            data: {
                authorId: req.user.id,
                postId: req.body.postId,
                content: req.body.content,
            }
        })
        res.status(201).json({ comment })
    }
    catch (err) {
        console.log("erreur : " + err)
        res.status(400).json({ message: "error creation comment" })
    }
}

export const putComments: RequestHandler = async (req, res) => {
    try {
        const authorId = await db.comment.findUnique({
            where: {
                id: req.params.uuid,
            },
            select: {
                authorId: true,
            }
        })
        if (req.user.id == authorId?.authorId) {
            validationResult(req).throw()
            const comment = await db.comment.update({
                where: {
                    id: req.params.uuid,
                },
                data: {
                    content: req.body.content,
                }
            })
            res.status(201).json({ message: "Comment update", comment })
        }
        else {
            res.status(401).json({ message: "You are not authorized to update this comment" })
        }
    }
    catch (err) {
        console.log("erreur : " + err)
        res.status(400).json({ message: "error update comment" })
    }
}

export const deleteComments: RequestHandler = async (req, res) => {
    try {
        const authorId = await db.comment.findUnique({
            where: {
                id: req.params.uuid,
            },
            select: {
                authorId: true,
            }
        })
        if (req.user.role == "ADMIN" || req.user.id == authorId?.authorId) {
            const comment = await db.comment.delete({
                where: {
                    id: req.params.uuid,
                },
            })
            res.status(200).json({ message: "Comment successfully deleted", comment })
        }
        else {
            res.status(401).json({ message: "You are not authorized to delete this comment" })
            console.log(req.user.role)
        }
    }

    catch (err) {
        res.status(400).json({ message: "error delete comment" })
    }
}