import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import 'dotenv/config';

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  try {
    if(!token) throw new Error("Missing auth token");

    const user = verify(token, process.env.SECRET_KEY);
    
    res.locals.user = user;

    return next();
  } catch(err) {
    return res.status(400).json({ message: err.message, status: 'error'});
  }
}