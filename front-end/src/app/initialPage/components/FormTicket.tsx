'use client'

import { IFormTicket } from "@/types/ticket";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function FormTicket(){
    const [contatoPassivo, setContatoPassivo] = useState<boolean>(false);
    const methods = useForm<IFormTicket>({
      defaultValues:{
        collaborator_id:'',
        contact_type:'',
        detail:'',
        passive_contact:true,
        reason:'',
        type:'',
        vehicle_id:''
      }
    })
    return (
        <FormProvider {...methods}>
        <div className="mx-6">
          
      <h1 className="text-[0.7rem] text-gray-500 font-semibold mb-2 my-2 ">Formulário de cadastro</h1>
      <h2 className="text-xl font-semibold mb-4">Novo atendimento ao cliente</h2>
      
      <div className="flex mb-4 space-x-4">
        <button className="flex-1 border-b-2 border-blue-500 text-blue-500 pb-2">
          CONTATO
        </button>
        <button className="flex-1 text-gray-500 border-b pb-2">
          TICKET
        </button>
        <button className="flex-1 text-gray-500 border-b pb-2">
          MOTIVO
        </button>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Houve contato passivo?</p>
        <div className="flex space-x-4 mt-2">
          <button
            className={`flex-1 border p-3 rounded-lg ${
              contatoPassivo === true
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setContatoPassivo(true)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                checked={contatoPassivo === true}
                className="mr-2"
                readOnly
              />
              <span className="text-sm">Sim</span>
            </div>
            <p className="text-gray-500 text-xs">O cliente entrou em contato</p>
          </button>

          <button
            className={`flex-1 border p-3 rounded-lg ${
              contatoPassivo === false
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setContatoPassivo(false)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                checked={contatoPassivo === false}
                className="mr-2"
                readOnly
              />
              <span className="text-sm">Não</span>
            </div>
            <p className="text-gray-500 text-xs">Contato ainda será feito</p>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="tipoContato" className="block text-sm font-semibold mb-2">
          Tipo de contato
        </label>
        <select
          id="tipoContato"
          className="w-full border border-gray-300 p-2 rounded-lg"
        >
          <option value="">Selecione...</option>
          <option value="telefone">Telefone</option>
          <option value="email">E-mail</option>
          <option value="chat">Chat</option>
        </select>
      </div>

      <div className='flex justify-end w-full'>
      <button className="w-full bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center">
        Avançar <span className="ml-2">→</span>
      </button>
      </div>
    </div>
      </FormProvider>

    )
}