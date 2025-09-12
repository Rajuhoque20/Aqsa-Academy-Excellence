import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavLink{
    id:number,
    title:string,
    url:string
}

const navLinks:NavLink[]=[
    {
        id:1, title:"Student",url:"/student",
    },
    {
        id:2, title:"Teacher",url:"/teacher",
    }
    ,{
        id:3, title:"Stuff",url:"/stuff",
    },
     {
        id:4, title:"Managing User",url:"/managingUser",
    },
    {
        id:5, title:"Candidates",url:"/candidate",
    },
    {
        id:6, title:"Notice",url:"/notice",
    },
    {
        id:7, title:"Events",url:"/events",
    },
    {
        id:8, title:"Toppers",url:"/toppers",
    },
    {
        id:9, title:"Job Vacancy",url:"/jobVacancy",
    }
];

export const Sider = () => {

  return (
    <div className='flex flex-col w-1/6 bg-slate-700 h-full p-6'>
        <div className='flex flex-col gap-5'>
        {navLinks?.map((item)=>{
            return(
                <NavItem data={item} key={item.id}/>
            )
        })}
        </div>
    </div>
  )
}

const NavItem=({data}:{data:NavLink})=>{
    const pathName=usePathname();
    const isActive=pathName===data.url;
    return(
        <Link href={data.url} className={`${isActive?'bg-blue-800':'bg-gray-800'} px-5 py-3 rounded-md`}>{data.title}</Link>
    )
}
