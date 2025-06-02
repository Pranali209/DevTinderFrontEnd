import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useMotionValue, useTransform , useMotionValueEvent } from "framer-motion";
import skillIcon from '../../assets/skill.png';
import axios from 'axios';
import { Base_Url } from '../../utlis/Contant';
import { addConnection } from '../../utlis/Connection';


const Card = () => {
  const dispatch = useDispatch()
  const data = useSelector(store => store.feed);
  const [cards, setCards] = React.useState([]);
  const [dragDirection, setDragDirection] = useState(null);


  useEffect(() => {
    setCards(data?.data);
    console.log(data, "data");
    console.log(data?.length, "cards");
  }, [data]);

  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  
   useMotionValueEvent(x, "change", (latest) => {
    if (latest > 100) {
      setDragDirection("right");
    } else if (latest < -100) {
      setDragDirection("left");
    } else {
      setDragDirection(null);
    }
  })

 
  const handleDragEnd = (id) => {

    const direction = x.get() > 0 ? "right" : "left"

   
    if (Math.abs(x.get()) > 100) {

      setCards((pv) => pv.filter((v) => v._id !== id));
     
      handleSwipe(id, direction)
    }

  };

  async function handleSwipe(id, direction) {


    try {
      

     if(direction == "right"){
      const res = await axios.post(Base_Url + `/request/interested/${id}`, {}, {
        withCredentials: true,

      })
      
      console.log(res.data, "res")
     }
     else if(direction == "left"){
      const res = await axios.post(Base_Url + `/request/ignored/${id}`, {}, {
        withCredentials: true,

      })
      
      console.log(res.data, "res")
     }
     



    }
    catch (error) {
      console.log(error);

    }
    // if (direction == "right") {
    //   setLiked("interested")
    //   setcollections([
    //     ...collections,
    //     {
    //       fromId: id,
    //       liked: true

    //     }

    //   ])



    //   console.log(response.data, "response");

    // }
    // else if (direction == "left") {
    //   setLiked("ignored")
    // }

    // console.log(liked, "liked value");




  }

  return (
    cards?.map((item, index) => (
      <motion.section className='mb-5 active:cursor-grabbing hover:cursor-grab'
        style={{
          gridRow: 1, gridColumn: 1, x, opacity,
          rotate: rotateRaw, // Use the rotateRaw for rotation
          transition: "0.125s transform",
          boxShadow: index === cards.length - 1
            ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
            : undefined,
        }}
        animate={{
          scale: index === cards.length - 1 ? 1 : 0.98,
        }}
        drag={"x"}
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        onDragEnd={() => handleDragEnd(item._id)}
      >
       
     
        <div key={index}
          className="product-card w-[320px] h-[500px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
          <div className="absolute -left-[40%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150">
            <div className="flex gap-1">
              <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={1} fill="none" viewBox="0 0 24 24" className="fill-gray-300 rotate-[24deg]" height={200} width={200} xmlns="http://www.w3.org/2000/svg">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>
          <div className="absolute rounded-full bg-gray-500 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[58%] transition-all duration-300" />
          <div className="z-40 leading-none text-center uppercase para">
            <p className="font-serif text-xl font-semibold text-black">{item.firstName}</p>
            <p className="text-4xl font-bold tracking-wider text-gray-500">{item.lastName}</p>
          </div>
          <div className="img w-[250px] h-[250px] aspect-square bg-gray-100 z-40 rounded-md ">
            <img src={item.photoUrl} alt={item.firstName} className='object-cover w-full h-full' />
          </div>
          <div className="z-40 flex flex-row items-end justify-between gap-10 btm-_container">
            <div className="flex flex-col items-start gap-1">
              <div className="inline-flex items-center justify-center gap-3">
                <div className="flex items-center justify-center p-1 bg-white rounded-full">
                  <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={1} fill="none" viewBox="0 0 24 24" className="w-3 h-3 fill-gray-800 stroke-none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-white">+1234 456 780</p>
              </div>
              <div className="flex flex-row gap-2">
                <div className="inline-flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center p-1 bg-white rounded-full">
                    <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={1} fill="none" viewBox="0 0 24 24" className="w-3 h-3 fill-gray-800 stroke-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-white">{item.email}</p>
                </div>
              </div>
              <div className="inline-flex items-center justify-center gap-3">
                <div className="flex items-center justify-center p-1 bg-white rounded-full">
                  <img src={skillIcon} className='w-3' />
                </div>
                <p className="text-xs font-semibold text-white">{item.skills}</p>
              </div>
            </div>
          </div>
        </div>
        {
         dragDirection === "right"  ? (
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
           className="absolute w-[50px] h-[50px] top-56 -right-20 fill-blue-500">
        <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160
         390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 
         44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"/></svg>)
         : dragDirection === "left" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          className="absolute w-[50px] h-[50px] top-56 -left-20 fill-blue-500">
        <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z"/></svg>
        :""
       }
      </motion.section>
    ))
  );
}

export default Card;
