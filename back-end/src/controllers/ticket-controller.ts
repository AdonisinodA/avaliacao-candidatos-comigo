import {Response, Request, NextFunction, response} from 'express'
import TicketUseCase from '../use-cases/ticket-use-case'
import { ticketType } from '../entities/ticket-entity';
import { UpdateTicketInput } from '../repositories/ticket-repositorie';

interface ITicketData {
    passive_contact: boolean;
    contact_type: ticketType;
    type: string;
    reason: string;
    detail: string;
    collaborator_id: number;
    vehicle_ids: number[]; 
}

export default class TicketController{

    static async create(req:Request<{},{},ITicketData>, res:Response, next: NextFunction){
        try{
        const body = req.body
        const ticket = await new TicketUseCase().createTicket(body)
        res.status(201).json(ticket)
        }catch(error){
        next(error)
        }
    }
    static async list(req:Request, res:Response, next: NextFunction){
        try{
            const ticket = await new TicketUseCase().listAllTickets()
            res.status(200).json(ticket)

            }catch(error){
                next(error)
            }
    }

    static async edit(req:Request<{},{},UpdateTicketInput>, res:Response, next: NextFunction){
        try{
            const body = req.body
           
            const ticket = await new TicketUseCase().updateTicket(body)
            res.status(200).json(ticket)

            }catch(error){
                next(error)
            }
    }

    static async delete(req:Request<{ticket_id?:number}>, res:Response, next: NextFunction){
        try{
            const {ticket_id} = req.params
            const ticket = await new TicketUseCase().deleteTicket(ticket_id as number)
            res.status(200).json(ticket)

            }catch(error){
                next(error)
            }
    }


    static async getById(req:Request<{ticket_id?:number}>, res:Response, next: NextFunction){
        try{
            const {ticket_id} = req.params
            const ticket = await new TicketUseCase().getTicketById(ticket_id as number)
            res.status(200).json(ticket)
            }catch(error){
                next(error)
            }
    }
}