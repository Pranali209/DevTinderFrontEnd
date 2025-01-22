import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import { Outlet } from 'react-router-dom'
import Footer from './component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 
       <div>
        <Header/>
         <Outlet/>
         <Footer/>
       </div>
   
    </>
  )
}

export default App
