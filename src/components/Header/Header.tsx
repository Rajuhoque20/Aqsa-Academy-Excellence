'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Dropdown from './../Dropdown/Dropdown';
import './Header.css';
import Image from 'next/image';

export default function Header() {
  const [value, setValue]=useState('English');
  return (
    <>
    <div className='h-[8vh] flex flex-col w-full items-center blue-bg p-3'>
      <div className='flex items-center gap-5'>
       
        

      </div>
      <div className='w-full flex m-1'>
      <div className='flex gap-5'>
        <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      {/* <Link href="/student">Student</Link>
      <Link href="/administration">Administration</Link>
      <Link href="/stuff">Faculty & Stuff</Link> */}
      </div>
      
      <div className='ml-auto mr-10 gap-5 flex items-center'>
         <Link href="/about">Contact</Link>
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
    {/* <div className='h-10 banner-container overflow-hidden relative'>
        <span className='banner absolute top-1'>Our mission is to empower poor and backward minority section and thereby develop the socio-economic condition of the society.</span>
      </div> */}
      </>
  )
}
