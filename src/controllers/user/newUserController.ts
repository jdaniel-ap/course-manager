import { Response, Request } from "express";
import { NewUser } from "../../services/user/newUser";

export class NewUserController {

  async execute( req: Request, res: Response) {
    const { body } = req;
    const { email, username, password} = body;

    try {
      const newUser = new NewUser({ email, username, password });
  
      const user = await newUser.execute()
  
      res.status(200).json(user);
    } catch(e) {
      res.status(400).json({message: e.message, status: 'error'})
    }


  }
}