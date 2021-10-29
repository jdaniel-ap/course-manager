import { noAdminError } from './../../utils/errors';
import { FindUser } from './../../utils/findUser';
import { client } from "../../models/client";

export class DeleteModule {
  id: string;
  moduleId: string;

  constructor(id: string, moduleId : string) {
    this.id = id;
    this.moduleId = moduleId;
  }

  async delete() {
    const findUser = new FindUser(this.id);
    const user = await findUser.byId();

    if(user.role !== 'ADMIN') throw new Error(noAdminError);

    const deleteLessons = client.lesson.deleteMany({
      where: {
        moduleId: this.moduleId
      }
    });

    const deleteModule = client.module.delete({
      where: {
        id: this.moduleId
      }
    });

    await client.$transaction([deleteLessons, deleteModule]);

    return { message: 'the module and associated lessons have been successfully deleted', status: 'success'}
  }
}