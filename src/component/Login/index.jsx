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
    const [email, setEmail] = useState('ravigupta@gmail.com')
    const [password, setPassword] = useState('Ravigupta@123')
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
            <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-yellow-300 transition-all duration-200">
                <div className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col">
                    <img src={Logo} alt="logo" className='w-28' />
                    <h1 className="text-white text-2xl">Sign in to DevTinder</h1>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200" 
                        placeholder="Email" type="email" name="email" id />
                    
                    <input value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200" placeholder="Password" type="password" name="password" id />
                    {error && <p className='text-bold text-red-600'> Error : {error}</p>}
                    
                    <input onClick={HandleLogin}
                        className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200" type="submit" id />
                    <p>
                        Don't have an account?
                        <Link  to={navigate('/signup')}
                        className="font-semibold text-white hover:text-blue-500 transition-all duration-200" href> Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
