import { noAdminError } from './../../utils/errors';
import { ILessonEdit } from './../../utils/types';
import { FindUser } from './../../utils/findUser';
import { client } from "../../models/client";

export class EditLesson {
  id: number;
  name: string;
  date: Date;
  moduleId: string;
  userId: string;
  constructor(data : ILessonEdit, userId: string) {
    this.userId = userId;
    Object.assign(this, data)
  }

  async update() {
    const findUser = new FindUser(this.userId);
    const user = await findUser.byId();

    if(user.role !== 'ADMIN') throw new Error(noAdminError);

    const lesson = await client.lesson.findFirst({ where: { id: this.id }});

    if(!lesson) throw new Error('This lesson doesn\'t exist');

    const request = await client.lesson.update({
      where: {
        id: this.id
      },
      data: {
        name: this.name,
        date: this.date,
        moduleId: this.moduleId
      }
    });

    if(!request) throw new Error('ups! something went wrong');

    return { message: 'Lesson has been updated', status: 'success'};
  }
}