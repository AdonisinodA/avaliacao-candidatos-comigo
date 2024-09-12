// hooks/useErrorModal.ts
import { useCallback, useState } from 'react';
import Image from 'next/image';
import logo from '../../public/comigoLogo.png'
import { AxiosError } from 'axios';

const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = useCallback((message: unknown) => {
    let msg = 'Erro interno'
    if(typeof message === 'string'){
      msg = message
    }
    if(message instanceof AxiosError){
      msg = message.response?.data.message ?? 'Erro interno'
    }
    setMessage(msg);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 1500); 
  }, []);

  function Toast(){

    if (!isVisible) return null;

    return (
      <div id="toast-default" className="flex absolute items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
    <Image width={50} height={50} src={logo} alt='logo'/>
    </div>
    <div className="ms-3 text-sm font-normal">{message}</div>
  </div>
  );

  };

  
  return {
    isVisible,
    Toast,
    showToast
  };
};

export default useToast;
