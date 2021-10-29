import { Request, Response } from 'express';
import { EditModule } from '../../services/module/editModule';

export class EditModuleController {
  async execute(req: Request, res: Response) {
    try {
      const { body } = req;
      const { name, moduleId } = body;
      const { id } = res.locals.user;
  
      const editModule = new EditModule(name, moduleId, id);
      const module = await editModule.update();
  
      res.status(200).json(module);
      
    } catch(e) {
      res.status(400).json(e.message)
    }
  }
}