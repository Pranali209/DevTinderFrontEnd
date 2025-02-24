import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Base_Url } from '../../utlis/Contant';
import Input from '../Input';

const SignUp = () => {
    const [showSuccess, setshowSuccess] = useState("")
    const [showError, setshowError] = useState("")
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
        console.log(selectedImage);


        setFormdata({
            photoUrl: selectedImage,
            firstName: e.target[1].value,
            lastName: e.target[2].value,
            gender: e.target[3].value,
            age: e.target[4].value,
            email: e.target[5].value,
            password: e.target[6].value,
            about: e.target[7].value,
            skills: e.target[8].value,
            phone: e.target[9].value,
            twitterId: e.target[10].value,
            linkedinId: e.target[11].value

        })
        if (formdata) {
            try{
                const res = await axios.post(Base_Url + '/signup', {
                    photoUrl: selectedImage,
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
                
                if(res.status == 200)
                {
                    setshowSuccess(res.data)
                    setTimeout(() => {
                        setshowSuccess('')
                    }, [2000])
                }

              
            }
            catch(error){
               
                setshowError(error.response.data)
                setTimeout(() => {
                    setshowError('')
                }, [2000])
                
            }
   
            
           
           
        }








    }

    return (
        <div className="container my-14 mx-auto w-[70%] p-8 shadow-md bg-black border-[4px] border-blue-900 rounded-2xl hover:border-yellow-300 transition-all duration-200">
             {showSuccess && (<div className="z-30 toast toast-top toast-start">
                <div className="alert alert-success">
                    <span>{showSuccess}</span>
                </div>
            </div>)}
            {showError && (<div className="z-30 toast toast-top toast-start">
                <div className="alert !bg-red-500 alert-success">
                    <span>{showError}</span>
                </div>
            </div>)}
            <div className='my-10'>
                <h1 className='text-4xl font-semibold text-center text-white '> Lets get you started</h1>
                <p className='mt-3 text-center text-gray-200'>Enter the details to get going</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => handleSignUp(e)}>
                <div className="flex flex-wrap items-center w-full gap-5 mb-10 max-md:max-w-full">
                    <div className="container ">
                        <div className="relative flex flex-col items-center mx-auto image-upload-container w-fit" >
                            <div className="image-preview ">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Uploaded Image" className='w-24 h-24 rounded-full' />
                                ) : (
                                    <img src="https://placehold.co/150x150" alt="Uploaded Image" className='w-24 h-24 rounded-full' />
                                )}
                            </div>
                            <div className="upload-button absolute  bottom-[-10px] bg-yellow-400 w-7 h-7 rounded-full flex  justify-center">
                                <label htmlFor="file-upload" className="text-white material-symbols-outlined">
                                    +
                                </label>
                                <input type="file" id="file-upload" hidden onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block mb-2 font-bold text-white">First Name*</label>
                        <Input type="text" id="firstName" placeholder="Enter your First Name" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-2 font-bold text-white">Last Name</label>
                        <Input type="text" id="lastName" placeholder=" Enter your Last Name" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 font-bold text-white" htmlFor="gender">Gender</label>
                        <select className="w-full px-3 py-2 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dob" className="block mb-2 font-bold text-white">Age*</label>
                        <Input type="number" id="dob" />

                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label htmlFor="email" className="block mb-2 font-bold text-white">Email Address*</label>
                        <Input type="email" id="email" placeholder="Enter your Email Address" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-bold text-white">Password*</label>
                        <Input type="password" id="password" placeholder="Enter your password " />
                    </div>
                </div>
                <h2>Self details</h2>

                <div>
                    <label htmlFor="about" className="block mb-2 font-bold text-white">About</label>
                    <textarea id="about" name="about" placeholder="Bio (keep it short and sweet)" className="w-full px-3 py-2 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="skills" className="block mb-2 font-bold text-white">Skills</label>
                    <textarea id="skills" name="skills" placeholder="Add some skills" className="w-full px-3 py-2 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="">

                    <div>
                        <label htmlFor="phoneNumber" className="block mb-2 font-bold text-white">Phone Number (include country code)*</label>
                        <Input type="tel" id="phoneNumber" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-white">Social Media</label>
                    <div className="mt-1 space-y-3">
                        <div className="flex items-center">
                            <span className="w-8 text-gray-400"><i className="fab fa-twitter"></i></span>
                            <Input type="text" id="twitter" placeholder='Twitter Link' />
                        </div>
                        <div className="flex items-center">
                            <span className="w-8 text-gray-400"><i className="fab fa-linkedin"></i></span>
                            <Input type="text" id="likedin" placeholder='Linkedin id ' />
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-yellow-400 mx-[45%]  text-gray-900 font-bold py-2 px-4 mt-5 rounded-md focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </form>
        </div>

    );
}

export default SignUp;
