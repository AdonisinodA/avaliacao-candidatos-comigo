import AppError from "@/error/appError";
import { IFormTicket } from "@/types/ticket";

export function validateContact({contact_type,passive_contact}: {
    contact_type:IFormTicket['contact_type'],
    passive_contact: IFormTicket['passive_contact']
}){
    if(passive_contact){
        if(!contact_type){
            AppError('Tipo de contato é obrigatório.')
        }
    }
}
export function validateTicket({type,vehicle_ids}: {
    type:IFormTicket['type'],
    vehicle_ids: IFormTicket['vehicle_ids']
}){
    if(vehicle_ids!.length < 1){
        AppError('Selecione ao menos um veículo.')
    }
    if(!type){
        AppError('Preencha o intuito deste ticket.')
    }

    
}

export function validateReason({reason,detail}: {
    reason:IFormTicket['reason'],
    detail: IFormTicket['detail']
}){
    if(!reason?.trim()){
        AppError('Escolha um motivo para abrir o ticket.')
    }
    else if(!detail?.trim()){
        AppError('Detalhe o ticket.')
    }
    
}