import { GetModules } from './../../services/module/getModule';
import { Request, Response } from 'express';

export class GetModulesController {
  async execute(req: Request, res: Response) {
    try {
      const getModules = new GetModules();
      
      const modules = await getModules.allData();

      res.status(200).json({ info: modules, status: 'success'});
      
    } catch(e) {
      res.status(400).json(e.message);
    }
  }
}