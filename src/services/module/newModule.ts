import { noAdminError } from './../../utils/errors';
import { FindUser } from './../../utils/findUser';
import { IModule } from './../../utils/types';
import { client } from "../../models/client";

export class NewModule {
  name : string;
  userId: string;

  constructor(name : string, userId: string) {
    this.name = name;
    this.userId = userId;

  }

  async create() {
    const findUser = new FindUser(this.userId);
    const user = await findUser.byId();

    if(user.role !== 'ADMIN') throw new Error(noAdminError);

    const request = await client.module.create({
      data: {
        name: this.name
      }
    });

    if(!request) throw new Error('Something happened while creating the module, try again');

    return { message: 'Module have been successfully created', status: 'success'}
  }
}