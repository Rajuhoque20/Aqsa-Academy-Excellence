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
      <h1 className='text-5xl mt-10'>Our Toppers</h1>
      <h2 className='text-3xl mt-5'>Class XII (2024)</h2>
      <div className='grid gap-8 grid-cols-3 '>
        {toppersData?.filter((item:TopperDTO)=>item.class==='XII')?.map((item:TopperDTO)=>(
          <div className='p-5 bg-gray-200 rounded-md shadow-sm transform transition hover:scale-105' key={item._id}>
            <div className='relative h-[300px]'>
            <Image
            alt={item?.image}
            src={item?.image}
            fill={true}
            objectFit='cover'
            />
            </div>
            <h1 >{item.name}</h1>
            <span className='text-gray-600 text-sm'>Marks: {item.marks}</span>
          </div>
        ))}

      </div>

      <h2 className='text-3xl mt-5'>Class X (2024)</h2>
      <div className='grid gap-5 grid-cols-3'>
        {toppersData?.filter((item:TopperDTO)=>item.class==='X')?.map((item:TopperDTO)=>(
          <div className='p-5 bg-gray-200 rounded-md shadow-sm transform transition hover:scale-105' key={item._id}>
            <div className='relative h-[300px]'>
            <Image
            alt={item?.image}
            src={item?.image}
            fill={true}
            objectFit='cover'
            style={{objectFit:"fill"}}
            />
            </div>
            <h1 >{item.name}</h1>
            <span className='text-gray-600 text-sm'>Marks: {item.marks}</span>
          </div>
        ))}

      </div>
    </div>
  )
}
