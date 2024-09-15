 "use client"
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { Filter } from "./components/Filter";
import { Ticket } from "@/types/ticket";
import SideModal from "../../components/SideModal";
import { FormTicket } from "./components/form/FormTicket";
import {  listTickets } from "@/service/api";
import useToast from "@/components/modal/UseModal";


export default function InitialPage() {
  const [search, setSearch] = useState("");
  const [listTicket, setListTicket] = useState<Ticket[]>([])
  const {Toast,showToast} = useToast()
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  async function fetchList(){
    try{
       const list = await listTickets()
        setListTicket(list)
    }catch(error){
        showToast(error)
    }
  }
  useEffect(()=>{
    fetchList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    

  return (
    <div className="min-h-screen bg-gray-100">
        <Header/>
      <main className="px-4 ">
        <div className="bg-white shadow-md rounded-lg p-6 ">
          <SideModal closeModal={closeModal} isOpen={isOpen}><FormTicket fetchList={fetchList}/> </SideModal>
            <Filter search={search} setSearch={setSearch} openModal={openModal}/>
            <Table listTicket={listTicket} fetchList={fetchList} />
        </div>
      </main>
      <Toast/>
    </div>
  );
}
