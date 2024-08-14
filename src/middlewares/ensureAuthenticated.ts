import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import autheConfig from "../config/authe";
import TokenPayload from "../interfaces/TokenPayloadTDO";
import AppError from "../errors/AppError";

export default function ensureAuthetucated(request:Request, response:Response, next:NextFunction): void {
 const authHeaders = request.headers.authorization;
 if (!authHeaders){
    throw new AppError('JWT token is missing', 401)
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
    throw new AppError('Ivalid JWT token', 401);
 }

};