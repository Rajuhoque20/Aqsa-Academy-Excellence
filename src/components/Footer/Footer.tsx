
import React from 'react'
import LoginButton from './LoginButton';

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

export default function Footer() {
    
  return (
    <div className='h-max flex items-center justify-between bg-gray-800  p-20'>
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
      <LoginButton/>
     
    </div>
  )
}
