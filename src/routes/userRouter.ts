import { LoginController } from '../controllers/user/loginController';
import { Router } from "express";
import { NewUserController } from "../controllers/user/newUserController";
import { validateToken } from "../middlewares/validateToken";
import { NewAdminController } from '../controllers/user/newAdminController';

const user = Router();

const newUser = new NewUserController();
const login = new LoginController();
const newAdmin = new NewAdminController();

user.post('/new', newUser.execute);
user.post ('/login', login.execute);
user.post('/new/admin', validateToken, newAdmin.execute)

/* Agreagar ruta para crear admins */

export { user }