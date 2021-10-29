import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import { user } from "./routes/userRouter";
import { module } from "./routes/moduleRouter";
import { lesson } from "./routes/lessonRouter";


const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/user', user);
app.use('/api/module', module);
app.use('/api/lesson', lesson);

export { app };