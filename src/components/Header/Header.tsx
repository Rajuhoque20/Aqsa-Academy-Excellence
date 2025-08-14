'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Dropdown from './../Dropdown/Dropdown';
import './Header.css';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
export default function Header() {
  const [value, setValue]=useState('English');
    const {data}=useSession();
    console.log("datadata",data)
  return (
    <>
    <div className='h-[8vh] flex flex-col w-full items-center bg-gray-900 justify-center px-5'>
      <div className='w-full flex items-center'>
        {data?.user?
        <div className='flex gap-4 items-center'>
          <div className='relative w-[2.5rem] h-[2.5rem]'>
          <Image src={'/aqsa_logo.jpg'} alt="aqsa_logo" fill={true} className='rounded-full'/>
          </div>
        <span className='text-2xl'>Welcome to Aqsa Academy of Excelence!</span>
        </div>
        :<div className='flex gap-5'>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/about">Contact</Link>
        </div>}
        
        {data?.user? 
        <div className='flex items-center gap-10 justify-right ml-auto'>
          <div className='flex gap-4 items-center'>
            
          <Image src={'/profile_icon.jpg'} alt={"user profile"} width={40} height={40} className='rounded-full'/>
            
          <span>{data?.user?.name}</span>
          </div>
        <button onClick={()=>{
          signOut()

        }} className='p-2 rounded-full color-white bg-red-600 cursor-pointer'>
          <LogOut/>
        </button>
        </div>
        :
        <div className='ml-auto mr-10 gap-5 flex items-center'>    
            <Link href="/new-student-registration">
              <button className='bg-gray-800 text-green-500 px-5 py-2 rounded-md cursor-pointer'> New Student Registration</button>
            </Link>
          <Dropdown 
          value={value}
          setValue={setValue}
          options={[
            {label:"English", value:"English"},
            {label:"Bengali", value:"Bengali"}
          ]}
          />
        </div>
       
        }
      </div>
      
    </div>
      </>
  )
}
