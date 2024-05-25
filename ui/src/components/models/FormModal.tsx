import React from 'react'

import { NewUserForm } from '../forms/NewUserForm';
export type category = 'Add User' 
type FormModalProps = {
    modalType: category
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    fetchChat: ()=> void;
}

export const FormModal = ({modalType,toggleModal,fetchChat}:FormModalProps) => {
    
    

  return (
    
    
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"></div>
            <div id="defaultModal" className="fixed top-0 left-0 right-0 z-50 w-full p-4 flex items-center justify-center  overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {modalType}
                            </h3>
                            <button onClick={()=>{toggleModal(false);fetchChat();}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {
                            modalType === "Add User" && <NewUserForm/>
                        }
                    
                    </div>
                </div>
            </div>
        </> 
       
  )
}
