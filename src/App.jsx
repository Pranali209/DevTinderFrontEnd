import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './component/Footer'
import { useEffect } from 'react'
import axios from 'axios'
import { Base_Url } from './utlis/Contant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utlis/UserSlice'

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const UserData = useSelector(store => store.user)

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
 
       <div>
      
        <Header/>
         <Outlet/>
      
       </div>
   
    </>
  )
}

export default App
