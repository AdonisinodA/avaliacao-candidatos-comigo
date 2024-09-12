import { PrismaClient } from "@prisma/client"
import { UserRepositorie } from "../repositories/user-repositorie"
import bcrypt from "bcrypt";

// script para gerar usuarios e veiculos
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

        const result = await Promise.all(users.map(async (user)=>{
            const result = await new UserRepositorie(prisma).get(user.email)
                if(result){
                    return false
                }
                await new UserRepositorie(prisma).create(user)
                return true
        }))

        if(result.includes(false)){
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
        }
        
        }
    }
