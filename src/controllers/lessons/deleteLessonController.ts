import { DeleteLesson } from './../../services/lessons/deleteLesson';
import { Request, Response } from 'express';

export class DeleteLessonController {
  async execute( req: Request, res: Response ) {
    try {
      const { params } = req;
      const { id } = res.locals.user;

      const lessonId = Number(params.id)
  
      const deleteLesson = new DeleteLesson(lessonId, id);
  
      const lesson = await deleteLesson.delete();
  
      res.status(200).json(lesson);
    } catch(err) {
      res.status(400).json({ message: err.message, status: 'error'});
    }
  }
}