
import React from 'react'
import { FaHome } from "react-icons/fa"; 
import './Header.css';
import Image from 'next/image';
import { FaInfoCircle } from "react-icons/fa";
import { FaPhone, FaEnvelope, FaComments } from "react-icons/fa";
import AdmissionButtion from './AdmissionButton';
import SignoutButton from './SignoutButton';
import NavButton from './NavButton';
import { instituteInfo } from 'src/constant';

 const links=[
      {
        title:"Home",
        id:'home',
        icon:<FaHome size={20}/>
      },
       {
        title:"About",
        id:'about',
        icon:<FaInfoCircle size={20}/>
      },
       {
        title:"Contact",
        id:'contact',
        icon:<FaComments size={20}/>
      }
    ]
export default function HeaderClient({data}:{data:{name:string}}){
    return(
        <div className='h-[8vh] flex flex-col w-full items-center bg-gray-900 justify-center px-5'>
      <div className='w-full flex items-center'>
        {data?.name?
        <div className='flex gap-4 items-center'>
          <div className='relative w-[2.5rem] h-[2.5rem]'>
          <Image src={'/aqsa_logo.jpg'} alt="aqsa_logo" fill={true}  className='rounded-full'/>
          </div>
        <span className='text-2xl'>Welcome to Aqsa Academy of Excelence!</span>
        </div>
        :<div className='md:flex gap-8 hidden'>
          {links?.map(item=><NavButton
          key={item.id}
          data={item}
          />)}
         
        </div>}        
        {data?.name? 
        <div className='flex items-center gap-10 justify-right ml-auto'>
          <div className='flex gap-4 items-center'>         
          <Image src={'/profile_icon.jpg'} alt={"user profile"} width={40} height={40} className='rounded-full'/>            
          <span>{data?.name}</span>
          </div>         
           <SignoutButton/>
        </div>
        :
        <>
        <div className='ml-auto md:gap-5 gap-2 flex flex-col md:flex-row md:items-center mr-3'> 
            <div className='flex items-center gap-3 text-yellow-400'>
              <FaPhone size={20}/>
              <h3>{instituteInfo.phone}</h3>  
            </div>
            <div className='flex items-center gap-3 text-orange-400'>
              <FaEnvelope size={20}/>
            <h3>{instituteInfo.email}</h3> 
            </div>        
            <div className='hidden md:block'>
              <AdmissionButtion/>
            </div>
        </div>
         <div className='block md:hidden'>
             <AdmissionButtion/>
          </div>
        </>
       
        }
      </div>
      
    </div>
    )
}