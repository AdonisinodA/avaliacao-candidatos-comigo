import {  useRef } from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  message: string | JSX.Element
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)


  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 text-black"
      role="dialog"
    >
      <div
        ref={modalRef}
        className={`  max-h-[85vh] w-4/5 overflow-y-auto overflow-x-hidden rounded p-2 text-left md:w-auto md:p-8 `}
      >
          <section className='bg-white p-10 rounded-lg'>
            <section
              className={`mb-4  flex-col items-center text-base md:text-lg`}
            >
              <div
                id="modal-description"
                className="text-center text-sm md:text-base"
              >
                {message}
              </div>
    
            </section>
            <section className="flex justify-center space-x-5">
              <button onClick={onClose}  className="bg-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:brightness-125 hover:scale-105">
                Cancelar
              </button>
              <button onClick={onConfirm}  className="bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:brightness-125 hover:scale-105">
                Confirmar
              </button>
            </section>
          </section>
      </div>
    </div>
  )
}
