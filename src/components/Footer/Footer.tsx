import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='h-30 blue-bg flex items-center justify-end p-5'>
      <Link href='/login'>
      <button className='px-10 py-3 bg-blue-400 cursor-pointer rounded-md'>Login</button>
      </Link>
    </div>
  )
}
