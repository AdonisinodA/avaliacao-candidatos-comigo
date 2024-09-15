 "use client"
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { Filter } from "./components/Filter";
import { IFormTicket, Ticket } from "@/types/ticket";
import SideModal from "../../components/SideModal";
import { FormTicket } from "./components/form/FormTicket";
import {  getTicketById, listTickets } from "@/service/api";
import useToast from "@/components/modal/UseModal";
import { EditTicket } from "./components/form/EditTicket";


export default function InitialPage() {
  const [search, setSearch] = useState("");
  const [listTicket, setListTicket] = useState<Ticket[]>([])
  const {Toast,showToast} = useToast()
  const [isOpen, setIsOpen] = useState<'edit' | 'form' | ''>('');
  const [ticketId, setTicketId] = useState<number>()
  const [ticket, setTicket] = useState<IFormTicket>({
    contact_type:'',
    detail:'',
    passive_contact:false,
    reason:'',
    type:'',
    vehicle_ids:[]
  })

  async function fetchList(){
    try{
       const list = await listTickets()
        setListTicket(list)
    }catch(error){
        showToast(error, true)
    }
  }
  useEffect(()=>{
    fetchList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function getTicket(ticket_id:number){
    try{
      setTicketId(ticket_id)
      const ticket = await getTicketById(ticket_id)
      setTicket(ticket)
      setIsOpen('edit')
    }catch(error){
      showToast(error, true)

    }
  }
    

  return (
    <div className="min-h-screen bg-gray-100">
        <Header/>
      <main className="px-4 ">
        <div className="bg-white shadow-md rounded-lg p-6 ">
          <SideModal closeModal={()=>setIsOpen('')} isOpen={isOpen === 'form'}><FormTicket fetchList={fetchList}/> </SideModal>
          <SideModal closeModal={()=>setIsOpen('')} isOpen={isOpen === 'edit'}><EditTicket ticketId={ticketId}  ticket={ticket!} fetchList={fetchList}/> </SideModal>
            <Filter search={search} setSearch={setSearch} openModal={()=> setIsOpen('form')}/>
            <Table listTicket={listTicket} fetchList={fetchList} editTicket={getTicket} />
        </div>
      </main>
      <Toast/>
    </div>
  );
}
