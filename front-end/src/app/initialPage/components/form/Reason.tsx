
import { IFormTicket } from '@/types/ticket';
import { DateUtils } from '@/util/date';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function Reason(){
  const businessDays = 3;
  const estimatedDate = DateUtils.formatDate(DateUtils.addBusinessDays(new Date(),businessDays))
  const {watch,setValue} = useFormContext<IFormTicket>()
 


  return (
    <div className='overflow-y-auto'>
      <h1 className="font-semibold">Qual o motivo desse ticket?</h1>

      <div className="space-y-2 mb-6">
        {['Motivo 1', 'Motivo 2', 'Motivo 3'].map((reason, index) => (
          <label key={index} className="flex items-center space-x-3">
            <input
              type="radio"
              value={reason}
              checked={watch('reason') === reason}
              onChange={() => setValue('reason',reason)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span>
              <span className="font-semibold">{reason}</span>
              <span className="block text-gray-500">Sub título</span>
            </span>
          </label>
        ))}
      </div>

     
        
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="text-blue-600 font-semibold">
          Prazo estimado: {estimatedDate}
        </p>
        <p className="text-gray-600 text-sm">
          Informe o cliente que a resolução deste motivo está prevista em <span className="font-semibold">{businessDays} dias úteis</span>.
        </p>
      </div>

      <textarea
      onChange={(event)=>{
        setValue('detail', event.target.value)
        }}
        className="w-full mt-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Informe mais detalhes sobre o ticket"
        rows={4}
      />
    </div>
  );
};

export default Reason;
