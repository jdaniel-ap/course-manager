import { client } from '../../models/client';
import { FindUser } from '../../utils/findUser';
import { IUserRequest, IUser } from '../../utils/types';
import { hash } from 'bcryptjs';


export class NewAdmin {
  username: string;
  password: string;
  email: string;
  id: string;

  constructor(data : IUserRequest, id : string) {
    Object.assign(this, data);
    this.id = id;

  }

  async execute() {

    const adminExist = new FindUser(this.id);
    
    const isAdmin = await adminExist.byId();
    
    if(!isAdmin) throw new Error('Invalid user or email');

    if(isAdmin.role !== 'ADMIN') throw new Error('This is an admin area, you don\'t have permission to access this resource');

    const findUser = new FindUser(this.username);
    const user = await findUser.byUsername();


    if(user) throw new Error('This user already exist');

    const adminData : IUser = {
      password: this.password,
      username: this.username,
      email: this.email,
      role: 'ADMIN'
    }

    const passwordHash = await hash(this.password, 8);

    adminData.password = passwordHash;

    await client.user.create({
      data: {
        ...adminData
      }
    });

    return { message: 'New admin have been successfully registered', status: 'success' }

  }
}