"use client";

import { useAuth } from "@/context/Auth";
import localStorageService from "@/service/localStorage";
import { useState, useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {logout} = useAuth()
  const user = localStorageService.getUser()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef])

  function onClickLeave(){
    logout()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full items-center  shadow-sm px-4 py-2 bg-primary text-sm font-medium "
      >
        <span className="mr-2">{user ? user.name : 'Não reconhecido'}</span> <FaRegUser  />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a
            onClick={onClickLeave}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sair
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
