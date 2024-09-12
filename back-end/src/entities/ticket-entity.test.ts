import AppError from '../error/app-error';
import Ticket, { ITicket } from './ticket-entity';

jest.mock('../error/app-error', () => {
  return jest.fn((message: string) => {
    throw new Error(message);
  });
});

describe('Ticket Class Validation', () => {
  const validTicket: ITicket = {
    passiveContact: true,
    contactType: 'Suporte',
    type: 'inquiry',
    reason: 'Informação adicional necessária',
    detail: 'Descrição detalhada do problema',
  };

  it('Deve criar uma instância válida de Ticket', () => {
    expect(() => new Ticket(validTicket)).not.toThrow();
  });

  it('Deve lançar erro se passiveContact não for booleano', () => {
    const invalidTicket = { ...validTicket, passiveContact: 'true' as any };
    expect(() => new Ticket(invalidTicket)).toThrow('O campo "Contato Passivo" deve ser um valor booleano.');
  });

  it('Deve lançar erro se contactType for inválido', () => {
    const invalidTicket = { ...validTicket, contactType: 'Invalido' as any };
    expect(() => new Ticket(invalidTicket)).toThrow('O campo "Tipo de Contato" deve ser um dos seguintes: Operacional, Suporte, Relacionamento, Vendas.');
  });

  it('Deve lançar erro se type for inválido', () => {
    const invalidTicket = { ...validTicket, type: 'invalid-type' };
    expect(() => new Ticket(invalidTicket)).toThrow('O campo "Tipo" deve ser um dos seguintes: inquiry, complaint, suggestion.');
  });

  it('Deve lançar erro se reason estiver vazio', () => {
    const invalidTicket = { ...validTicket, reason: '' };
    expect(() => new Ticket(invalidTicket)).toThrow('O campo "Motivo" não pode estar vazio.');
  });

  it('Deve lançar erro se detail estiver vazio', () => {
    const invalidTicket = { ...validTicket, detail: '' };
    expect(() => new Ticket(invalidTicket)).toThrow('O campo "Detalhe" não pode estar vazio.');
  });
});
