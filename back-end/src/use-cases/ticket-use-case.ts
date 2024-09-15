import { Ticket, Ticket_vehicle } from '@prisma/client';
import TicketRepository, { UpdateTicketInput } from '../repositories/ticket-repositorie';
import AppError from '../error/app-error';
import TicketEntity, { ticketType } from '../entities/ticket-entity';

class TicketUseCase {
  private ticketRepo: TicketRepository;

  constructor() {
    this.ticketRepo = new TicketRepository();
  }

  async createTicket(ticketData: {
    passive_contact: boolean;
    contact_type: ticketType;
    type: string;
    reason: string;
    detail: string;
    collaborator_id: number;
    vehicle_ids: number[]; 
  }) {
      const ticket = new TicketEntity({
        collaborator_id: ticketData.collaborator_id,
        vehicle_ids: ticketData.vehicle_ids,
        contactType: ticketData.contact_type,
        detail: ticketData.detail,
        passiveContact: ticketData.passive_contact,
        reason: ticketData.reason,
        type: ticketData.type
      })
      await this.ticketRepo.create({
        collaborator_id:ticket.collaboratorId,
        contact_type:ticket.contactType,
        detail:ticket.detail,
        passive_contact:ticket.passiveContact,
        reason:ticket.reason,
        type:ticket.reason,
        vehicle_ids:ticket.vehicleIds

      });
  }

  // Listar todos os Tickets
  async listAllTickets(): Promise<Ticket[] | undefined> {
    try {
      return await this.ticketRepo.findAll();
    } catch (error) {
      AppError('Erro ao listar tickets.', 500);
    }
  }

  // Encontrar um Ticket por ID
  async getTicketById(ticketId: number) {
    try {
      return await this.ticketRepo.findById(ticketId);
    } catch (error) {
      AppError('Erro ao buscar ticket');
    }
  }

  // Atualizar um Ticket por ID
  async updateTicket(updatedData:UpdateTicketInput) {
    try {
      return await this.ticketRepo.updateTicketWithVehicles(updatedData);
    } catch (error) {
      AppError('Erro ao atualizar ticket');
    }
  }

  // Deletar um Ticket por ID
  async deleteTicket(ticketId: number) {
    try {
      return await this.ticketRepo.delete(ticketId);
    } catch (error) {
      console.error('Error deleting ticket:', error);
      AppError('Erro ao deletar ticket');
    }
  }
}

export default TicketUseCase;
