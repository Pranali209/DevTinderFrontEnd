import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../utlis/Contant';
import { addFeed } from '../utlis/feedSlice';
import Card from '../component/Card'; // This will now render SwipeCards

function Feed() {
  const dispatch = useDispatch();

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
    }

    HandleFeedData();
  }, []);

  return (
    <div className='grid place-content-center my-12'>
      <Card />
    </div>
  );
}

export default Feed;
