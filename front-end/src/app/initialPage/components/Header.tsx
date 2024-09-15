'use client'

import Image from "next/image"
import DropDown from "./Dropdown"
import logo from '../../../../public/comigoLogo.png'

export function Header(){
    return(
        <header className="bg-primary p-4 text-white w-full">
        <div className="flex justify-between items-center">
          <Image
          width={110}
          src={logo}
          alt="logo"
          />
          <h1 className="text-lg font-bold">Atendimento ao Cliente</h1>
          <div className="flex items-center ">
            <DropDown/>

          </div>
        </div>
      </header>
    )
}