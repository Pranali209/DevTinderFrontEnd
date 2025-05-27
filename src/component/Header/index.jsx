import React from 'react'
import Logo from '../../assets/Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Base_Url } from '../../utlis/Contant'
import { removeUser } from '../../utlis/UserSlice'
import { useNavigate , Link} from 'react-router-dom'
function Header() {
  
  function clearCookies() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
  const data = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function HandleLogout(params) {
    try {
       const res  = await axios.post(Base_Url + '/logout' , {
        withCredentials:true
      })
      if(res.status == 200)
      {
         clearCookies();
         dispatch(removeUser())
         navigate('/login')
      }
      console.log(res);
      
      
    } catch (error) {
        console.log(error);
        
    }
    
  }
  return (
    <div className="px-8 py-6 bg-black shadow-xl navbar">
    <div className="flex-1">
      <img src= {Logo}  alt="logo" className='w-16'/>
    </div>
    <div className="flex-none gap-2">
      
      <div className="mx-10 dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
          <div className="w-20 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link className="justify-between" to = "/dashboard">
              Profile
              
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li><a onClick={HandleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Header