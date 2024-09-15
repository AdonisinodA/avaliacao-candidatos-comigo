'use client'

import { Dispatch, SetStateAction } from "react"
import { GoPlus } from "react-icons/go";
interface IProps{
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    openModal: () => void
}

export function Filter({search,setSearch, openModal}:IProps){

    return <>
      <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:brightness-125 hover:scale-105">
                Abrir Ticket <span><GoPlus size={20}/></span>
              </button>
              <input
                type="text"
                placeholder="Pesquisar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-4 py-2"
              />
            </div>
            <div className="flex space-x-2">
              {/* Filtros */}
          
            </div>
          </div>
    </>
}