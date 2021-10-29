import { Role } from '.prisma/client';


export interface IUserRequest {
  email: string;
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  password: string;
  email: string;
  role: Role;
}

export interface IModule {
  name: string
}

export interface ILesson {
  name: string
  date: Date
  moduleId: string
}

export interface ILessonEdit {
  id: number
  name: string
  date: Date
  moduleId: string
}
