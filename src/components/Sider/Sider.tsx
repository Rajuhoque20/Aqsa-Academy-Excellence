import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { FaUserGraduate, FaUser, FaChalkboardTeacher,
     FaUserTie, FaUserCheck, FaExclamationCircle,
     FaCalendarAlt, FaBuilding, FaBook
      } from "react-icons/fa";

interface NavLink{
    id:number,
    title:string,
    url:string
    icon:ReactNode
}

const navLinks:NavLink[]=[
    {
        id:1, title:"Student",url:"/student",
        icon:<FaBook size={20}/>
    },
    {
        id:2, title:"Teacher",url:"/teacher",
         icon:<FaChalkboardTeacher size={20}/>
    }
    ,{
        id:3, title:"Staff",url:"/stuff",
         icon:<FaUserTie size={20}/>
    },
     {
        id:4, title:"Managing User",url:"/managingUser",
         icon:<FaUser size={20}/>
    },
    {
        id:5, title:"Candidates",url:"/candidate",
         icon:<FaUserCheck  size={20}/>
    },
    {
        id:6, title:"Notice",url:"/notice",
         icon:<FaExclamationCircle size={20}/>
    },
    {
        id:7, title:"Events",url:"/events",
         icon:<FaCalendarAlt size={20}/>
    },
    {
        id:8, title:"Toppers",url:"/toppers",
         icon:<FaUserGraduate size={20}/>
    },
    {
        id:9, title:"Job Vacancy",url:"/jobVacancy",
         icon:<FaBuilding  size={20}/>
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
    const isActive=pathName.includes(data.url);
    return(
        <Link href={data.url} className={` flex items-center gap-2 ${isActive?'bg-blue-800':'bg-gray-800'} px-5 py-3 rounded-md`}>
            {data.icon}
            {data.title}
            </Link>
    )
}
