import {Request, Response, NextFunction} from 'express'
import { ErrorCustom } from '../error/error-custom'


export default function errorHandler (error:unknown, _res:Request, res:Response, _next:NextFunction) {
    if(error instanceof ErrorCustom){
      res.json({message: error.message}).status(error.code)
    }else {
      res.json({message: 'Error interno no servidor.'}).status(500)
    }
  }
  