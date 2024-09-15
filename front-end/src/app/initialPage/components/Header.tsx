'use client'

import Image from "next/image"
import DropDown from "./Dropdown"
import logo from '../../../../public/comigoLogo.png'

export function Header(){
    return(
        <header className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Image
          width={110}
          src={logo}
          alt="logo"
          />
          <h1 className="text-lg font-bold">Atendimento ao Cliente</h1>
          <div className="flex items-center space-x-4">
          <div className="relative inline-block text-left">
            <DropDown/>
            </div>

          </div>
        </div>
      </header>
    )
}