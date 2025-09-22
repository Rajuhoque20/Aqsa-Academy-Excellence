'use client'
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Title } from '../Title';

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
       <Title>OUR TOPPERS</Title>
      <div className='grid gap-20 grid-cols-4 mt-8'>
        {toppersData?.map((item:TopperDTO)=>(
          <div className='rounded-md flex flex-col gap-3 transform transition hover:scale-105' key={item._id} >
            <div className='relative h-[220px] w-[220PX] mx-10'>
            <Image
              style={{boxShadow:'0px 0px 30px skyblue'}}
              className='rounded-full'
            alt={item?.image}
            src={item?.image}
            fill={true}
          
            />
            </div>
            <div className='flex mx-auto flex-col gap-2 items-center'>
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
