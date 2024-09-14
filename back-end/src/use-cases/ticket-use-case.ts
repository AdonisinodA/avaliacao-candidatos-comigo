import { Ticket, Ticket_vehicle } from '@prisma/client';
import TicketRepository from '../repositories/ticket-repositorie';
import AppError from '../error/app-error';
import TicketEntity, { ticketType } from '../entities/ticket-entity';

class TicketUseCase {
  private ticketRepo: TicketRepository;

  constructor() {
    this.ticketRepo = new TicketRepository();
  }

  // Criar um novo Ticket
  async createTicket(ticketData: {
    passive_contact: boolean;
    contact_type: ticketType;
    type: string;
    reason: string;
    detail: string;
    collaborator_id: number;
    vehicle_id: number; // ID do veículo
  }): Promise<{ ticket: Ticket; ticket_vehicle: Ticket_vehicle } | undefined> {
    try {
      const ticket = new TicketEntity({
        collaborator_id:ticketData.collaborator_id,
        vehicle_id:ticketData.vehicle_id,
        contactType:ticketData.contact_type,
        detail:ticketData.detail,
        passiveContact:ticketData.passive_contact,
        reason:ticketData.reason,
        type:ticketData.type
      })
      return await this.ticketRepo.create(ticketData);
    } catch (error) {
      AppError('Erro ao criar ticket.', 500);
    }
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
  async updateTicket(ticketId: number, updatedData: {
    passive_contact?: boolean;
    contact_type?: string;
    type?: string;
    reason?: string;
    detail?: string;
    collaborator_id?: number;
  }) {
    try {
      return await this.ticketRepo.update(ticketId, updatedData);
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
