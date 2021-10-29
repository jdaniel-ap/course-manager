import { Request, Response } from 'express';
import { GetLessonById } from '../../services/lessons/getLessonById';

export class GetLessonByIdController {
  async execute(req: Request, res: Response) {
    try {
      const { params } = req;

      const getLesson = new GetLessonById(params.id);
      const lesson = await getLesson.getData();
  
      res.status(202).json(lesson);
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
}