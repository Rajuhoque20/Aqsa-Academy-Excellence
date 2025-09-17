'use client'
import React, { useState } from 'react'
import { FaHome } from "react-icons/fa"; 
import './Header.css';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { FaInfoCircle } from "react-icons/fa";
import { FaPhone, FaEnvelope, FaComments } from "react-icons/fa";
import { Button } from '../Button';
import { usePathname, useRouter } from 'next/navigation';
const NewStudentRegistration=React.lazy(()=>import('../newStudentRegistration/newStudentRegistration'));
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
export default function Header() {
   const [open,setOpen]=useState(false);
    const {data}=useSession();
    const pathname = usePathname();
    const router=useRouter();

    const handleClick=(id:string)=>{
      if(pathname==='/login'){
        router.push('/');
        return;
      }
      const el=document.querySelector(`#${id}`);
      el?.scrollIntoView({
        behavior:"smooth",
        block:"start",
        inline:"start",
      })
    }
  return (
    <>
    <div className='h-[8vh] flex flex-col w-full items-center bg-gray-900 justify-center px-5'>
      <div className='w-full flex items-center'>
        {data?.user?
        <div className='flex gap-4 items-center'>
          <div className='relative w-[2.5rem] h-[2.5rem]'>
          <Image src={'/aqsa_logo.jpg'} alt="aqsa_logo" fill={true}  className='rounded-full'/>
          </div>
        <span className='text-2xl'>Welcome to Aqsa Academy of Excelence!</span>
        </div>
        :<div className='flex gap-8'>
          {links?.map(item=>{
            return <button key={item.id} className='cursor-pointer flex gap-2 items-center hover:scale-110 hover:text-blue-300 hover:underline transition' onClick={()=>handleClick(item.id)}>
              {item.icon}
              {item.title}
              </button>
          })}
         
        </div>}
        
        {data?.user? 
        <div className='flex items-center gap-10 justify-right ml-auto'>
          <div className='flex gap-4 items-center'>
            
          <Image src={'/profile_icon.jpg'} alt={"user profile"} width={40} height={40} className='rounded-full'/>
            
          <span>{data?.user?.name}</span>
          </div>
          
            <button onClick={()=>{
          signOut({ callbackUrl: "/" })

        }} className='p-2 rounded-full color-white bg-red-600 cursor-pointer'>
          <LogOut/>
        </button>
          
       
        </div>
        :
        <div className='ml-auto gap-5 flex items-center'> 
            <div className='flex items-center gap-3 text-yellow-400'>
              <FaPhone size={20}/>
              <h3>+91 7047082113</h3>  
            </div>
            <div className='flex items-center gap-3 text-orange-400'>
              <FaEnvelope size={20}/>
            <h3>raju.hoque97@gmail.com</h3> 
            </div>        
            <Button type='primary' onClick={()=>setOpen(true)} title='Apply to Register'/>
        </div>
       
        }
      </div>
      
    </div>
    <NewStudentRegistration open={open} setOpen={setOpen}/>
      </>
  )
}
