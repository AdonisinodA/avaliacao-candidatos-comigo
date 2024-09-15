import { FaCheck } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
interface IProps{
    message:string | JSX.Element
    error?:boolean
}


export function Modal({message, error=true}: IProps){

    return <>
      <div
      id={'idContainerModalFeedback'}
      className="fixed inset-x-0 bottom-0 z-50 flex size-full items-center justify-center bg-black/75 text-black focus:outline-none"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={`z-50 max-h-[85vh] w-4/5 overflow-y-auto  overflow-x-hidden rounded bg-white p-3 text-center shadow-lg md:w-auto md:p-5  border ${error ?' border-red-400' : ' border-green-400'}`}
      >
        <section className={` flex gap-2 w-[20vw] justify-between items-center font-semibold  text-blue-500`}>
        {error ? <RiErrorWarningFill fill="red" size={30}/> :  <FaCheck fill='green'/> }
    
             {message}
        </section>
     
      </div>
    </div>
    </>
}