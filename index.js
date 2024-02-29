import express from "express";
import mongoose from "mongoose";
import {registerValidation, loginValidation, postCreateValidation} from "./validation.js";
import checkAuth from "./utils/checkAuth.js"
import * as UserController from "./controllers/UserController.js"
import * as PostController from "./controllers/PostController.js"



mongoose
    .connect('mongodb+srv://platonivankiv:qwer1234@platon.txa9qmi.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))


const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', loginValidation, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)


app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts',checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)




app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server ok')
})