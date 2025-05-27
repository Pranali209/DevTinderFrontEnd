import axios from 'axios'
import React, { useEffect , useState} from 'react'
import { Base_Url } from '../../utlis/Contant'

function Match() {
    const [match , setMatch] = useState([])
    useEffect(()=>{
        async function FetchMatches(params) {
             const response = await axios.get(Base_Url + '/requests/matches' , {
                withCredentials:true
             })

             console.log(response.data.data , " matches");
             setMatch(response.data.data)
        }

        FetchMatches()
    },[])
  return (
    <div className='px-8 py-5 '>
    {match.length > 0 ? (
        match.map((match, index) => (
            <div className="mt-5 shadow-xl card card-side bg-base-100" key={index}>
               
                    <img
                        src={match.photoUrl}
                        alt="Movie" 
                        className='object-cover w-64 h-auto'/>
               
                <div className="card-body">
                    <span className="inline text-2xl font-semibold text-white">{match.firstName}  {match.lastName}</span>
                   <p className='text-lg text-white'> {match.about}</p>
                   <p className='text-lg text-white'> {match.skills}</p>
                   <p className='text-lg text-white'> {match.email}</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary"
                        onClick={() => {
                            window.location.href = `/chat/${match._id}/${match.firstName}`;
                        }}
                        
                    >Chat</button>
                       
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p>No Match yet.</p>
    )}
</div>
  )
}

export default Match