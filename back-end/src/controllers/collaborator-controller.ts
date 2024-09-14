import { NextFunction,Response,Request } from "express"
import login from "../use-cases/collaborator-use-case"

interface ILogin{
    email:string,
    password:string
}

export default class CollaboratorController{
    static async login(req:Request<{},{},ILogin>,res:Response,next:NextFunction){
        try {
            const {email,password} = req.body
            const result =  await login.execute({
                email,
                password
            })
            res.json(result).status(201)
        }catch(error){
            next(error)
        }
    }
}

