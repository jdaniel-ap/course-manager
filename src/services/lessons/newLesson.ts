import { noAdminError } from './../../utils/errors';
import { FindUser } from './../../utils/findUser';
import { ILesson } from './../../utils/types';
import { client } from "../../models/client";

export class NewLesson{
  id: string;
  name : string;
  date: Date;
  module: string;

  constructor(data : ILesson, id : string) {
    Object.assign(this, data);
    this.id = id;
  };

  async create() {
    const findUser = new FindUser(this.id);
    const user = await findUser.byId();

    const findModule = await client.module.findFirst({ where: { id: this.module }});

    if(!findModule) throw new Error('this module doent exist');

    if(user.role !== 'ADMIN') throw new Error(noAdminError);

    const request = await client.lesson.create({
      data: {
        name: this.name,
        date: this.date,
        moduleId: this.module,
      }
    });

    return { message: 'lesson has been created', status: 'success' }
  }
}