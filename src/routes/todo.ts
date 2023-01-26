import { Request, RequestHandler, Response, Router } from "express";
import db from '../db';
import { checkTodoOwnership } from '../handlers/todo';
import { protect } from '../modules/auth'

const app = Router()


app.get('/todos', protect, async (req, res) => {
    try {
        const userId = req.user?.id;
        const todos = await db.todoList.findMany({ where: { userId } });
        res.status(200).json({ todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get('/todo/:uuid', protect, async (req, res) => {
    try {
        const { uuid } = req.params;
        const todo = await db.todoList.findUnique({ where: { id:uuid } });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
        }
        const todoItems = await db.todoItem.findMany({ where: { todoListId: todo.id } });
        res.status(200).json({ todo, todoItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/todo', protect, async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user?.id;
        const todo = await db.todoList.create({ data: { name, userId } });
        res.status(201).json({ todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.delete('/todo/:uuid', protect, checkTodoOwnership, async (req, res) => {
    try {
        const { uuid } = req.params;
        const todo = await db.todoList.delete({ where: { id:uuid } });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
        }
        res.status(200).json({ message: 'Todo deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.put('/todo/:uuid', protect, checkTodoOwnership, async (req, res) => {
    try {
        const { uuid } = req.params;
        const { name } = req.body;
        const todo = await db.todoList.update({
            data: { name },
            where: { id:uuid  }
        });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
        }
        res.status(200).json({ todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/todoItem', protect, async (req, res) => {
    try {
        const { description, todoListId:todoId } = req.body;
        const todoItem = await db.todoItem.create({ data: { description, todoListId:todoId } });
        res.status(201).json({ todoItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default app