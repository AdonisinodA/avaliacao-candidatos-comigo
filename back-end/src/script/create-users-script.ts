import { PrismaClient } from "@prisma/client"
import { UserRepositorie } from "../repositories/user-repositorie"
import bcrypt from "bcrypt";

export default class CreateUsersScript{
   
    async execute(){
        const users =[ {
            name:'Colaborador',
            email:'colaborador@email.com',
            password:bcrypt.hashSync('comigo123', 8),
            role:'colaborador'
        },
        {
            name:'Administrador',
            email:'adm@email.com',
            password:bcrypt.hashSync('comigo123', 8),
            role:'adm'
        }
        ]

        const prisma = new PrismaClient()
        await Promise.all(users.filter(async (user)=>{
            const result = await new UserRepositorie(prisma).get(user.email)
                if(result){
                    return 
                }
                await new UserRepositorie(prisma).create(user)

        }))

     
    }
}