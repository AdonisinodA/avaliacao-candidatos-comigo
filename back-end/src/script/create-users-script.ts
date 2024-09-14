import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";
import { CollaboratorRepositorie } from "../repositories/collaborator-repositorie";

// script para gerar usuarios e veiculos
export default class CreateUsersScript{
   
    async execute(){
        const users =[ {
            name:'Atendente',
            email:'atendente@email.com',
            password:bcrypt.hashSync('comigo123', 8),
            role:'atendente'
        },
        {
            name:'Administrador',
            email:'admin@email.com',
            password:bcrypt.hashSync('comigo123', 8),
            role:'admin'
        }
        ]

        const prisma = new PrismaClient()

        const result = await Promise.all(users.map(async (user)=>{
            const result = await new CollaboratorRepositorie().findByEmail(user.email)
                if(result){
                    return false
                }
                await new CollaboratorRepositorie().create(user)
                return true
        }))

        if(result.includes(true)){
            const vehicleTypes = [
                'Sedan', 
                'SUV', 
                'Hatchback', 
                'Coupe', 
                'Convertible', 
                'Pickup', 
                'Van', 
                'Minivan', 
                'Wagon', 
                'Crossover'
              ];
            
              const vehicles = vehicleTypes.map((type, index) => ({
                model: `Model-${index + 1}`,
                year: 2020 + index, 
                type,
                plate: `ABC-${Math.floor(Math.random() * 1000)}`, 
              }));
            
              await prisma.vehicle.createMany({
                data: vehicles,
              });
              
             console.info('Usuários criados com sucesso!')
        }
        
        }
    }
