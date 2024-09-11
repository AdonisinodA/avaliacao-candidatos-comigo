import { ticketTypes } from "../enums/ticket"
import AppError from "../error/app-error"

type ticketType = 'Operacional' | 'Suporte' | 'Relacionamento' | 'Vendas' 

interface ITicket{
    passiveContact: boolean
    contactType: ticketType
    type: string
    reason: string
    detail: string
}



class Ticket{
    constructor(private ticket:ITicket){
        this.ticket = ticket
    }

   public get passiveContact():boolean{
    return this.ticket.passiveContact
   }

   public get contactType():ticketType{
    return this.ticket.contactType
   }

   public get type():string{
    return this.ticket.type
   }

   public get reason():string{
    return this.ticket.reason
   }

   public get detail():string{
    return this.ticket.detail
   }

   ticketTypeIsvalid(ticketType:ticketType){
        if(!ticketTypes.includes(ticketType)){
            AppError('Ticket inválido')
        }

   }

}

export default Ticket