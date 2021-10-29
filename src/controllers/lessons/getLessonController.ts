import { Request, Response } from 'express';
import { GetLesson } from '../../services/lessons/getLesson';

export class GetLessonController {
  async execute(req: Request, res: Response) {
    try {
      const { body } = req;

      const getLesson = new GetLesson(body.id);
      const lesson = await getLesson.getData();
  
      res.status(200).json({ info: lesson, status: 'success'});

    } catch (error) {
      res.status(400).json({ message: error.message, status: 'error'});
    }

  }
}