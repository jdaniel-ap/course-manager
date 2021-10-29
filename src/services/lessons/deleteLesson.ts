import { noAdminError } from './../../utils/errors';
import { FindUser } from './../../utils/findUser';
import { client } from "../../models/client";

export class DeleteLesson {
  lesson: number
  userId: string
  constructor(lesson : number, userId : string) {
    this.lesson = lesson;
    this.userId = userId;
  }

  async delete() {
    const findUser = new FindUser(this.userId);

    const user = await findUser.byId();

    const lesson = await client.lesson.findFirst({ where: { id: this.lesson }});

    if(!lesson) throw new Error('This lesson does\'nt exist');

    if(user.role !== 'ADMIN') throw new Error(noAdminError);

    const request = await client.lesson.delete({ where: { id: this.lesson }});

    if(!request) throw new Error('ups! something went wrong');

    return { message: 'lesson has been delete', status: 'success' }
  }
}