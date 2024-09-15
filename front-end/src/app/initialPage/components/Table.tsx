'use client'

import ConfirmModal from "@/components/modal/ConfirmModal";
import useToast from "@/components/modal/UseModal";
import AppError from "@/error/appError";
import { deleteTicket } from "@/service/api";
import localStorageService from "@/service/localStorage";
import { Ticket } from "@/types/ticket"
import { DateUtils } from "@/util/date"
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";



interface IProps{
    listTicket: Ticket[]
    fetchList(): Promise<void>
    editTicket: (ticket_id:number) => void
}

export function Table({listTicket, fetchList, editTicket}:IProps){
  const user = localStorageService.getUser()
  const [modal, setModal] = useState<boolean>(false)
  const [ticketId, setTicketId] = useState<number>()


  const {Toast,showToast} = useToast()
  async function onDeleteTicket(){
    try{
      if(!ticketId){
        AppError('ID do ticket não foi enviado')
      }
      await deleteTicket(ticketId as number)
      await fetchList()
      setModal(false)
      showToast('Ticket deletado com sucesso')
    }catch(error){
      showToast(error, true)
    }

  }

    return <>
      <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Tipo</th>
                <th className="border p-2">Motivo</th>
                <th className="border p-2">Descrição</th>
                <th className="border p-2">Veículo</th>
                <th className="border p-2">Data de Abertura</th>
                <th className="border p-2">Prazo</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {listTicket.length >0 && listTicket.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="border p-2" align="center">{ticket.id}</td>
                    <td className="border p-2" align="center">{ticket.type}</td>
                    <td className="border p-2" align="center">{ticket.reason}</td>
                    <td className="border p-2" align="center">{ticket.detail}</td>
                    <td className="border p-2" align="center">{ticket.tickets_vehicles.map((objec)=>objec.vehicles.plate).join(', ')}</td>
                    <td className="border p-2" align="center">{DateUtils.formatDate(new Date(ticket.createdAt))}</td>
                    <td className="border p-2" align="center">{DateUtils.formatDate(new Date(ticket.term))}</td>
                    <td className="border p-2" align="center">{ticket.status}</td>
                    <td className="border p-2 space-x-2 justify-center" align="center">
                      <button onClick={()=>editTicket(ticket.id)} className="text-black/50 hover:text-black">
                      <HiOutlinePencil/>
                      </button>
                      {user?.role === 'admin' &&
                          <button onClick={()=>{
                            setTicketId(ticket.id)
                            setModal(true)
                          }} className="text-red-500 hover:text-red-700">
                          <FaRegTrashAlt/>
                        </button>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Toast/>
          <ConfirmModal
          isOpen={modal}
          message={`Deseja realmente deletar o ticket de ID ${ticketId}?`}
          onClose={()=>{ setModal(false)}}
          onConfirm={()=>{onDeleteTicket()}}
          />

    </>
}