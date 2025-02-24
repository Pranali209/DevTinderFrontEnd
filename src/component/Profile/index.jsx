import React, { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import EditProfile from '../EditProfile';


function Dashboard() {
   

    return (
        <div className="z-50 flex min-h-screen px-36 ">
           
            <aside className="w-64 bg-black border-r border-gray-200 shadow-sm bg-opacity-60 backdrop-blur-sm bg-blend-color-burn rounded-tl-md rounded-bl-md">
                <div className="p-6">
                    <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" className="h-8 mb-8" />
                    <nav className="space-y-1">
                        <NavLink to="/dashboard/editProfile" className="flex items-center px-4 py-3 text-sm font-medium text-blue-600 rounded-lg bg-blue-50">
                        <i className="w-5 h-5 mr-3 fas fa-user-edit"></i>
                            Edit Profile
                        </NavLink>
                        <NavLink to="/dashboard/request/received" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-gray-50 hover:text-black">
                        <i className="w-5 h-5 mr-3 fas fa-arrow-down"></i>
                            Request Received
                        </NavLink>
                        <NavLink to="/request/sent" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-gray-50 hover:text-black">
                        <i className="w-5 h-5 mr-3 fas fa-paper-plane"></i>
                            Request Sent
                        </NavLink>
                        <NavLink to="/dashboard/match" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-gray-50 hover:text-black">
                        <i className="w-5 h-5 mr-3 fas fa-handshake"></i>
                             Match
                        </NavLink>
                        
                       
                    </nav>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto bg-black rounded-tr-md rounded-br-md bg-opacity-55 backdrop-blur-sm bg-blend-color-burn ">
               <Outlet/>
            </main>
        </div>

    );
}

export default Dashboard;
