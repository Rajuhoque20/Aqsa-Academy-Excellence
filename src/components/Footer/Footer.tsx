
import React from 'react'
import LoginButton from './LoginButton';
import { useAlarmStore } from 'src/store/alarmStore';
import { Button } from '../Button';
import Notification from '../Notification/Notifcation';
import { instituteInfo } from 'src/constant';

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
        title:instituteInfo.phone,
        url:null,
      },
      {
        id:2,
        title:instituteInfo.name,
        url:null
      },
      {
        id:3,
        title:instituteInfo.location,
        url:null,
      },
      {
        id:4,
        title:instituteInfo.websiteURL,
        url:null,
      },
    ]
  }
];

export default function Footer() {
  const {handleEnable}=useAlarmStore();

  const handleEnableButton=()=>{
    handleEnable();
    Notification.success("Alarm bell is enabled.")
  }
    
  return (
    <div className='h-max flex flex-col md:flex-row items-center justify-between bg-gray-800 p-5 gap-5 md:p-20'>
      <div className='flex justify-between md:w-4/5 w-full flex-wrap gap-5'>
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
         {/* <button
            className="px-5 py-3 cursor-pointer h-max bg-blue-600 text-white rounded-lg self-center"
            onClick={handleEnable}
          >
            🔔 Enable Bell Allarm
          </button> */}
          <div className='self-center'>
              <Button type='primary'
              onClick={handleEnableButton}
              title={"🔔 Enable Bell Allarm"}
              />
          </div>
      </div>
      <LoginButton/>

     
    </div>
  )
}
