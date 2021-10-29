import { Request, Response } from 'express';
import { EditLesson } from '../../services/lessons/editLesson';

export class EditLessonController {
  async execute(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = res.locals.user;
  
      const editLesson = new EditLesson(body, id);
  
      const lesson = await editLesson.update();
  
      res.status(201).json(lesson);
    } catch (error) {
      res.status(400).json({ message: error.message, status: 'error'});
    }
  }
}