import { CollaboratorRepositorie } from '../repositories/collaborator-repositorie';
import TicketEntity, { ITicket } from './ticket-entity';

jest.mock('../repositories/collaborator-repositorie'); 

describe('TicketEntity', () => {
  let ticketData: ITicket;

  beforeEach(() => {
    ticketData = {
      passiveContact: true,
      contactType: 'Operacional',
      type: 'Operacional',
      reason: 'Algum motivo',
      detail: 'Explicação detalhada',
      collaborator_id: 1,
      vehicle_ids: [123, 456],
    };

    (CollaboratorRepositorie.prototype.findById as jest.Mock).mockResolvedValue({ id: 1 });
  });

  it('deve criar um TicketEntity com sucesso', () => {
    const ticketEntity = new TicketEntity(ticketData);

    expect(ticketEntity.passiveContact).toBe(ticketData.passiveContact);
    expect(ticketEntity.contactType).toBe(ticketData.contactType);
    expect(ticketEntity.type).toBe(ticketData.type);
    expect(ticketEntity.reason).toBe(ticketData.reason);
    expect(ticketEntity.detail).toBe(ticketData.detail);
    expect(ticketEntity.collaboratorId).toBe(ticketData.collaborator_id);
    expect(ticketEntity.vehicleIds).toEqual(ticketData.vehicle_ids);
  });

  it('deve lançar um erro se passiveContact não for um booleano', () => {
    ticketData.passiveContact = "notBoolean" as any;
    const ticketEntity = new TicketEntity(ticketData);

    expect(() => ticketEntity['validatePassiveContact']()).toThrow('O campo "Contato Passivo" deve ser um valor booleano.');
  });

  it('deve lançar um erro se contactType for inválido', () => {
    ticketData.contactType = 'InvalidType' as any;
    const ticketEntity = new TicketEntity(ticketData);

    expect(() => ticketEntity['validateContactType']()).toThrow(
      'O campo "Tipo de Contato" deve ser um dos seguintes: telefone, email, chat.'
    );
  });

  it('deve lançar um erro se type for inválido', () => {
    ticketData.type = 'InvalidType' as any;
    const ticketEntity = new TicketEntity(ticketData);

    expect(() => ticketEntity['validateType']()).toThrow(
      'O campo "Tipo" deve ser um dos seguintes: Operacional, Suporte, Relacionamento, Vendas.'
    );
  });

  it('deve lançar um erro se reason estiver vazio', () => {
    ticketData.reason = '';
    const ticketEntity = new TicketEntity(ticketData);

    expect(() => ticketEntity['validateReason']()).toThrow('O campo "Motivo" não pode estar vazio.');
  });

  it('deve lançar um erro se detail estiver vazio', () => {
    ticketData.detail = '';
    const ticketEntity = new TicketEntity(ticketData);

    expect(() => ticketEntity['validateDetail']()).toThrow('O campo "Detalhe" não pode estar vazio.');
  });

  it('deve validar a existência do colaborador', async () => {
    const ticketEntity = new TicketEntity(ticketData);

    await expect(ticketEntity['validateCollaboratorId']()).resolves.not.toThrow();
  });

  it('deve lançar um erro se o colaborador não for encontrado', async () => {
    (CollaboratorRepositorie.prototype.findById as jest.Mock).mockResolvedValue(null);

    const ticketEntity = new TicketEntity(ticketData);

    await expect(ticketEntity['validateCollaboratorId']()).rejects.toThrow('Colaborador não encontrado.');
  });

  it('deve lançar um erro se collaboratorId estiver ausente', async () => {
    ticketData.collaborator_id = null as any;
    const ticketEntity = new TicketEntity(ticketData);

    await expect(ticketEntity['validateCollaboratorId']()).rejects.toThrow('Colaborador id não encontrado.');
  });
});
