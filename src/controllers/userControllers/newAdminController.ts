import { NewAdmin } from '../../services/user/newAdmin';
import { Response, Request } from "express";

export class NewAdminController {

  async execute( req: Request, res: Response) {
    try {
      const { id } = res.locals.user;
      const { body } = req;
      const { password, email, username } = body;
      
      const newAdmin = new NewAdmin({ password, email, username }, id);
      
      const request = await newAdmin.execute();
      
      res.status(200).json(request);

    } catch(e) {
      res.status(400).json({ message: e.message, status: 'error'})
    }

  }
}