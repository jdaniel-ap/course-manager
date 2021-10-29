import { Request, Response } from 'express';
import { NewLesson } from '../../services/lessons/newLesson';

export class NewLessonController {
  async execute(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = res.locals.user;

      const newLesson = new NewLesson(body, id);
      const lesson =  await newLesson.create();
  
      res.status(201).json(lesson);

    } catch(e) {
      res.status(400).json({message: e.message, status: 'error'});
    }
  }
}