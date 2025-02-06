import React, { useEffect, useState } from 'react';
import Heading from '../Heading';
import Button from '../Button';
import Input from '../Input';
import { Base_Url } from '../../utlis/Contant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


function EditProfile() {
    const data = useSelector(store => store.user);

    const [selectedImage, setSelectedImage] = useState(null);
    const [userData, setUserData] = React.useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

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


    useEffect(() => {

        setUserData(data)
        setSelectedImage(data?.photoUrl)


    }, [data])


    async function HandleEditFormSubmit(e) {

        e.preventDefault();
        setError('')
        try {
            const updatedData = await axios.patch(Base_Url + '/profile/edit', {
                photoUrl: selectedImage,
                firstName: userData.firstName,
                lastName: userData.lastName,
                gender: userData.gender,
                age: userData.age,
                email: userData.email,
                about: userData.about,
                skills: userData.skills,
                phone: userData.phone,
                twitterId: userData.twitterId,
                linkedinId: userData.linkedinId,
            },
                {
                    withCredentials: true
                }
            )


            if (updatedData) {

                setSuccess(updatedData.data)

                setTimeout(() => {
                    setSuccess('')
                }, [2000])
                console.log(success);

            }

        } catch (error) {

            setError(error.response?.data)
        }

    }

    const handleChange = (e) => {

        const { id, value } = e.target;


        setUserData((prevState) => ({
            ...prevState,
            [id]: value,
        }));






    };

    return (
        <div className="z-50 flex min-h-screen px-36 ">
            {success && (<div className="z-30 toast toast-top toast-start">
                <div className="alert alert-success">
                    <span>{success}</span>
                </div>
            </div>)}
            <aside className="w-64 bg-black border-r border-gray-200 shadow-sm bg-opacity-60 backdrop-blur-sm bg-blend-color-burn rounded-tl-md rounded-bl-md">
                <div className="p-6">
                    <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" className="h-8 mb-8" />
                    <nav className="space-y-1">
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-blue-600 rounded-lg bg-blue-50">
                            <i className="w-5 h-5 mr-3 fas fa-home"></i>
                            Dashboard
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-gray-50 hover:text-black">
                            <i className="w-5 h-5 mr-3 fas fa-building"></i>
                            Company Profile
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-gray-50 hover:text-black">
                            <i className="w-5 h-5 mr-3 fas fa-graduation-cap"></i>
                            Educational Path
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-gray-50 hover:text-black">
                            <i className="w-5 h-5 mr-3 fas fa-map"></i>
                            Roadmap
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-gray-50 hover:text-black">
                            <i className="w-5 h-5 mr-3 fas fa-user-tie"></i>
                            My Mentor
                        </a>
                    </nav>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto bg-black rounded-tr-md rounded-br-md bg-opacity-55 backdrop-blur-sm bg-blend-color-burn ">
                <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8 ">
                    <div className="mb-8 ">
                        <h1 className="text-4xl font-bold text-white">Edit Profile</h1>
                        <p className="mt-1 text-sm text-gray-300">Update your personal information and profile settings</p>
                    </div>
                    <div className="overflow-hidden bg-white rounded-lg shadow">
                        <div className="relative h-40 bg-center bg-cover bg-editprofile">
                            <div className="absolute -bottom-7 left-8">
                                <div className="image-preview ">
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Uploaded Image" className='border-2 border-white w-28 h-28 rounded-2xl' />
                                    ) : (
                                        <img src={userData?.photoUrl} alt="Uploaded Image" className='border-2 border-white w-28 h-28 rounded-2xl' />
                                    )}
                                </div>
                                <div className="absolute  bottom-[-10px]  bg-yellow-400 right-0  rounded-full upload-button x w-7 h-7 flex justify-center">
                                    <input type="file" id="file-upload" hidden onChange={handleImageChange} />
                                    <label htmlFor="file-upload" className="text-white material-symbols-outlined ">
                                        +
                                    </label>

                                </div>
                            </div>
                        </div>
                        <div className="px-8 pt-20 pb-6 bg-black">
                            {data && (
                                <form className="space-y-6 " onSubmit={(e) => HandleEditFormSubmit(e)}>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-white">First Name</label>
                                            <Input type="text" id="firstName" value={userData?.firstName} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Last Name</label>
                                            <Input type="text" id="lastName" value={userData?.lastName} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Email Address</label>
                                            <Input type="email" id="email" value={userData?.email} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Phone Number</label>
                                            <Input type="tel" id="phone" value={userData?.phone} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Age</label>
                                            <Input type="number" id="age" value={userData?.age} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Gender</label>
                                            <Input type="text" id="gender" value={userData?.gender} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Bio</label>
                                        <textarea rows="4" id="about" value={userData?.about} className="block w-full p-2 mt-1 bg-gray-900 border-gray-300 rounded-lg shadow-sm" onChange={handleChange}></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Skills</label>
                                        <textarea rows="4" id="skills" value={userData?.skills} className="block w-full p-2 mt-1 bg-gray-900 border-gray-300 rounded-lg shadow-sm" onChange={handleChange}></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Social Media</label>
                                        <div className="mt-1 space-y-3">
                                            <div className="flex items-center">
                                                <span className="w-8 text-gray-400"><i className="fab fa-twitter"></i></span>
                                                <Input type="text" id="twitterId" value={userData?.twitterId} onChange={handleChange} />
                                            </div>
                                            <div className="flex items-center">
                                                <span className="w-8 text-gray-400"><i className="fab fa-linkedin"></i></span>
                                                <Input type="text" id="linkedinId" value={userData?.linkedinId} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    {error && <p className='text-red-600 text-bold'> {error}</p>}
                                    <div className="flex justify-end space-x-3">
                                        <Button type="button" text="Cancel" />
                                        <Button type="submit" text="Save Changes" />
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
}

export default EditProfile;
