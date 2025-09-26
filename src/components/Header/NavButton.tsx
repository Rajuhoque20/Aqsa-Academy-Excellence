
'use client'
import { ReactNode } from "react"
import { usePathname, useRouter } from 'next/navigation';
export default function NavButton(
    {data}:{
        data:{
            icon:ReactNode,
            id:string,
            title:string,
        },
    }
){
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
    return(
         <button key={data.id} className='cursor-pointer flex gap-2 items-center hover:scale-110 hover:text-blue-300 hover:underline transition' onClick={()=>handleClick(data.id)}>
        {data.icon}
        {data.title}
        </button>
    )
}