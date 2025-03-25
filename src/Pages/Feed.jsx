import React, { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../utlis/Contant';
import { addFeed } from '../utlis/feedSlice';
import Card from '../component/Card'; // This will now render SwipeCards
import NoFeed from '../assets/NoFeed.gif';

function Feed() {
  const dispatch = useDispatch();
  
 const [result, setResult] = useState(false);
  useEffect(() => {
    async function HandleFeedData() {
  const res = await axios.get(Base_Url + '/feed', {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'If-Modified-Since': '0'
        }
      });

      dispatch(addFeed(res.data));
      
      setResult(
        res.data.data.length > 0 ? true
        : false
      )
      
      console.log(result, "res");
      
      
    }

    HandleFeedData();
  }, []);

  return (
    <div className='grid my-12 place-content-center'>
      {
       result? (
        <Card />
       ):(
        <>
          <img src={NoFeed} alt="NoFeedAnimation" className='object-cover w-96 h-96'/>
          <p className='text-2xl font-semibold text-center text-black mb-28'>Nothing on your Feed</p>
        </> 
       
       )
      }
    
      
    </div>
  );
}

export default Feed;
