import { Login } from "../../services/user/login";
import { Response, Request } from "express";

export class LoginController {
  async execute(req: Request, res: Response) {
    try {
      const { body } = req;
      const { username, password } = body;

      const login = new Login({ username, password });
      const user = await login.auth();
      

      res.status(200).json(user);

    } catch (e) {
      res.status(400).json({ message: e.message, status: "error" });
    }
  }
}
