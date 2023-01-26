import { Request, RequestHandler, Response, Router } from "express";
import { deletePost, getPostDate, getPosts, postPost, putPost } from "../handlers/post";

const app = Router()

app.get('/posts', getPosts)

app.get('/posts/:date', getPostDate)

app.post('/posts',  postPost)

app.delete('/posts/:uuid', deletePost)

app.put('/posts/:uuid', putPost)
  
export default app