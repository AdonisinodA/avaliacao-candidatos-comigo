import { ticketTypes } from "../enums/ticket";
import AppError from "../error/app-error";
import { CollaboratorRepositorie } from "../repositories/collaborator-repositorie";

export type ticketType = 'Operacional' | 'Suporte' | 'Relacionamento' | 'Vendas';

export interface ITicket {
  passiveContact: boolean;
  contactType: ticketType;
  type: string;
  reason: string;
  detail: string;
  collaborator_id:number
  vehicle_id:number
}

class TicketEntity {
  constructor(private ticket: ITicket) {
    this.ticket = ticket;
    this.validate();
  }

  public get passiveContact(): boolean {
    return this.ticket.passiveContact;
  }

  public get contactType(): ticketType {
    return this.ticket.contactType;
  }

  public get type(): string {
    return this.ticket.type;
  }

  public get reason(): string {
    return this.ticket.reason;
  }
  public get vehicleId(): number {
    return this.ticket.vehicle_id;
  }
  public get collaboratorId(): number {
    return this.ticket.collaborator_id;
  }

  public get detail(): string {
    return this.ticket.detail;
  }

  // Função para validar passive_contact
  private validatePassiveContact() {
    if (typeof this.passiveContact !== 'boolean') {
      AppError('O campo "Contato Passivo" deve ser um valor booleano.');
    }
  }

  // Função para validar contact_type
  private validateContactType() {
    const validContactTypes = ['Operacional', 'Suporte', 'Relacionamento', 'Vendas'];
    if (!validContactTypes.includes(this.contactType)) {
      AppError(`O campo "Tipo de Contato" deve ser um dos seguintes: ${validContactTypes.join(', ')}.`);
    }
  }

  // Função para validar type
  private validateType() {
    const validTypes = ['inquiry', 'complaint', 'suggestion'];
    if (!validTypes.includes(this.type)) {
      AppError(`O campo "Tipo" deve ser um dos seguintes: ${validTypes.join(', ')}.`);
    }
  }

  // Função para validar reason
  private validateReason() {
    if (this.reason.trim().length === 0) {
      AppError('O campo "Motivo" não pode estar vazio.');
    }
  }

  // Função para validar detail
  private validateDetail() {
    if (this.detail.trim().length === 0) {
      AppError('O campo "Detalhe" não pode estar vazio.');
    }
  }

  //Função pra verificar se o colaborador existe
  private async validateCollaboratorId(){
    const collaboratorRepo = new CollaboratorRepositorie()
    const collaborator = await collaboratorRepo.findById(this.collaboratorId)
    if(!collaborator){
      AppError('Colaborador não encontrado.',404)
    }
  }

  // Função geral para validar os dados
  private async validate() {
    this.validatePassiveContact();
    this.validateContactType();
    this.validateType();
    this.validateReason();
    this.validateDetail();
    await this.validateCollaboratorId()
  }
}

export default TicketEntity;
