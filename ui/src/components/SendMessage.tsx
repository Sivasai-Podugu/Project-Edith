type SendMessageProps = {
    text:string,
    time:string,
    name:string
}


export default function SendMessage({text,time,name}:SendMessageProps) {
  return (
    <div  className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        
        <div>
            <div  className="bg-bggreen text-white p-3 rounded-l-lg rounded-br-lg">
                <p  className="text-sm">{text}</p>
            </div>
            <span  className="text-xs text-gray-500 leading-none">{time}</span>
        </div>

        <div  className="flex-shrink-0 h-10 w-10 rounded-full bg-bggreen"><div className='pt-1'><span className="font-medium text-white ml-3  text-2xl dark:text-gray-300">{name && name.charAt(0)+" "}</span></div></div>
    </div>
  )
}
