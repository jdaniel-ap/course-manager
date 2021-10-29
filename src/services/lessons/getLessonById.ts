import { noAdminError } from './../../utils/errors';
import { FindUser } from './../../utils/findUser';
import { client } from "../../models/client"

export class GetLessonById {
  moduleId: string
  userId: string
  constructor(moduleId : string) {
    this.moduleId = moduleId
  }

  async getData() {

    const request = await client.lesson.findMany({
      where: {
        moduleId: this.moduleId
      }
    });

    return { info: request, status: 'success' }
  }
}