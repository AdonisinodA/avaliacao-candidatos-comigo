import {Response, Request, NextFunction} from 'express'
import { verify } from 'jsonwebtoken';
import enviroment from '../config/enviroment';
import { IUserAuthenticated } from '../types/interface';



export class EnsureAuthenticated{
   static execute(req:Request & {user?:IUserAuthenticated}, res:Response, next:NextFunction){
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
      return res.status(403).json({ message: 'Token não fornecido' });
    }
  
    verify(token, enviroment.SECRET_KEY_JWT, (err, decoded:any) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      const result = decoded as IUserAuthenticated
  
      req.user = {
        email:result.email,
        name:result.name,
        role:result.role
      }

      next();
    });
   }
}