import { PrismaClient, Ticket, Ticket_vehicle } from '@prisma/client';
import { DateUtils } from '../utils/date';
export interface UpdateTicketInput {
  ticket_id: number;
  passive_contact?: boolean;
  contact_type?: string;
  type?: string;
  reason?: string;
  detail?: string;
  status?: string;
  collaborator_id?: number;
  vehicle_ids?: number[]; // Novos IDs de veículos a serem conectados
}
class TicketRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Criar um novo Ticket
  async create(ticketData: {
    passive_contact: boolean;
    contact_type: string;
    type: string;
    reason: string;
    detail: string;
    collaborator_id: number;
    vehicle_ids: number[];
  }) {
    const newTicket = await this.prisma.ticket.create({
      data: {
        passive_contact:ticketData.passive_contact,
        contact_type:ticketData.contact_type,
        type:ticketData.type,
        reason:ticketData.reason,
        detail:ticketData.detail,
        term:DateUtils.addBusinessDays(new Date(),3),
        status:'Andamento',
        collaborator_id:ticketData.collaborator_id,
        tickets_vehicles: {
          create: ticketData.vehicle_ids.map(vehicle_id => ({
            vehicles: { connect: { id: vehicle_id } },
          })),
        },
      },
      include: {
        tickets_vehicles: true, // Inclui os tickets_vehicles no retorno
      },
    });

    return newTicket;
  }
  // Listar todos os Tickets
  async findAll() {
    const tickets = await this.prisma.ticket.findMany({
      include: {
        tickets_vehicles: {
          include: {
            vehicles: true,
          },
        },
      },
    });
    return tickets
  }

  // Encontrar um Ticket por ID
  async findById(ticketId: number): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { id: ticketId },
    });
  }

  // Atualizar um Ticket por ID
  async updateTicketWithVehicles(input: UpdateTicketInput) {
    const { ticket_id, passive_contact, contact_type, type, reason, detail, status, collaborator_id, vehicle_ids } = input;
  
    try {
      // Atualiza o ticket e remove todos os veículos associados a ele antes de adicionar os novos.
      const updatedTicket = await this.prisma.ticket.update({
        where: { id: ticket_id },
        data: {
          passive_contact,
          contact_type,
          type,
          reason,
          detail,
          status,
          collaborator_id,
          // Remove todas as conexões de veículos anteriores
          tickets_vehicles: {
            deleteMany: {},
            create: vehicle_ids ? vehicle_ids.map(vehicle_id => ({
              vehicles: { connect: { id: vehicle_id } },
            })) : [],
          },
        },
        include: {
          tickets_vehicles: true, 
        },
      });
  
      return updatedTicket;
    } catch (error) {
      console.error('Erro ao atualizar o ticket:', error);
      throw error;
    }
  }
  // Deletar um Ticket por ID
  async delete(ticketId: number): Promise<Ticket> {
    return await this.prisma.ticket.delete({
      where: { id: ticketId },
    });
  }
}

export default TicketRepository;
