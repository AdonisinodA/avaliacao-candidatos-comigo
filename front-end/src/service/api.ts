import api from "@/api/axios";
import { Ticket, Vehicle } from "@/types/ticket";

export async function listTickets(){
    const {data} = await api.get<Ticket[]>('/ticket/list')
    return data
}

export async function listVehicle(){
    const {data} = await api.get<Vehicle[]>('/vehicle/list')
    return data
}