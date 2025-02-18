import { PrismaClient } from "@prisma/client/"
import User from "../entities/collaborator-entity"
import AppError from "../error/app-error"
import { permissions } from "../enums/permissions"


interface ILogin{
    email:string
    password:string
}

interface IResponse{
    id:number,
    name: string | undefined 
    email: string | undefined 
    role: string | undefined 
    token:string
}
export default class login{
    static async execute({email,password}:ILogin):Promise<IResponse>{
        const prisma = new PrismaClient()
        const userPrisma = new User(prisma)
        const user = await userPrisma.getUser({email,password})
        if(!user){
            AppError('Usuário não encontrado',404)
        }
        const token = userPrisma.generateTokenJwt({id:user!.id,email:user!.email,name:user!.name,role:user!.role as permissions})
        return {
            id:user!.id,
            name:user?.name,
            email:user?.email,
            role:user?.role,
            token
        }
    }
}