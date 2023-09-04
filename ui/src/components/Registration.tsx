import { useForm } from 'react-hook-form';
import Input from './atoms/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom';
import api from './api/axiosConfig'
import { useState } from 'react';
import { AlertBox } from './alerts/AlertBox';
type RegistrationForm = {

  username: string;
  email: string;
  password: string;
  name: string;
  location: string;
};

export const Registration = () => {
  const [isError,setIsError] = useState(false);
  const [message,setMessage] = useState("");
  const [isSuccess,setIsSuccess] = useState(false);
  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    name: yup.string().required('Name is required'),
    location: yup.string().required('Location is required'),
  });

  const { register, formState, handleSubmit,reset} = useForm<RegistrationForm>({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = async (data: RegistrationForm) => {
     

    await api.post("/register",(data))
        .then((response)=>{
          setIsSuccess(true);
          setIsError(false)
          setMessage("Registered Successfully.. Go to Login Page to signin...")
             
        })
        .catch(error=>{
          console.log(error.response);
          setIsError(true);
          setIsSuccess(false);
          setMessage(error.response.data.errorMessage)
             
        })
    reset();
  };

  return (
    <section className="bg-white-500 w-[500px] mt-10 mb-11">
      <div className="flex flex-col items-center justify-center px-6 py-1 mx-auto md:h-screen lg:py-1">
        
        <div className="w-full bg-gray rounded-lg shadow md:mt-0 xl:p-0" >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
           
        <div className="flex justify-center mb-6">
              <a href="#" className="text-2xl font-semibold text-gray-900">
                <img src={logo} alt="PMS" height="170" width="170" />
              </a>
            </div>      
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create a new account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>

              <AlertBox success={isSuccess} error={isError} message={message}/>
        
              
              <Input
                type="text"
                label="Name"
                placeholder="Enter your fullname"
                register={{ ...register('name') }}
                error={errors.name?.message}
              />
              <Input
                type="text"
                label="Username"
                placeholder="Enter username"
                register={{ ...register('username') }}
                error={errors.username?.message}
              />
              
              <Input
                type="email"
                label="Email"
                placeholder="Enter email"
                register={{ ...register('email') }}
                error={errors.email?.message}
              />
              <Input
                type="password"
                label="Password"
                placeholder="Enter password"
                register={{ ...register('password') }}
                error={errors.password?.message}
              />
              
              <Input
                type="text"
                label="Location"
                placeholder="Enter location"
                register={{ ...register('location') }}
                error={errors.location?.message}
              />
              
        
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <NavLink to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</NavLink>
              </p>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-ternary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

