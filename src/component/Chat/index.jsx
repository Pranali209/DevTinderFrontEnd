import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CreateSocketConnection } from '../../utlis/Socket'
import axios from 'axios'
import { Base_Url } from '../../utlis/Contant'


function ChatBox() {
   const { targetUserId , targetUserName } = useParams()
   const [newMessage , setNewMessage] = React.useState("")
   const LoggedInUserId =  useSelector( state => state.user)
   const [ messages , setMessages] =  useState([])

    useEffect(()=>{

      if(!LoggedInUserId){
        console.log("User is not logged in")
        return
      }

      const LoadOldChat = async () => {
        const response  = await axios.get(Base_Url + `/chat/${targetUserId}` ,  {
          withCredentials:true
        })
       
        if(response.data.message === "chat Found"){
         
          console.log(response.data.data.messages, " chat found");
          setMessages((prevMessages) => [...prevMessages, { ...response.data.data.messages }]);
        }
      }

      LoadOldChat()
      const socket = CreateSocketConnection();
     
      // as soon as the component loaded , socket connection is made and  joinChat event is emitted
      
      
      socket.emit('joinChat' , {
       targetUserId,
       LoggedInUserId : LoggedInUserId?._id,
       firstName : LoggedInUserId?.firstName,
      })

      socket.on('recieveMessage',({message , firstName})=>{
        console.log( firstName + ":" + message);
        setMessages((prevMessages) => [...prevMessages, { message, firstName }]);
        
      })



      return()=>{
        socket.disconnect()
      }
    },[LoggedInUserId, targetUserId])



     function handleSendMessage(params) {
      const socket = CreateSocketConnection();

      socket.emit('sendMessage' , {
        targetUserId,
        LoggedInUserId : LoggedInUserId?._id,
        message: newMessage,
        firstName : LoggedInUserId?.firstName,
      })

      setNewMessage('')
      
     }


  return (
    <div className="flex h-screen bg-[#121212] text-white font-sans">
    {/* Sidebar */}
    <aside className="w-80 bg-[#1e1e1e] flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src="https://avatar.iran.liara.run/public" alt="Artur Avakov" className="w-10 h-10 mr-2 rounded-full" />
          <div>
            <p className="font-semibold">{LoggedInUserId?.firstName}</p>
            <p className="text-xs text-gray-400">Agent</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 material-symbols-outlined">more_vert</span>
        </div>
      </div>
      {/* Sidebar Menu */}
    
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 material-symbols-outlined">search</span>
          <input type="text" placeholder="Search by contact or IP" className="w-full rounded-md pl-10 pr-3 py-2 bg-[#272727] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
  
  
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <ul className="px-4 py-2 space-y-2">
          {/* Chat Item */}
          <li className="bg-[#272727] rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://avatar.iran.liara.run/public" alt="Emma Smith" className="w-10 h-10 mr-2 rounded-full" />
                <div>
                  <p className="font-semibold">Emma Smith</p>

                </div>
              </div>
              <div className="text-xs text-gray-400">Today<br />13:42</div>
            </div>
            <p className="mt-2 text-sm">There is a lot of exiting stuff going on in the stars</p>
          </li>
          {/* Chat Item */}
          <li className="bg-[#272727] rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://avatar.iran.liara.run/public" alt="Emma Smith" className="w-10 h-10 mr-2 rounded-full" />
                <div>
                  <p className="font-semibold">Emma Smith</p>

                </div>
              </div>
              <div className="text-xs text-gray-400">Today<br />13:42</div>
            </div>
            <p className="mt-2 text-sm">There is a lot of exiting stuff going on in the stars</p>
          </li>
          {/* Chat Item */}
          <li className="bg-[#272727] rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://avatar.iran.liara.run/public" alt="Emma Smith" className="w-10 h-10 mr-2 rounded-full" />
                <div>
                  <p className="font-semibold">Emma Smith</p>

                </div>
              </div>
              <div className="text-xs text-gray-400">Today<br />13:42</div>
            </div>
            <p className="mt-2 text-sm">Typing...</p>
          </li>
          {/* Chat Item */}
          <li className="bg-[#272727] rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://avatar.iran.liara.run/public" alt="Emma Smith" className="w-10 h-10 mr-2 rounded-full" />
                <div>
                  <p className="font-semibold">Emma Smith</p>
                </div>
              </div>
              <div className="text-xs text-gray-400">Today<br />13:42</div>
            </div>
            <p className="mt-2 text-sm">There is a lot of exiting stuff going on in the stars</p>
          </li>
          
        </ul>
      </div>
    </aside>
    {/* Main Content */}
    <main className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-[#1e1e1e] p-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-4 material-symbols-outlined">arrow_back</span>
          <div className="flex items-center">
            <img src="https://avatar.iran.liara.run/public" alt="Emma Smith" className="w-10 h-10 mr-2 rounded-full" />
            <div>
              <p className="font-semibold">{targetUserName}</p>
              <p className="text-xs text-gray-400">Contact info</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="material-symbols-outlined">call</span>
          <span className="material-symbols-outlined">videocam</span>
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </header>
      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        
       
        {/* Chat Message - Agent */}
        {
          messages.map((text ,index)=>{
            return(
              text.firstName === LoggedInUserId?.firstName ?(
<div className="flex justify-start mb-2 ">
              <div className="max-w-md p-2 bg-green-600 rounded-md ">
                <p className="text-sm">{text.message}</p>
                <p className="text-xs text-right text-gray-400">{text.firstName}</p>
              </div>
             
            </div>
               ):(
                <div className="flex justify-end mb-2">
              <div className="bg-[#272727] rounded-md p-2 max-w-md">
                <p className="text-sm">{text.message}</p>
                <p className="text-xs text-right text-gray-400">{text.firstName}</p>
              </div>
             
            </div>
               )
              
            )
          })
        }
        
      
       
       
      </div>


      {/* Input Area */}
      <div className="p-4 bg-[#1e1e1e] flex items-center">
        <span className="mr-2 material-symbols-outlined">attach_file</span>
        <span className="mr-2 material-symbols-outlined">add</span>
        <input value={newMessage}
        onChange = {(e)=>setNewMessage(e.target.value)}
        type="text" placeholder="Reply Message" className="flex-1 rounded-md px-3 py-2 bg-[#272727] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={handleSendMessage}
         className="ml-2 material-symbols-outlined">send</button>
      </div>
    </main>
  </div>
  )
}

export default ChatBox