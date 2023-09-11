import React, { LegacyRef, ReactComponentElement, ReactElement, useEffect, useRef, useState } from 'react'
import '../../App.css'
import ChatBox from './ChatBox'
import ChatHeader from './ChatHeader'
import { FormModal } from '../models/FormModal'

import api from '../api/axiosConfig';
import { Loading } from '../loading/Loading'

type ChatDataTypes = {
    contactUserId: number;
    contactName:string;
    latestMessage: string;
    latestMessageTimestamp: string;
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
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(7);
    const containerRef = useRef<any>();
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [searchValue, setSearchValue]= useState("");

    useEffect(() => {
        fetchData();
   
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
        container.removeEventListener('scroll', handleScroll);
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

    useEffect(() => {
        fetchDataOnScroll();
      }, [pageNumber]);

      useEffect(()=>{
        fetchDataOnSearch();
      },[searchValue])
    
    

    const fetchProfile = async() =>{
        const headers = {
            Authorization:`Bearer ${localStorage.getItem("X-AUTH")}`
        }
        await api.get("/user",{headers})
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
            Authorization:`Bearer ${localStorage.getItem("X-AUTH")}`
        }
        await api.get(`/contact?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers})
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



    const fetchDataOnScroll = async () => {
        const headers = {
            Authorization:`Bearer ${localStorage.getItem("X-AUTH")}`
        }

        const response = await api.get(`/contact?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers})
                        .then(response => {
                            
                            
            
                            
                            setChats((prevChats) => [...prevChats, ...response.data]);        
                        })
        .catch(error => {
             
        })


        
      };

      
    const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollHeight - container.scrollTop === container.clientHeight) {
        
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
    };

    const fetchDataOnSearch = async()=>{
        const headers = {
            Authorization:`Bearer ${localStorage.getItem("X-AUTH")}`
        }

        const response = await api.get(`/contact?pageNumber=${0}&pageSize=${999999}&filter=${searchValue}`,{headers})
                        .then(response => {
                            setChats(response.data);        
                        })
        .catch(error => {
             
        })
        
    }



     function RenderChats(): any{
      return (
        chats ? 
        chats.map((chat)=>{
            return <ChatBox key={chat.contactUserId} ownername={profile.name} id={chat.contactUserId} name={chat.contactName} lastmsg={chat.latestMessage && chat.latestMessage.substring(0,9)+'..'} time={chat.latestMessageTimestamp && chat.latestMessageTimestamp.slice(0, 19).replace('T', ' ')} />
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
                        
                        <form>   
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value);}} id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-bggreen" placeholder="Search for users..." required />
                            </div>
                        </form>

                        <h3 className="text-xs font-semibold uppercase mt-4 text-gray-400 ">Chats</h3>

                    </div>

                    
                    <div className="py-3 px-5 h-[380px] overflow-y-auto" ref={containerRef}>
                        
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
