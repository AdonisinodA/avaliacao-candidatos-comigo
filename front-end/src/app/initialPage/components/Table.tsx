'use client'

import { Ticket } from "@/types/ticket"





interface IProps{
    listTicket: Ticket[]
}

export function Table({listTicket}:IProps){

    return <>
      <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Tipo</th>
                <th className="border p-2">Motivo</th>
                <th className="border p-2">Descrição</th>
                <th className="border p-2">Cliente</th>
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
                    <td className="border p-2">{ticket.id}</td>
                    <td className="border p-2">{ticket.type}</td>
                    <td className="border p-2">{ticket.reason}</td>
                    <td className="border p-2">{ticket.detail}</td>
                    <td className="border p-2">{ticket.tickets_vehicles.join(', ')}</td>
                    <td className="border p-2">{ticket.createdAt}</td>
                    {/* <td className="border p-2">{ticket.term}</td>
                    <td className="border p-2">{ticket.status}</td> */}
                    <td className="border p-2 flex space-x-2 justify-center">
                      {/* Ações de editar e excluir */}
                      <button className="text-blue-500 hover:text-blue-700">
                        ✏️
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
    </>
}