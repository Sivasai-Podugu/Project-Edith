import React, { useState } from 'react'
import Input from '../atoms/Input'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import api from '../api/axiosConfig'
import { AlertBox } from '../alerts/AlertBox'
type NewUserFormElementTypes = {
    email:string
}
type NewUserFormType = {
    formType?: "EDIT"
  }
export const NewUserForm = ({formType}:NewUserFormType) => {
    const [isError,setIsError] = useState(false);
    const [message,setMessage] = useState("");
    const [isSuccess,setIsSuccess] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Email is required')
    })
    

    const {register, formState, handleSubmit,reset} = useForm<NewUserFormElementTypes>(
        {

            resolver: yupResolver(schema)
        }
    )
    const {errors} = formState
    const onSubmit = async (data:NewUserFormElementTypes) => {
        const headers = {
            Authorization:`Bearer ${localStorage.getItem("Jwt")}`
        }
        await api.post("/addcontact",data,{headers})
            .then(response => {
                 
                setIsSuccess(true);
                setIsError(false)
                setMessage("Added Successfully..")
                
            })
            .catch(error => {
                 
                setIsError(true);
                setIsSuccess(false);
                setMessage(error.response.data.errorMessage)
            })
        
         
        reset();
    }
  return (
    <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
        <AlertBox success={isSuccess} error={isError} message={message}/>
        <Input type='text' label='User Mail' register={{...register("email")}} error={errors.email?.message} />
               <div className="flex items-center p-2 pt-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <input data-modal-hide="defaultModal" type="submit" value = "Add" className="text-white bg-primary hover:bg-ternary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center " />
        </div>
    
    </form>
  )
}
