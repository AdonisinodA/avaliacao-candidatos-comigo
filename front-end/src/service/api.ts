import api from "@/api/axios";
import { IFormTicket, Ticket, Vehicle } from "@/types/ticket";
import localStorageService from "./localStorage";

export async function listTickets(){
    const {data} = await api.get<Ticket[]>('/ticket/list')
    return data
}

export async function listVehicle(){
    const {data} = await api.get<Vehicle[]>('/vehicle/list')
    return data
}
export async function deleteTicket(ticket_id:number){
    await api.delete(`/ticket/delete/${ticket_id}`)
}


export async function createTicket(data:IFormTicket){
    const user = localStorageService.getUser()
    await api.post('/ticket', {collaborator_id:user?.id,...data})
}