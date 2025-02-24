import React, { useState } from 'react';
import Logo from '../../assets/Logo.png'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utlis/UserSlice';
import { Base_Url } from '../../utlis/Contant';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error , setError] = useState('')
    const navigate = useNavigate()
    async function HandleLogin(params) {
    
        
        try {
            const res = await axios.post(Base_Url + '/login', {
                email: email,
                password: password

            }, {
                withCredentials: true
            })
            dispatch(addUser(res.data))
            console.log(res.data);
            alert("Login Successfull")
            navigate('/')
        } catch (error) {
            if(error)
            {
               setError(error?.response?.data)
            }
            
            console.error('Error during login:', error);
            

        }


    }
    return (
        <div className="flex items-center justify-center my-12">
            <div className="bg-black border-[4px] border-blue-900 rounded-2xl hover:border-yellow-300 transition-all duration-200">
                <div className="flex flex-col items-center px-12 py-16 mx-auto space-y-4 font-semibold text-gray-500">
                    <img src={Logo} alt="logo" className='w-28' />
                    <h1 className="text-2xl text-white">Sign in to DevTinder</h1>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="w-full p-2 transition-all duration-200 bg-gray-900 border border-gray-700 rounded-md focus:border-blue-700 hover:border-blue-500" 
                        placeholder="Email" type="email" name="email" id />
                    
                    <input value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-2 transition-all duration-200 bg-gray-900 border border-gray-700 rounded-md focus:border-blue-700 hover:border-blue-500" placeholder="Password" type="password" name="password" id />
                    {error && <p className='text-red-600 text-bold'> Error : {error}</p>}
                    
                    <input onClick={HandleLogin}
                        className="w-full p-2 bg-yellow-400 mx-[45%]  cursor-pointer text-gray-900 font-bold py-2 px-4 mt-5 rounded-md focus:outline-none focus:shadow-outline" type="submit" id />
                    <p className='text-gray-700'>
                        Don't have an account?
                        <Link  to='/signup'
                        className="font-semibold text-gray-700 transition-all duration-200 hover:text-blue-500" href> Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
