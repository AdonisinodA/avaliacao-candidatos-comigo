'use client'
import React from 'react';
import { IoMdClose } from "react-icons/io";

interface IProps{
  closeModal: () => void
  isOpen:boolean
  children:React.ReactNode
}

function SideModal({closeModal,isOpen, children}:IProps)  {


  return (
    <div className="relative">
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
        className={`fixed top-0 right-0 h-full bg-white w-2/5 shadow-xl transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {children}
      </div>
    </div>
    
  );
};

export default SideModal;
