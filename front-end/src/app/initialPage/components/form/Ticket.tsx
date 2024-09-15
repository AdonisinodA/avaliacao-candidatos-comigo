import useToast from "@/components/modal/UseModal";
import { SelectMulti } from "@/components/SelectMulti";
import { listVehicle } from "@/service/api";
import { IFormTicket, Vehicle } from "@/types/ticket";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

function Ticket(){
const {watch, setValue} = useFormContext<IFormTicket>()
const [vehicles, setVehicles] = useState<Vehicle[]>([])
const {showToast,Toast} = useToast()

async function fetchList(){
  try{
   const result =  await listVehicle()
   setVehicles(result)
  }catch(error){
    showToast(error, true)
  }
}

useEffect(()=>{
  fetchList()
},[])

  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold">
          Qual o intuito desse ticket?
        </label>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-2">
          {['Operacional', 'Relacionamento', 'Suporte', 'Vendas'].map((option) => (
            <label key={option} className="inline-flex items-center">
              <input
                type="radio"
                name="ticket-intent"
                value={option}
                checked={watch('type') === option}
                defaultChecked={watch('type') === option}
                onChange={() => setValue('type',option)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
              <span className="ml-2 text-xs text-gray-500">Sub título</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-sm text-gray-700"> Veículo(s)</span>
        <SelectMulti 
          value={vehicles.filter((filterVe)=> watch('vehicle_ids').includes(filterVe.id)).map((vehicle)=>{
            return {
              label:vehicle.plate,
              value:String(vehicle.id)
            }
          })}
          onchange={(dado) => {
            setValue('vehicle_ids',dado.map(option=> Number(option.value)) )
          }
          }
          options={vehicles.map((vehicle)=>{
            return {
              label:vehicle.plate,
              value:String(vehicle.id)
            }
          })}
          
          placeholder="Selecione"
        />
      </div>
      <Toast/>
    </div>
  );
};

export default Ticket;
