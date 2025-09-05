'use client'
import Image from "next/image";
import Carousel from "../Carousel/Carousel"
import axios from "axios";
import { useEffect, useState } from "react";

export const Gallery=()=>{
    const [events, setEventsData]=useState([]);
      const getEvents=()=>{
     axios.get('/api/event')
    .then(res=>{
      if(res){
        setEventsData(res?.data);
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{
   getEvents();
  },[]);

  const gallery = [];
  for (let i = 0; i < events.length; i += 3) {
    const chunk = events.slice(i, i + 3);
    gallery.push({
      id: gallery.length + 1,
      data: chunk.map((event:any, idx) => ({
        id: idx + 1, // local id inside the chunk
        img: event.image,
        alt: event.title || "event image",
        description: event.description,
        title: event.title,
      }))
    });
  }

  console.log(gallery);

    return(
        <div className="h-[60vh] w-full px-30 mb-30 gap-10 flex flex-col">
            <h1 className="text-5xl text-black">Events</h1>
             <Carousel
               dataLength={gallery?.length}
               RenderedItem={gallery?.map((item)=>{
                    return(
                        <div key={item.id} className='min-w-full h-full grid grid-cols-3 gap-8'> 
                        {
                            item?.data?.map(img=>{
                                return(
                                    <div key={img.id} className="shadow-md p-5 flex flex-col gap-3 bg-gray-200 rounded-md">
                                        <div className="relative h-[300px]">
                                            <Image src={img.img} fill alt={img.alt} />

                                        </div>
                                        <h2 className="text-gray-700 font-semibold">{img.title}</h2>
                                        <p className="text-gray-700">{img.description}</p>
                                    </div>
                                )
                            })
                        }                             
                        </div>
                    )
                })}
               />
        </div>
    )
}