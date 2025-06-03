import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CreateSocketConnection } from '../../utlis/Socket'
import axios from 'axios'
import { Base_Url } from '../../utlis/Contant'


function ChatBox() {
  const { targetUserId, targetUserName } = useParams()
  const [newMessage, setNewMessage] = React.useState("")
  const LoggedInUserId = useSelector(state => state.user)
  const [messages, setMessages] = useState([])
  const [match, setMatch] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    if (!LoggedInUserId) {
      console.log("User is not logged in")
      return
    }



    const LoadOldChat = async () => {
      const response = await axios.get(Base_Url + `/chat/${targetUserId}`, {
        withCredentials: true
      })


      if (response.data.message === "chat Found") {


        setMessages((prevMessages) => [...prevMessages, ...response.data.data.messages]);
        console.log("messages to check ",response.data.data.messages);


      }

    }

    LoadOldChat()


    const socket = CreateSocketConnection();

    // as soon as the component loaded , socket connection is made and  joinChat event is emitted


    socket.emit('joinChat', {
      targetUserId,
      LoggedInUserId: LoggedInUserId?._id,
      firstName: LoggedInUserId?.firstName,
    })


    socket.on('recieveMessage', ({ text, firstName, targetUserId, LoggedInUserId }) => {


      setMessages((prevMessages) => [...prevMessages, { text: text, senderId: LoggedInUserId, createdAt: new Date() }]);
      //console.log(" meessages after receiving message" , messages);
    })


    return () => {
      socket.disconnect()
    }
  }, [LoggedInUserId, targetUserId])


  useEffect(() => {
    FetchMatches()
  }, [])


  async function FetchMatches(params) {
    try {
      const response = await axios.get(Base_Url + '/requests/matches', {
        withCredentials: true
      })

     if (response.data.data) {
      setMatch((prevMatches) =>
        response.data.data.map((matchItem) => {
          const latestMessage = messages
         .filter((msg) => msg.senderId === matchItem._id)
            .pop(); // Get the latest matching message
 console.log(latestMessage , "latest message") ;
 
          return latestMessage
            ? { ...matchItem, text: latestMessage.text } // Add text field dynamically
            :  matchItem  // Default text if no messages

           
            
        })

      );
    }
    console.log(match , "fetaching data with text feild") ;
    

    } catch (error) {
      console.log("Error fetching matches:", error);

    }


  }


  function handleSendMessage(params) {
    const socket = CreateSocketConnection();

    socket.emit('sendMessage', {
      targetUserId,
      LoggedInUserId: LoggedInUserId?._id,
      text: newMessage,
      firstName: LoggedInUserId?.firstName,
    }

    )

    setNewMessage('')
    // setMessages((prevMessages) => [...prevMessages, {text: newMessage , senderId : LoggedInUserId?._id}]);

  }


  return (
    <div className="flex h-screen bg-[#121212] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-[#1e1e1e] flex flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img src={LoggedInUserId?.photoUrl} alt="Artur Avakov" className="w-10 h-10 mr-2 rounded-full" />
            <div>
              <p className="font-semibold">{LoggedInUserId?.firstName}</p>
              <p className="text-xs text-gray-400">{LoggedInUserId?.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 cursor-pointer material-symbols-outlined">more_vert</span>
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
            {

              match.map((match, index) =>
                <li key={index} className="bg-[#272727] rounded-md p-3 hover:bg-[#303030]
                 transition-colors duration-200 cursor-pointer "
                 onClick={() => {
                            window.location.href = `/chat/${match._id}/${match.firstName}`;
                        }} >
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                      <img src={match.photoUrl} alt="Emma Smith" className="w-10 h-10 mr-2 rounded-full" />
                      <div>
                        <p className="font-semibold">{match.firstName + " " + match.lastName} </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">Today<br />13:42</div>
                  </div>
                  <p className="mt-2 text-sm">{match.text}</p>
                </li>
              )

            }





          </ul>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-[#1e1e1e] p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-4 cursor-pointer material-symbols-outlined "
            onClick={ ()=> navigate('/dashboard/match')}>arrow_back</span>
            <div className="flex items-center">
              <img src="https://avatar.iran.liara.run/public" alt="Emma Smith" className="w-10 h-10 mr-2 rounded-full" />
              <div>
                <p className="font-semibold">{targetUserName}</p>
                <p className="text-xs text-gray-400">Contact info</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="cursor-pointer material-symbols-outlined">call</span>
            <span className="cursor-pointer material-symbols-outlined">videocam</span>
            <span className="cursor-pointer material-symbols-outlined">more_vert</span>
          </div>
        </header>
        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto">


          {/* Chat Message - Agent */}
          {
            messages.map((text, index) => {
              const formattedTime = new Date(text.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                text.senderId === LoggedInUserId?._id ? (
                  <div className="flex justify-start mb-2 " key={index}>
                    <div className="max-w-md p-2 bg-green-600 rounded-md " >
                      <p className="text-sm text-white">{text.text}</p>
                      <p className="text-xs text-right text-gray-400">{formattedTime}</p>
                    </div>

                  </div>
                ) : (
                  <div className="flex justify-end mb-2" key={index}>
                    <div className="bg-[#272727] rounded-md p-2 max-w-md">
                      <p className="text-sm text-orange-300">{text.text}</p>
                      <p className="text-xs text-right text-gray-400">{formattedTime}</p>
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
            onChange={(e) => setNewMessage(e.target.value)}
            type="text" placeholder="Reply Message" className="flex-1 rounded-md px-3 py-2 bg-[#272727] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={handleSendMessage}
            className="ml-2 material-symbols-outlined"
             style={{ color: "black" }}
  onMouseEnter={(e) => e.target.style.color = " #16a34a"}
  onMouseLeave={(e) => e.target.style.color = "#9ca3af"}>send</button>
        </div>
      </main>
    </div>
  )
}

export default ChatBox