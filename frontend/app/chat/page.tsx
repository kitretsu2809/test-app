'use client'
import React, { useEffect , useState} from 'react'
import {w3cwebsocket as ws} from 'websocket'


interface chatdatta {
  username : string,
  message  : string
}

function Chat() {

    const [client, setClient] = useState<ws | null>(null);
    const username = localStorage.getItem('user')
    const [messages, setMessages] = useState<chatdatta[]>([]);
    const [msg , setmsg] = useState('')
    useEffect(()=>{
            const socket = new ws('ws://localhost:8000/ws/chat/lobby/')

            socket.onopen = ()=>{
                console.log('you are connected')
            }
            socket.onmessage = (message)=>{
              const data = JSON.parse(message.data as string)
                setMessages((prevmessage)=> [...prevmessage , {username : data.username , message : data.message}])
            }
            socket.onclose = ()=>{
                console.log('web socket connection closed')
            }
            socket.onerror =(error)=>{
                console.log('websocket error' , error)
            }
            setClient(socket)
            return () => {
      if (client) {
        client.close();
      }
    };
    },[])

    const sendmessage = ()=>{
        if(client && client.readyState === client.OPEN){
            client.send(JSON.stringify({username , message : msg}))
        }
    }

  return (
    <div>
      <div>
      <h2>WebSocket Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.username} : </strong>{msg.message}</p>
        ))}
      </div>
      <input type="text" placeholder='enter the message' onChange={(e)=>setmsg(e.target.value)}/>
      <button onClick={() => sendmessage()}>send msg</button>
    </div>
    </div>
  )
}

export default Chat
