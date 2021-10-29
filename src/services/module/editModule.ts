import { noAdminError } from './../../utils/errors';
import { FindUser } from './../../utils/findUser';
import { client } from "../../models/client";

export class EditModule {
  name : string;
  moduleId : string;
  id : string;

  constructor(name : string, moduleId: string, id: string) {
    this.name = name;
    this.moduleId = moduleId;
    this.id = id;
  }

  async update() {
    const findUser = new FindUser(this.id);
    const user = await findUser.byId();

    if(user.role !== 'ADMIN') throw new Error(noAdminError);

    const request = await client.module.update({
      where: {
        id: this.moduleId
      },
      data: {
        name: this.name
      }
    });

    if(!request) throw new Error('ups! something went wrong');

    return { message: 'module have been updated', status: 'success' }
  }
}