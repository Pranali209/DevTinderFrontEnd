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
import Dashboard from './component/Profile/index.jsx'
import ReceivedRequest from './component/ReceivedRequest/index.jsx'
import EditProfile from './component/EditProfile/index.jsx'
import Match from './component/Match/index.jsx'
import ChatBox from './component/Chat/index.jsx'
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
      },{
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard/editProfile',
            element: <EditProfile />
          },
          {
            path: '/dashboard/request/received',
            element: <ReceivedRequest />
          },
          {
            path: '/dashboard/match',
            element :<Match/>
          }

        ]
      },
      {
        path :'/chat/:targetUserId/:targetUserName',
        element : <ChatBox/>
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
