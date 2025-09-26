
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
export default function LoginButton(){
    const pathname = usePathname();
    return(
         pathname!=='/login'&&<Link href='/login'>
      <button className='px-10 py-3 shadow-cyan-500/50 bg-cyan-500 shadow-lg cursor-pointer rounded-md transition hover:scale-105' >Login</button>
      </Link>
    )
}