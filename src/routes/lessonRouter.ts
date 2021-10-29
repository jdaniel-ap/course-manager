import { GetLessonByIdController } from './../controllers/lessons/getLessonByIdController';
import { EditLessonController } from './../controllers/lessons/editLessonController';
import { DeleteLessonController } from './../controllers/lessons/deleteLessonController';
import { GetLessonController } from '../controllers/lessons/getLessonController';
import { NewLessonController } from './../controllers/lessons/newLessonController';
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';

const lesson = Router();

const newLesson = new NewLessonController();
const getLesson = new GetLessonController();
const getLessonById = new GetLessonByIdController();
const deleteLesson = new DeleteLessonController();
const editLesson = new EditLessonController();

lesson.post('/new', validateToken, newLesson.execute);
lesson.get('/', validateToken, getLesson.execute);
lesson.get('/:id', validateToken, getLessonById.execute);
lesson.delete('/delete/:id', validateToken, deleteLesson.execute);
lesson.put('/update', validateToken, editLesson.execute);


export { lesson };
