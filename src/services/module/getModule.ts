import { client } from "../../models/client";

export class GetModules {
  async allData() {
    const request = await client.module.findMany({});

    if(!request) throw new Error('ups! something went wrong');

    return request;
  }
}