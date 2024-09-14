import { Collaborator, PrismaClient } from "@prisma/client";

interface ICreate{
    name: string;
    email: string;
    password: string;
    role: string;

}
export class CollaboratorRepositorie{
    private prisma: PrismaClient;

    constructor() {
      this.prisma = new PrismaClient();
    }
    async create(users:ICreate){
       await this.prisma.collaborator.create({
            data:users
        })
    }

    async findByEmail(email:string){
       const user =  await this.prisma.collaborator.findFirst({
            where:{
                email
            }
        })

        return user
    }
    async findById(collaboratorId: number): Promise<Collaborator | null> {
        return this.prisma.collaborator.findUnique({
          where: { id: collaboratorId },
        });
      }
}