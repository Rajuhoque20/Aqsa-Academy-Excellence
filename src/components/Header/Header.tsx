import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='h-15 flex bg-orange-600 w-full items-center'>
      <div className='flex gap-5 m-10 '>
        <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/student">Student</Link>
      <Link href="/administration">Administration</Link>
      <Link href="/stuff">Faculty & Stuff</Link>
      </div>
       

    </div>
  )
}
