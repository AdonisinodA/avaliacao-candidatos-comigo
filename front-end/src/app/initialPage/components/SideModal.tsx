'use client'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
function SideModal()  {
  const [isOpen, setIsOpen] = useState(false);
  const [contatoPassivo, setContatoPassivo] = useState<boolean>(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="relative">
      <button 
        onClick={openModal} 
        className="bg-blue-500 text-white p-2 rounded"
      >
        Open Modal
      </button>

     

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeModal}
        >
             <div className="flex justify-between items-center absolute left-[58%]">
          <button
            onClick={closeModal}
            className="text-white hover:text-blue-600 text-lg"
          >
            <IoMdClose size={30}/>
          </button>
        </div>
            </div>
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-white w-2/5 shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
       
        <div>

        {/* formulario de cadastro */}
        <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Formulário de cadastro</h1>
      <h2 className="text-lg font-semibold mb-4">Novo atendimento ao cliente</h2>
      
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
        </div>
      </div>
    </div>
  );
};

export default SideModal;
