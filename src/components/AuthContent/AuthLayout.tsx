import React, { ReactNode } from 'react'
import Header from '../Header/Header'
import { Sider } from '../Sider/Sider'

export default function AuthLayout({children}:{children:ReactNode}) {
  return (
    <div className='h-screen box-border flex flex-col'>
        <Header/>
        <div className='flex flex-1'>
          <Sider/>
          <div className='w-5/6 bg-gray-800 p-5'> {children}</div>
          
        </div>
       
    </div>
  )
}
