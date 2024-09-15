'use client'

import { IFormTicket } from "@/types/ticket";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { Contact } from "./Contact";
import Ticket from "./Ticket";
import Reason from "./Reason";
import useToast from "@/components/modal/UseModal";
import { createTicket } from "@/service/api";
import {  validateContact, validateReason, validateTicket } from "../../service/validateTicket";

interface IProps{
  fetchList(): Promise<void>
}

export function FormTicket({fetchList}:IProps){
  type steps = 'contact' | 'ticket' | 'reason'
    const [stepPage,setstepPage] = useState<steps>('contact')
    const {Toast,showToast} = useToast()

    const methods = useForm<IFormTicket>({
      defaultValues:{
        contact_type:'',
        detail:'',
        passive_contact:true,
        reason:'',
        type:'',
        vehicle_ids:[]
      }
    })

    function validates(typeValidate:steps){
      try{
        if(typeValidate === 'contact'){
          validateContact({
            contact_type:methods.getValues('contact_type'),
            passive_contact:methods.getValues('passive_contact')
          })
          setstepPage('ticket')
  
        }
        else if(typeValidate === 'ticket'){
          validateTicket({
            type:methods.getValues('type'),
            vehicle_ids:methods.getValues('vehicle_ids')
          })
          setstepPage('reason')
        }
        else if(typeValidate === 'reason'){
          validateReason({
            detail:methods.getValues('detail'),
            reason:methods.getValues('reason')
          })
        }
      }catch(error){
        showToast(error)
      }
    }


    async function onClick(){
      if(stepPage === 'contact'){
        validates(stepPage)
      }
      else if(stepPage === 'ticket'){
        validates(stepPage)
      }
      else if(stepPage === 'reason'){
        try{
          validates(stepPage)
          await createTicket(methods.getValues())
          methods.reset()
          setstepPage('contact')
          showToast('Ticket criado com sucesso!')
        }catch(error){
          showToast(error)
        }
        await fetchList()
      }
     
    }

    function onClickBack(){
      if(stepPage === 'ticket'){
        setstepPage('contact')
      }
      else if(stepPage === 'reason'){
        setstepPage('ticket')

      }
    }
    return (
        <FormProvider {...methods}>
        <div className="mx-6">
          
      <h1 className="text-[0.7rem] text-gray-500 font-semibold mb-2 my-2 ">Formulário de cadastro</h1>
      <h2 className="text-xl font-semibold mb-4">Novo atendimento ao cliente</h2>
      
      <div className="flex mb-4 space-x-4">
        <button onClick={()=>setstepPage('contact')} className={`flex-1 border-b-2 hover:scale-110 
          ${stepPage === 'contact' && `border-blue-500 ` }  text-blue-500 pb-2`}>
          CONTATO
        </button>
        <button onClick={()=>{
        validates('contact')
      }} className={`flex-1 border-b-2 hover:scale-110 
          ${stepPage === 'ticket' && `border-blue-500 ` }  text-blue-500 pb-2`}>
          TICKET
        </button>
        <button onClick={()=>{
        validates('contact')
        validates('ticket') 
      }} className={`flex-1 border-b-2 hover:scale-110 
          ${stepPage === 'reason' && `border-blue-500 ` }  text-blue-500 pb-2`}>
          MOTIVO
        </button>
      </div>
      {stepPage === 'contact' && <Contact/>}
      {stepPage === 'ticket' && <Ticket/>}
      {stepPage === 'reason' && <Reason/>}

      <div className='flex justify-between w-full mt-4'>
      {stepPage !== 'contact' && 
        <button 
          onClick={onClickBack} 
          className="w-[30%] bg-white text-blue-600 p-2 rounded-lg flex items-center justify-center border border-blue-600"
        >
          <span className="mr-2"><FaArrowLeft/></span> Voltar 
        </button>
      }

      <button 
        onClick={onClick} 
        className="w-[30%] bg-primary text-white p-2 rounded-lg flex items-center justify-center ml-auto"
      >
        {stepPage === 'reason' ? 
          <>Cadastrar <span className="ml-2"><FaCheck/></span></> 
          : 
          <>Avançar <span className="ml-2"><FaArrowRight/></span></>
        }
      </button>
    </div>
    </div>
    <Toast/>
     </FormProvider>

    )
}