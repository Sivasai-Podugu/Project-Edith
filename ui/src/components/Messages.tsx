import React, { useEffect, useRef, useState } from 'react'
import '.././App.css'
import ChatHeader from './ChatHeader'
import RecievedMsg from './RecievedMsg'
import SendMessage from './SendMessage'
import api from './api/axiosConfig'

import { useLocation, useNavigate, useParams } from 'react-router'
import { Loading } from './loading/Loading'


type MessagesTypes = {
    senderid:number,
    message:string,
    timestamp:string,
}

type UserTypes= {
    id:number,
    name:string,
    email:string,
    location:string,
    username:string


}

 

export const Messages = () => {
    const [render, setRender ] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const sendername = location.state && location.state.sendername;
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');
    const [history,setHistory] = useState<MessagesTypes[]>([]);
    const [user, setUser] = useState<UserTypes>({} as UserTypes);
    const {id} = useParams()
    const headers = {
        Authorization:`Bearer ${localStorage.getItem("Jwt")}`
    }
    const token = localStorage.getItem('Jwt');  

     
    
    const fetchUser = async()=>{
        
        await api.get(`/user/${id}`,{headers})
            .then(response => {
                 
                setUser(response.data);

            })
            .catch(error => {
                 
            })


    }

    const fetchHistory = async()=>{
        
        await api.get(`/msgs/${id}`,{headers})
            .then(response => {
                 
                setHistory(response.data);
                
                
            })
            .catch(error => {
                 
            })

    }

    
    

    const fetchData = async () => {
        await fetchUser();
        await fetchHistory();
      };

      useEffect(() => {
        const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        }, 500);

        return () => {
        clearTimeout(loadingTimer);
        };
    }, []);
    
      useEffect(() => {

         
        
        const id: NodeJS.Timeout = setInterval(fetchData, 5000);  
        setIntervalId(id as unknown as number);  
    
         
        return () => {
          if (intervalId !== null) {
             
            clearInterval(intervalId);  
          }
        };
      }, []);

      useEffect(()=>{
         
        fetchUser();
        fetchHistory();
      },[render]);

     

      useEffect(()=>{
        if(!sendername){
            navigate("/chat");
        }
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight + 1000;
          }

      },[history]);



    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
         
        const sendMessage = {
            
            "receiverid":user.id && user.id,
            "message":message,
            "timestamp":new Date().toISOString()
        }
        const headers = {
            Authorization:`Bearer ${localStorage.getItem("Jwt")}`
        }
        await api.post("/msg",sendMessage,{headers})
            .then(response => {     
                
            })
            .catch(error => {
                 
            })
            setMessage("");
            setRender(!render);
      }

   
    
    const RenderMessages = ():any => {
        return (
            history?.map((msg,index)=>{
                if(msg.senderid == Number(id)){
                    return <RecievedMsg key={index} text={msg.message} time={msg.timestamp.slice(0, 19).replace('T', ' ')} name={user.name} />
                }
                else{
                    return <SendMessage key={index} text={msg.message} time={msg.timestamp.slice(0, 19).replace('T', ' ')} name={sendername} />
                }
            })
          
        )
      }
      

  return (
    <>
        {isLoading &&
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <Loading message="Messages Loading.... please wait...."/>
            </div>
        }
        <div  className="flex flex-col items-center justify-center w-screen min-h-screen  text-gray-800 p-10">
                    
                        
                    

        
            <div  className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                <div  className="flex justify-between items-center mb-3 border-b-2 pt-4 pb-4 pl-12 md-p-4">
                    <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" 
                            onClick={()=>{clearInterval(intervalId as number);navigate("/chat")}}>
                        Back
                    </button>
                    <span className='pr-[2rem]'>
                    <ChatHeader ischat={false} name={user.name && user.name} username={user.username && user.username} email={user.email && user.email} location={user.location && user.location} />
                    </span>
                        
                    
                </div>
                <div  className="flex flex-col flex-grow h-0 p-4 overflow-auto" ref={messagesContainerRef} style={{ overflowY: 'auto', maxHeight: '100%' }}>
                
                    <RenderMessages />
                </div>
                
                <div className="bg-white border-t-2 pt-4 pb-4 pl-12 md-p-4">
                    <form onSubmit={handleSubmit} className="flex items-center ml-12 mr-5">
                        <input
                        className="flex border-2  items-center h-10 w-[300px] rounded px-3 text-sm"
                        type="text"
                        placeholder="Type your message…"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                        type="submit" 
                        className="ml-9 text-white bg-bggreen hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                        Send
                        </button>
                    </form>
                </div>

            </div>
            

        </div>
    </>
  )
}
