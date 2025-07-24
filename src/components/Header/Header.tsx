'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Dropdown from './../Dropdown/Dropdown';
import './Header.css';

export default function Header() {
  const [value, setValue]=useState('English');
  return (
    <>
    <div className='h-[8vh] flex flex-col w-full items-center bg-gray-900 justify-center px-5'>
      <div className='w-full flex items-center'>
        <div className='flex gap-5'>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/about">Contact</Link>
        </div>
        
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
      </div>
      
    </div>
      </>
  )
}
