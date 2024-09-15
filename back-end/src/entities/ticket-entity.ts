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
  vehicle_ids:number[]
}

class TicketEntity {
  constructor(private ticket: ITicket) {
    this.ticket = ticket;
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
  public get vehicleIds(): number[] {
    return this.ticket.vehicle_ids;
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
    const validContactTypes = ['telefone', 'email', 'chat'];
    if (!validContactTypes.includes(this.contactType)) {
      AppError(`O campo "Tipo de Contato" deve ser um dos seguintes: ${validContactTypes.join(', ')}.`);
    }
  }

  // Função para validar type
  private validateType() {
    const validTypes = ['Operacional', 'Suporte', 'Relacionamento', 'Vendas'];
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
   if(!this.collaboratorId){
     AppError('Colaborador id não encontrado.')
   }
    const collaborator = await collaboratorRepo.findById(this.collaboratorId)
    if(!collaborator){
      AppError('Colaborador não encontrado.',404)
    }
  }

  // Função geral para validar os dados
  public async validate() {
    this.validatePassiveContact();
    this.validateContactType();
    this.validateType();
    this.validateReason();
    this.validateDetail();
    await this.validateCollaboratorId()
  }
}

export default TicketEntity;
