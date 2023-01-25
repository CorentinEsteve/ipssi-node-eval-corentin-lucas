import { RequestHandler } from 'express'
import db from '../db'

export const checkTodoOwnership: RequestHandler = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const todo = await db.todoList.findUnique({ where: { id:uuid } });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
        }

        const userId = req.user?.id;
        if (todo.userId !== userId) {
            return res.status(401).json({ error: 'Unauthorized.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

export const checkTodoItemOwnership: RequestHandler = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const todoItem = await db.todoItem.findUnique({ where: { id:uuid  } });
        if (!todoItem) {
            return res.status(404).json({ error: 'Todo Item not found.' });
        }

        const userId = req.user?.id;
        const todo = await db.todoList.findUnique({ where: { id: todoItem.id } });
        if (todo && todo.userId !== userId) {
            return res.status(401).json({ error: 'Unauthorized.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};