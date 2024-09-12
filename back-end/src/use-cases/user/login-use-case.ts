import { PrismaClient } from "@prisma/client/"
import User from "../../entities/user-entity"

interface ILogin{
    email:string
    password:string
}

interface IResponse{
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
        const token = userPrisma.generateTokenJwt(email,password)
        return {
            name:user?.name,
            email:user?.email,
            role:user?.role,
            token
        }
    }
}