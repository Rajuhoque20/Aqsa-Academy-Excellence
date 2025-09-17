'use client'
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type TopperDTO={
  image:string,
  marks:string,
  _id:string,
  name:string,
  class:string,
}
export const OurTopper = () => {
  const [toppersData,setToppersData]=useState([]);
  const getToppers=()=>{
     axios.get('/api/topper')
    .then(res=>{
      if(res){
        setToppersData(res?.data);
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{
   getToppers();
  },[]);

  return (
    <div className='h-max text-black p-30 gap-5 flex flex-col' id="toppers">
      <h1 className='text-5xl my-10'>Our Toppers</h1>
      <div className='grid gap-15 grid-cols-4'>
        {toppersData?.map((item:TopperDTO)=>(
          <div className='rounded-md flex flex-col gap-3 transform transition hover:scale-105' key={item._id} >
            <div className='relative h-[250px] mx-10'>
            <Image
            style={{clipPath: 'circle(55%)'}}
            alt={item?.image}
            src={item?.image}
            fill={true}
            objectFit='cover'
            />
            </div>
            <div className='flex mx-auto flex-col gap-5'>
            <div className='flex gap-5 items-center font-md' >
            <h1>{item.name}</h1>
            <span className='w-[10px] h-[10px] rounded-full bg-gray-600'></span>
            <p> {item.class}</p>
            </div>
            <p className='text-gray-600 text-xl font-bold'><span className='text-sm'>Marks:</span> {item.marks}</p>
            </div>
          </div>
        ))}

      </div>
     
    </div>
  )
}
