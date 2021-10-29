import { FindUser } from './../../utils/findUser';
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import 'dotenv/config';

interface Ilogin {
  username: string
  password: string
}

export class Login {
  username: string;
  password: string;

  constructor(data : Ilogin) {
    Object.assign(this, data);
  }

 async auth() {
    const findUser = new FindUser(this.username);

    const user = await findUser.byUsername();

    if(!user) throw new Error('Invalid user or email');

    const passwordMatch = await compare(this.password, user.password);

    if(!passwordMatch) throw new Error('Invalid user or email');

    const { password: _, ...userData } = user;

    
    const token =  sign(userData, process.env.SECRET_KEY, {
      subject: userData.id,
      expiresIn: '30m',
    });
    
    return { token, userInfo: {...userData } };
  }
}