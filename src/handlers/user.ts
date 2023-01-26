import { Request, RequestHandler } from 'express';
import db from '../db';
import {
        createJWT,
        comparePassword,
        hashPassword
    } from '../modules/auth';


interface TypedRequestParam extends Request {
    body: {
        username?: string;
        password?: string;
    }
}

export const deleteUser: RequestHandler =  async (req, res) => {
    const { id } = req.params;
    console.log(req.user)
    if (! id) {
        res.status(400).json({ error: 'Invalid body ssprovided.' });
        return;
    }
    if (req.user.role === "ADMIN") {
        try {
            await db.user.delete({
                where: {
                    id
                },
                include: {
                    posts: true,
                    comments: true,
                    },
            })
            res.status(200).json({ message: 'User deleted.' });
        }
        catch (e) {
            res.status(500).json({ error: 'Something went wrong.' });
        }
    }
    if(req.user.id === id){
        try {
            await db.user.delete({
                where: {
                    id
                },
                include: {
                    posts: true, 
                    comments: true,
                  }
            })
            res.status(200).json({ message: 'User deleted.' });
        }
        catch (e) {
            res.status(500).json({ error: 'Something went wrong.' });
        }      
}
else{
    res.status(401).json({ error: 'You are not authorized to delete this user.' });
}
}

export const createNewUser: RequestHandler = async (req: TypedRequestParam, res) => {
    const { username, password } = req.body;
    if (! username || ! password) {
        res.status(400).json({ error: 'Invalid body provided.' });
        return;
    }
    if (await db.user.findUnique({ where: { username }})) {
        res.status(400).json({ error: 'Username already taken.' });
        return;
    }
    hashPassword(password)
        .then((hash) => db.user.create({
            data: {
                username,
                password: hash
            }
        }))
        .then((user) => createJWT(user))
        .then((token) => res.status(201).json({ token }));

}

export const signIn: RequestHandler = async (req: TypedRequestParam, res) => {
    const { username, password } = req.body;
    if (! username || ! password) {
        res.status(400).json({ error: 'Invalid body provided.' });
        return;
    }
    db.user.findUnique({ where: { username }})
        .then((user) => {
            if (
                ! user ||
                ! comparePassword(password, user.password)
            ) {
                res.status(401).json({ error: 'Invalid credentials.' });
                return;
            }
            const token = createJWT(user);
            res.status(200).json({ token });
        });
};
