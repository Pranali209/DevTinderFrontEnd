import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_Url } from '../../utlis/Contant'

function ReceivedRequest() {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        async function GetReceivedRequest(params) {
            try {
                const response = await axios.get(Base_Url + '/requests/recevied', {
                    withCredentials: true
                })
                setRequests(response.data.data)
          

            }
            catch (error) {
                console.error("Error fetching received requests:", error);
            }
        }
        GetReceivedRequest()
        console.log(requests, "request");

    }, [])

    async function handlingAcceptRequest(reqId ,status) {
        try {
            const resp = await axios.post(Base_Url + `/request/review/${status}/${reqId}` , {} , {
                withCredentials: true
            })

console.log(resp);

            
        } catch (error) {
            console.error("Error Accepting the requests:", error);
            
        }
        
    }

    async function handlingRejectRequest(reqId ,status) {
        try {
            const resp = await axios.post(Base_Url + `/request/review/${status}/${reqId}` , {} , {
                withCredentials: true
            })

console.log(resp);

            
        } catch (error) {
            console.error("Error Accepting the requests:", error);
            
        }
        
    }

    return (
        <div className='px-8 py-5 '>
            {requests.length > 0 ? (
                requests.map((request, index) => (
                    <div className="shadow-xl card card-side bg-base-100">
                        <figure>
                            <img
                                src={request.fromUserId.photoUrl}
                                alt="Movie" 
                                className='object-cover w-64 h-auto'/>
                        </figure>
                        <div className="card-body">
                            <span className="inline text-2xl font-semibold text-white">{request.fromUserId.firstName}  {request.fromUserId.lastName}</span>
                           <p className='text-lg text-white'> {request.fromUserId.about}</p>
                           <p className='text-lg text-white'> {request.fromUserId.skills}</p>
                           <p className='text-lg text-white'> {request.fromUserId.email}</p>
                            <div className="justify-end card-actions">
                                <button className="btn btn-primary"
                                onClick={()=>{
                                    handlingAcceptRequest(request._id, "accepted")
                                }}>Accept</button>
                                <button className="btn btn-primary"
                                 onClick={()=>{
                                    handlingRejectRequest(request._id, "rejected")
                                }}>Reject</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No requests received yet.</p>
            )}
        </div>
    )
}

export default ReceivedRequest