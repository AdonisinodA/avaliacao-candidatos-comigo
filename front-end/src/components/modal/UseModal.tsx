// hooks/useErrorModal.ts
import { useCallback, useState } from 'react';

import { AxiosError } from 'axios';
import { Modal } from './Modal';

const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error,setError] = useState<boolean>(false) 

  const showToast = useCallback((message: unknown, error= false) => {
    setError(error)
    let msg = 'Erro interno'
    if(typeof message === 'string'){
      msg = message
    }
    if(message instanceof AxiosError){
      msg = message.response?.data.message ?? 'Erro interno'
    }
    else if( message instanceof Error){
      msg = message.message
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
     <Modal message={message} error={error}/>
  );

  };

  
  return {
    isVisible,
    Toast,
    showToast
  };
};

export default useToast;


