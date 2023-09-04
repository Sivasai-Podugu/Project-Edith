import React, { ReactComponentElement, ReactElement, useEffect, useRef, useState } from 'react'
import '.././App.css'
import ChatBox from './ChatBox'
import ChatHeader from './ChatHeader'
import { FormModal } from './models/FormModal'

import api from './api/axiosConfig';
import { Loading } from './loading/Loading'

type ChatDataTypes = {
    contact_user_id: number;
    contact_name:string;
    latest_message: string;
    latest_message_timestamp: string;
}
type ProfileType = {
    id:number,
    name:string,
    username:string,
    location:string,
    email:string
}

export default function Chat() {
    const [isLoading, setIsLoading] = useState(true);
    const [profile,setProfile] = useState<ProfileType>({} as ProfileType);
    const [chats,setChats] = useState<ChatDataTypes[]> ([]);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    
    

    const fetchProfile = async() =>{
        const headers = {
            Authorization:`Bearer ${localStorage.getItem("Jwt")}`
        }
        await api.get("/profile",{headers})
            .then(response => {
                const responseData: ProfileType = response.data
                setProfile(responseData)
                sessionStorage.setItem("user",JSON.stringify(responseData))
                 
                
            })
            .catch(error => {
                 
            })

    }

    const fetchChats =async()=>{
        const headers = {
            Authorization:`Bearer ${localStorage.getItem("Jwt")}`
        }
        await api.get(`/allcontact`,{headers})
            .then(response => {
                const responseData: ChatDataTypes[] = response.data
                setChats(responseData)
                sessionStorage.setItem("user",JSON.stringify(responseData))
                 
                
            })
            .catch(error => {
                 
            })
        

    }

    const fetchData = async () => {
        await fetchProfile();
        await fetchChats();
      };

      useEffect(()=>{
        fetchData();
      },[])

    useEffect(() => {
    
        
        const id: NodeJS.Timeout = setInterval(fetchData, 15000); 
        setIntervalId(id as unknown as number); 
    
        
        return () => {
          if (intervalId !== null) {
            clearInterval(intervalId as unknown as number); 
          }
        };
      }, []);

      useEffect(() => {
        const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        }, 500);

        return () => {
        clearTimeout(loadingTimer);
        };
    }, []);




     function RenderChats(): any{
      return (
        chats ? 
        chats.map((chat)=>{
            return <ChatBox key={chat.contact_user_id} ownername={profile.name} id={chat.contact_user_id} name={chat.contact_name} lastmsg={chat.latest_message && chat.latest_message.substring(0,9)+'..'} time={chat.latest_message_timestamp && chat.latest_message_timestamp.slice(0, 19).replace('T', ' ')} />
        })
        :
        <i className='flex justify-center mt-[110px] text-gray-400 text-sm'>
            No chats till now
        </i>
      )
    }
    

    const [showModal, setShowModal] = useState(false);
  return (
    <>
    {isLoading &&
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Loading message="Chats Loading.... please wait...."/>
        </div>
    }
    <div>
        
        <section className="flex flex-col justify-center antialiased bg-white  text-gray-600 min-h-screen p-4">
        <div className="h-full">

            <div className="relative max-w-[450px] mx-auto bg-white shadow-lg rounded-lg">
                {showModal && <FormModal fetchChat={fetchChats} modalType='Add User' toggleModal={setShowModal} /> }
                <ChatHeader ischat={true} name={profile.name} email={profile.email} location={profile.location} username={profile.username}/>
                    <div className="ml-4 mt-2 mb-1  border-t pt-2 border-gray-200">
                        <h3 className="text-xs font-semibold uppercase text-gray-400 ">Chats</h3>
                    </div>
                    
                    <div className="py-3 px-5 h-[380px] overflow-y-auto">
                        
                        <div className="divide-y divide-gray-200">
                            <RenderChats />
                        </div>
                    </div>
                    
                    <button className="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-bggreen hover:bg-green-700 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2" onClick={()=>setShowModal(true)}>
                        <svg className="w-3 h-3 fill-current text-white flex-shrink-0 mr-2" viewBox="0 0 12 12">
                        <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                        </svg>
                        <span>New Chat</span>
                    </button>
                </div>
            </div>
        </section>

    </div>
    </>
  )
}
