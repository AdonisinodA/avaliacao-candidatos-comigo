import { DateTime } from 'luxon';

// Tipo para o modelo Ticket
interface Ticket {
  id: number;
  passive_contact: boolean;
  contact_type: string;
  type: string;
  reason: string;
  detail: string;
  createdAt: DateTime; 
  updatedAt: DateTime; 
  term:DateTime
  status:string
  collaborator_id: number;
  tickets_vehicles: TicketVehicle[];
}

// Tipo para o modelo Vehicle
interface Vehicle {
  id: number;
  model: string;
  year: number;
  type: string;
  plate: string;
  createdAt: DateTime; 
  updatedAt: DateTime; 
}

// Tipo para o modelo Ticket_vehicle
interface TicketVehicle {
  id: number;
  createdAt: DateTime; 
  updatedAt: DateTime;
  ticket_id: number;
  vehicle_id: number;
  vehicles: Vehicle;
}

// Tipo para a resposta da query
type TicketsWithVehicles = Ticket[];


interface IFormTicket {
  passive_contact: boolean;
  contact_type: string;
  type: string;
  reason: string;
  detail: string;
  vehicle_ids: number[];
}

interface  IFormTickerToSend extends IFormTicket{
  collaborator_id:number
}