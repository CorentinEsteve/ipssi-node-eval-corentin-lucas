import express from 'express'
import * as dotenv from 'dotenv'
import userRoutes from './routes/user'
// import todoRoutes from './routes/todo'
import { protect } from './modules/auth'
import { createNewUser } from './handlers/user'

dotenv.config()

const app = express()

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
})

// app.use('/api', protect, [todoRoutes])

app.post('/signUp', createNewUser)

app.post('/signIn')

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})



