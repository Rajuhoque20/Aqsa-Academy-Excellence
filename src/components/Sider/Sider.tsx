import Link from 'next/link'
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
    }
]

export const Sider = () => {
  return (
    <div className='flex flex-col w-1/6 bg-slate-700 h-full p-10'>
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
    return(
        <Link href={data.url}>{data.title}</Link>
    )
}
