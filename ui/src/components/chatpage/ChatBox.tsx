import { useNavigate } from "react-router";

type ChatBoxProps = {
    id:number,
    name : string,
    lastmsg : string,
    time: string,
    ownername:string
}

export default function ChatBox({id,name,lastmsg,time, ownername}:ChatBoxProps) {
    const navigate = useNavigate();
    const handleClick=()=>{
        
    
        navigate(`/messages/${id}`,{state:{sendername:ownername}});

    }
  return (

         <button key={id} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50" onClick={handleClick}>
            <div  className="flex items-center">
                <div  className="flex-shrink-0 h-10 w-10  mr-4 rounded-full bg-bggreen"><div className='pt-1'><span className="font-medium text-white ml-3  text-2xl dark:text-gray-300">{name && name.charAt(0)+" "}</span></div></div>
                <div>
                <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
                <div className="text-[13px] grid grid-cols-2 gap-4">
                    <div>{lastmsg}</div>
                    <div className="text-right">{time}</div>
                </div>
                </div>
                
            </div>
        </button>

   
  )
}
