type RecievedMsgProps = {
    name:string,
    text:string,
    time:string
}

function RecievedMsg({name,text,time}:RecievedMsgProps) {
  return (
    <div  className="flex w-full mt-2 space-x-3 max-w-xs">
        <div  className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"><div className='pt-1'><span className="font-medium text-gray-600 ml-3  text-2xl dark:text-gray-300">{ name && name.charAt(0)+" "}</span></div></div>
        
        <div>
            <div  className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p  className="text-sm">{text}</p>
            </div>
            <span  className="text-xs text-gray-500 leading-none">{time}</span>
        </div>
    </div>
  )
}

export default RecievedMsg