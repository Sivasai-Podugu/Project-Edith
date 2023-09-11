import React from 'react'
import { useNavigate } from 'react-router'

type ChatHeaderProps = {
    name : string,

    email: string,
    location :string,
    ischat:boolean,
    username:string
}

function ChatHeader({name,email,location,ischat,username}:ChatHeaderProps) {
    const navigate = useNavigate();
  return (
    <div key={name}>
        <header className="pt-6 pb-4 px-5  border-gray-200">
            <div  className="flex justify-between items-center mb-3">
                
                <div  className="flex items-center">
                   
                    <div  className="flex-shrink-0 h-10 w-10 rounded-full bg-bggreen"><div className='pt-1'><span className="font-medium text-white ml-3  text-2xl dark:text-gray-300">{name && name.charAt(0)+" "}</span></div></div>

                    <div  className="ml-3 pr-1">
                        <a  className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                            <h2  className="text-xl leading-snug font-bold">{name}</h2>
                        </a>
                        <a  className="block text-sm font-medium hover:text-indigo-500" href="#0">@{username}</a>
                    </div>
                </div>
                {
                    ischat &&  <div  className="relative inline-flex flex-shrink-0 ml-9 mt-7">
                                    <button type="button" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 " onClick={()=>{navigate("/logout")}}>Logout</button>
                                </div>
                }
                
               
            </div>
            
            <div  className="flex flex-wrap justify-center sm:justify-start space-x-4">
                <div  className="flex items-center">
                    <svg  className="w-4 h-4 fill-current flex-shrink-0 text-gray-400" viewBox="0 0 16 16">
                        <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
                    </svg>
                    <span  className="text-sm whitespace-nowrap ml-2">{location}</span>
                </div>
                <div  className="flex items-center">
                    <svg  className="w-4 h-4 fill-current flex-shrink-0 text-gray-400" viewBox="0 0 16 16">
                        <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
                    </svg>
                    <a  className="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 ml-2" href="#0">{email}</a>
                </div>
            </div>
        </header>
    </div>
  )
}

export default ChatHeader