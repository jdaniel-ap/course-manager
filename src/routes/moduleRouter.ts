import { DeleteModuleController } from './../controllers/modules/deleteModuleController';
import { EditModuleController } from './../controllers/modules/editModuleController';
import { GetModulesController } from './../controllers/modules/GetModulesController';
import { NewModuleController } from './../controllers/modules/newModuleController';
import { Router } from "express";
import { validateToken } from '../middlewares/validateToken';

const module = Router();

const newModule = new NewModuleController();
const getModules = new GetModulesController();
const editModule = new EditModuleController();
const deleteModule = new DeleteModuleController();

module.post('/new', validateToken, newModule.execute);
module.get('/', validateToken, getModules.execute);
module.put('/update', validateToken, editModule.execute);
module.delete('/delete', validateToken, deleteModule.execute);

export { module }