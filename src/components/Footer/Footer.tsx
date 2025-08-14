
'use client'
import axios from 'axios';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const footerData=[
  {
    title:"Admission",
    data:[
      {
        id:1,
        title:"Procedure",
        url:"/procedure"
      },
      {
        id:2,
        title:"Guideline",
        url:"/procedure"
      },
      {
        id:3,
        title:"Form Available",
        url:"/procedure"
      },
      {
        id:4,
        title:"Result",
        url:"/procedure"
      },
    ]
  },
  {
    title:"Scholarship",
    data:[
      {
        id:1,
        title:"WBMDFC",
        url:"/procedure"
      },
      {
        id:2,
        title:"Post Metrice",
        url:"/procedure"
      },
      {
        id:3,
        title:"Pre Metric",
        url:"/procedure"
      },
      {
        id:4,
        title:"Aikyashree",
        url:"/procedure"
      },
    ]
  },
  {
    title:"Contact Us",
    data:[
      {
        id:1,
        title:"+91 7045678432",
        url:null,
      },
      {
        id:2,
        title:"Al Aqsa Mission",
        url:null
      },
      {
        id:3,
        title:"Takagach, Cooch Behar-706145",
        url:null,
      },
      {
        id:4,
        title:"https://www.alaqsaacademy.com",
        url:null,
      },
    ]
  }
];

const createUser=async()=>{
  let user={
    name:"Raju Hoque",
    email:"raju.hoque@gmail.com",
    username:"Raju123",
    password:"12345",
    role:"admin",
  }
 
  await axios.post('api/users',user)
  .then(res=>{
    console.log("REEE", res)
  })
  .catch(error=>{
    console.log(error)
  });
}

export default function Footer() {
    const pathname = usePathname();
    console.log("pathname",pathname)
  return (
    <div className='h-max blue-bg flex items-center justify-between  p-20'>
      <div className='flex justify-between w-4/5'>
        {footerData?.map((item,index)=>{
          return(
            <div key={index} className='flex flex-col gap-2'>
              <h2 className='text-yellow-600 text-xl'>{item.title}</h2>
              {item?.data?.map((item2)=>{
                return(
                  <span key={item2.id}>{item2.title}</span>
                )
              })}
            </div>
          )
        })}
      </div>
      {pathname!=='/login'&&<Link href='/login'>
      <button className='px-10 py-3 shadow-cyan-500/50 bg-cyan-500 shadow-lg cursor-pointer rounded-md transition hover:scale-105' >Login</button>
      </Link>}
    </div>
  )
}
