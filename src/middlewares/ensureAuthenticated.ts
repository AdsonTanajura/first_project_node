import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import autheConfig from "../config/authe";
import usersRouter from "../routes/users.routes";

interface TokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

export default function ensureAuthetucated(request:Request, response:Response, next:NextFunction): void {
 const authHeaders = request.headers.authorization;
 if (!authHeaders){
    throw new Error('JWT token is missing')
 }

 const [, token] = authHeaders.split(' ');

 try{
     const decoded = verify(token, autheConfig.jwt.secret);
   
     const { sub } = decoded as TokenPayload;
     
     request.user = {
      id: sub,
     }
     
     return next();
 } catch {
    throw new Error('Ivalid JWT token');
 }

};