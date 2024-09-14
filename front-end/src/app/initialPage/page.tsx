 "use client"
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { Filter } from "./components/Filter";
import useToast from "@/error/UseModalError";
import api from "@/api/axios";
import { Ticket } from "@/types/ticket";
import SideModal from "./components/SideModal";


export default function InitialPage() {
  const [search, setSearch] = useState("");
  const [listTicket, setListTicket] = useState<Ticket[]>([])
  const {Toast,showToast} = useToast()
    
  async function fetchList(){
    try{
        const {data} = await api.get<Ticket[]>('/ticket/list')
        setListTicket(data)

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
      <main className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <SideModal/>
            <Filter search={search} setSearch={setSearch}/>
            <Table listTicket={listTicket} />
        </div>
      </main>
      <Toast/>
    </div>
  );
}
