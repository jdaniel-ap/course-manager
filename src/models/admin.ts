import { client } from "./client";
import { hash } from "bcryptjs";
import 'dotenv/config';

const add = async () => {
 const request = await client.user.create({
  data: {
    username: process.env.ADM_USERNAME,
    email: process.env.ADM_EMAIL,
    password: await hash(process.env.ADM_PASS, 8),
    role: 'ADMIN',
    },
  });

  console.log('Initial user admin created successfully');
}

add();
