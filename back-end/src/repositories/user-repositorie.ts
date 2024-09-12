import { PrismaClient } from "@prisma/client";

interface ICreate{
    name: string;
    email: string;
    password: string;
    role: string;

}
export class UserRepositorie{
    constructor(private readonly prisma:PrismaClient){}

    async create(users:ICreate){
       await this.prisma.collaborator.create({
            data:users
        })
    }

    async get(email:string){
       const user =  await this.prisma.collaborator.findFirst({
            where:{
                email
            }
        })

        return user
    }
}