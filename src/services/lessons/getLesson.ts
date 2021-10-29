import { client } from "../../models/client";

export class GetLesson {
  moduleId: string;

  constructor(moduleId : string) {
    this.moduleId = moduleId;
  }

  async getData() {
    const request = await client.lesson.findMany({
      where: {
        moduleId: this.moduleId
      },
      select: {
        name: true,
        id: true,
        date: true,
        module: {
          select: {
            name: true
          }
        }
      }
    });

    if(!request) throw new Error('ups! something went wrong');

    return request;
  }
}