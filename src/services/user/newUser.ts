import { IUser, IUserRequest } from './../../utils/types';
import { FindUser } from "./../../utils/findUser";
import { client } from "../../models/client";
import { hash } from 'bcryptjs';

export class NewUser {
  username: string;
  password: string;
  email: string;

  constructor(data: IUserRequest) {
    Object.assign(this, data);
  }

  async execute() {
    const userValues: IUser = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: "USER",
    };

    const userExist = new FindUser(this.username);

    const user = await userExist.byUsername();

    const emailAlreadyExist = await client.user.findFirst({
      where: {
        email: this.email
      }
    });

    if(user || emailAlreadyExist) {
      throw new Error('User or Email already exist');
    }

    const passwordHash = await hash(this.password, 8);

    userValues.password = passwordHash;

    const request = await client.user.create({
      data: {
        ...userValues,
      },
    });

    if(!request) throw new Error('Something happened while creating the user, try again')

    return { status: 'success', message: 'You have been successfully registered' };
  }
}
