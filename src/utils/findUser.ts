import { client } from "../models/client";

export class FindUser {
  identifier: string;

  constructor(identifier : string) {
    this.identifier = identifier;
  }

  async byUsername() {
    const request = await client.user.findFirst({
      where: {
        username: this.identifier
      },
    });

    return request;
  }

  async byId() {
    return await client.user.findFirst({
      where: {
        id: this.identifier
      },
    });
  }

  async byEmail() {
    const request = await client.user.findFirst({
      where: {
        email: this.identifier
      }
    });
    
    return request
  }

}