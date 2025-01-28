import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Base_Url } from '../../utlis/Contant';

const SignUp = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null);
    const [formdata, setFormdata] = useState('')

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    async function handleSignUp(e) {

        e.preventDefault();
        console.log(e);
        
         setFormdata({
            photoUrl:e.target[0].value,
            firstName : e.target[1].value,
            lastName : e.target[2].value,
            gender : e.target[3].value,
            age : e.target[4].value,
            email : e.target[5].value,
            password : e.target[6].value,
            about: e.target[7].value,
            skills: e.target[8].value,
            phone: e.target[10].value

         })
         if(formdata)
         {
            console.log(formdata);
            
            const res = await axios.post(Base_Url + '/signup', {
                photoUrl: formdata.photoUrl,
                firstName: formdata.firstName,
                lastName: formdata.lastName,
                gender: formdata.gender,
                age: formdata.age,
                email: formdata.email,
                password: formdata.password,
                about: formdata.about,
                skills: formdata.skills,
                phone: formdata.phone
                

            }, {
                withCredentials: true
            })
            console.log(res);
         }
        
         

     
        



    }

    return (
        <div className="container my-14 mx-auto w-[70%] p-8 shadow-md bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-yellow-300 transition-all duration-200">
          <div className='my-10'>
          <h1 className=' text-4xl text-white text-center font-semibold'> Lets get you started</h1>
          <p className='text-gray-400 text-center mt-3'>Enter the details to get going</p>
          </div>
            <form className="space-y-4" onSubmit={(e) => handleSignUp(e)}>
            <div className="flex flex-wrap gap-5 items-center w-full max-md:max-w-full mb-10">
                        <div className="container ">
                            <div className="image-upload-container  relative w-fit flex flex-col items-center mx-auto" >
                                <div className="image-preview ">
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Uploaded Image" className='w-24 h-24 rounded-full' />
                                    ) : (
                                        <img src="https://placehold.co/150x150" alt="Uploaded Image" className='w-24 h-24 rounded-full' />
                                    )}
                                </div>
                                <div className="upload-button absolute  bottom-[-10px] bg-yellow-400 w-7 h-7 rounded-full flex items-center justify-center">
                                    <label htmlFor="file-upload" className="material-symbols-outlined text-white">
                                        +
                                    </label>
                                    <input type="file" id="file-upload" hidden onChange={handleImageChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name*</label>
                        <input type="text" id="firstName" value="kranti" name="firstName" placeholder="Enter your First Name"  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
                        <input type="text" id="lastName" value="killekar" name="lastName" placeholder="Enter your Last Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">Gender</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">Age*</label>
                        <input type="number" id="dob" name="dob" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                   
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address*</label>
                    <input type="email" id="email" value = "kranti@gmail.com" name="email" placeholder="Enter your Email Address" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password*</label>
                    <input type="password" value="Krantikellekar@123"  id="password" name="password" placeholder="Enter your password " className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                </div>
                <h2>Self details</h2>
               
                    <div>
                        <label htmlFor="about" className="block text-gray-700 font-bold mb-2">About</label>
                        <textarea  id="about" value="HI Der"  name="about" placeholder="Bio (keep it short and sweet)" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="skills" className="block text-gray-700 font-bold mb-2">Skills</label>
                        <textarea id="skills" value="JS"  name="skills" placeholder="Add some skills" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="timeZone" className="block text-gray-700 font-bold mb-2">Time Zone*</label>
                        <select id="timeZone" name="timeZone" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="IST">IST - Indian Standard Time - GMT +5:30</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">Phone Number (include country code)*</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value="9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>
                <button type="submit" className="bg-yellow-400 mx-[45%]  text-white font-bold py-2 px-4 mt-5 rounded-md focus:outline-none focus:shadow-outline">
                     Submit
                </button>
            </form>
        </div>

    );
}

export default SignUp;
