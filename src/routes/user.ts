import express from 'express'
import { deleteUser } from '../handlers/user'
import	{enrichUser} from '../modules/auth'

const app = express.Router()

app.get('/user', (req, res) => {

    res.status(200).json({ message: 'Hello user' });

})

app.delete('/user/:id',enrichUser, deleteUser)

export default app