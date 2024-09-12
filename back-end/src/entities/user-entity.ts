import { PrismaClient } from "@prisma/client"
import AppError from "../error/app-error"
import enviroment from "../config/enviroment"
import { sign } from "jsonwebtoken"
import bcrypt from "bcrypt";


interface IGetUser{
    email:string
    password:string
}


export default class User{
    constructor(private readonly prismaClient: PrismaClient){}

    isValidEmail(email:string){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    async getUser({email,password}:IGetUser){
        if(!email){
            AppError('É preciso enviar o email.')
        }
        if(!password){
            AppError('É preciso enviar a senha.')
        }
        const user = await this.isValidUser({email,password})
        return user
    }

    async isValidUser({email,password}:IGetUser){
        const user = await this.prismaClient.collaborator.findFirst(
            {
                where:{
                    email
                }
            }
        )
        if(!user){
            AppError('Usuário não encontrado', 404)
        }
        if(bcrypt.compareSync(password, user!.password)){
           AppError('Senha incorreta.')
        }
        return user
    }

    // gerar token de autenticação do usuário.
    generateTokenJwt(email:string, password:string){
        const token = sign({ id: email, username: password }, enviroment.SECRET_KEY_JWT!, {
            expiresIn: '10h', 
          });
         return `Bearer ${token}`
    }

}