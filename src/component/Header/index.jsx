import React from 'react'
import Logo from '../../assets/Logo.png'
import { useSelector } from 'react-redux'
function Header() {

  const data = useSelector(store => store.user)
  console.log(data);
  
  return (
    <div className="navbar bg-base-100 py-6 px-8 shadow-xl">
    <div className="flex-1">
      <img src= {Logo}  alt="logo" className='w-16'/>
    </div>
    <div className="flex-none gap-2">
      
      <div className="dropdown dropdown-end mx-10">
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
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Header