import { IFormTicket } from "@/types/ticket";
import { useFormContext } from "react-hook-form";

export function Contact(){
   const {watch, setValue} = useFormContext<IFormTicket>()
    return <>
    <div className="mb-4">
        <p className="font-semibold">Houve contato passivo?</p>
        <div className="flex space-x-4 mt-2">
          <button
            className={`flex-1 border p-3 rounded-lg ${
                watch('passive_contact') === true
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setValue('passive_contact', true)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                checked={ watch('passive_contact') === true}
                className="mr-2"
                readOnly
              />
              <span className="text-sm">Sim</span>
            </div>
            <p className="text-gray-500 text-xs">O cliente entrou em contato</p>
          </button>

          <button
            className={`flex-1 border p-3 rounded-lg ${
                watch('passive_contact') === false
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setValue('passive_contact', false)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                checked={ watch('passive_contact') === false}
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
          name="contact_type"
          onChange={(event)=>{
            setValue('contact_type', event.target.value)
          }}
          className="w-full border border-gray-300 p-2 rounded-lg"
        >
          <option value="">Selecione...</option>
          <option value="telefone">Telefone</option>
          <option value="email">E-mail</option>
          <option value="chat">Chat</option>
        </select>
      </div>
    </>
}