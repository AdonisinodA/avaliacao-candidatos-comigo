import { PrismaClient, Ticket, Ticket_vehicle } from '@prisma/client';

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
    vehicle_id: number;
  }): Promise<{ ticket: Ticket; ticket_vehicle: Ticket_vehicle }> {
    // Transação iniciada (utilizando conceitos dba relacional ACID)
    return this.prisma.$transaction(async (prisma) => {
      // Criação do Ticket
      const ticket = await prisma.ticket.create({
        data: {
          passive_contact: ticketData.passive_contact,
          contact_type: ticketData.contact_type,
          type: ticketData.type,
          reason: ticketData.reason,
          detail: ticketData.detail,
          collaborator_id: ticketData.collaborator_id,
          status:'Andamento',
          term: new Date(new Date().setDate(new Date().getDate() + 7))
        },
      });

      // Criação do Ticket_vehicle associado
      const ticket_vehicle = await prisma.ticket_vehicle.create({
        data: {
          ticket_id: ticket.id,
          vehicle_id: ticketData.vehicle_id,
        },
      });

      return { ticket, ticket_vehicle };
    });
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
  async update(ticketId: number, updatedData: {
    passive_contact?: boolean;
    contact_type?: string;
    type?: string;
    reason?: string;
    detail?: string;
    collaborator_id?: number;
  }): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: updatedData,
    });
  }

  // Deletar um Ticket por ID
  async delete(ticketId: number): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where: { id: ticketId },
    });
  }
}

export default TicketRepository;
