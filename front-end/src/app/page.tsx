/* eslint-disable @next/next/no-img-element */
 "use client"
import React, { useState } from "react";
import loginLogo from "../../public/logoLogin.svg"
import Image from 'next/image'
import useErrorModal from "@/error/UseModalError";
import api from "@/api/axios";
import { useAuth } from "@/context/Auth";



function Login(){
  const {login} = useAuth()
  const { showToast, Toast } = useErrorModal();


  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [keepConnected, setKeepConnected] = useState<boolean>(false)

   

  async function onClickLogin(event:React.FormEvent){
    try{
      event.preventDefault()
      const {data} = await api.post('/user/login',{
        email,
        password
      })
    
      login(data,keepConnected)
      showToast('Autenticado com sucesso!');
    }catch(error){
      showToast(error);
    }
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    <Toast />
    <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6 md:p-0">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Entre na sua conta</h2>
        <p className="text-gray-500 mb-8">
          Bem-vindo! Por favor, insira suas credenciais para acessar os sistemas da Comigo.
        </p>
        <form className="space-y-4" onSubmit={onClickLogin}>
          <div>
            <label className="block text-gray-700">E-mail</label>
            <input
             onChange={(event)=>{
              setEmail(event.target.value)
            }}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Insira seu e-mail"
            />
          </div>
          <div>
            <label className="block text-gray-700">Senha</label>
            <input
            onChange={(event)=>{
              setPassword(event.target.value)
            }}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Insira sua senha"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
              checked={keepConnected}
              onChange={()=>{
                setKeepConnected(!keepConnected)
              }} type="checkbox" className="mr-2" />
              <label className="text-black">Mantenha-me conectado.</label>
            </div>
            <a href="#" className="text-blue-600">Esqueci minha senha</a>
          </div>
          <button  className="w-full bg-blue-700 text-white py-2 rounded-md">
            Entrar
          </button>
        </form>
      </div>
    </div>

    <div className="w-full md:w-1/2 bg-blue-700 flex items-center justify-center p-6 md:p-0">
      <Image
        src={loginLogo}
        width={500}
        height={500}
        alt="Logo comigo"
      />
    </div>
  </div>
  );
}

export default Login;
