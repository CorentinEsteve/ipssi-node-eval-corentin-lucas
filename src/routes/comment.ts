import { Request, RequestHandler, Response, Router } from "express";
import db from "../db";
import { getComments, putComments,deleteComments } from "../handlers/comment";
import { enrichUser } from "../modules/auth";

const app = Router()

app.post('/comment', getComments)
   
app.put('/comment/:uuid', putComments)
 
app.delete('/comment/:uuid', enrichUser , deleteComments)

export default app