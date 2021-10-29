import { Request, Response } from 'express';
import { NewModule } from './../../services/module/newModule';

export class NewModuleController {
  async execute(req: Request, res: Response) {
    try {

      const { body } = req;

      const { id } = res.locals.user;

      const newModule = new NewModule(body.name, id);

      const request = await newModule.create();

      res.status(201).json(request);

    } catch(e) {
      res.status(400).json(e.message);
    }
  }
}