import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './component/Header/index.jsx'
import Home from './Pages/Home.jsx'
import { Store } from './utlis/store.js'
import Feed from './Pages/Feed.jsx'
import Login from './component/Login/index.jsx'
import SignUp from './component/SignUp/index.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/',
        element: <Feed/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      }
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store= {Store}>
    <RouterProvider router={router} />

    </Provider>

  
  </StrictMode>,
)
