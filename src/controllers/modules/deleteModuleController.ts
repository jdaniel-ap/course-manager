import { Request, Response } from 'express';
import { DeleteModule } from '../../services/module/deleteModule';

export class DeleteModuleController {
  async execute(req: Request, res: Response){
    try {
      const { body } = req;
      const { params } = req;
      const { id } = res.locals.user;
  
      const updateModule = new DeleteModule(id, params.id);
      const module = await updateModule.delete();
  
      res.status(200).json(module);

    } catch(e) {
      res.status(400).json(e.message);
    }
  }
}