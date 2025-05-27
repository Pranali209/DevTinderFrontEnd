import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from './component/Footer'
import { useEffect } from 'react'
import axios from 'axios'
import { Base_Url } from './utlis/Contant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utlis/UserSlice'
import People from  './assets/image.png'
import ImageBottom from './component/image'

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const UserData = useSelector(store => store.user)
  const location = useLocation()
  const isChatRoute = location.pathname.startsWith('/chat/');
  useEffect(()=>{
     async  function HandleGetUser(params) {
     
        try {
         const res = await axios.get(Base_Url + '/profile/view',{
            withCredentials:true
          })
         

           dispatch( addUser(res.data))
         
          
        } catch (error) {
    
          if(error.status == 401)
          {
             navigate('/login')
          }
        }
      
      }
      if(!UserData)
      {
        HandleGetUser()
      }
     
  },[])
  return (
    <>
  <div className=' bg-gradient-to-br from-[#870BA3] to-[#FF9F2D] border-[1px] border-[#870BA3] h-screen'>
    {
     !isChatRoute &&   <Header />
    }
    
      
      <Outlet />
      
    </div>
   
    </>
  )
}

export default App
