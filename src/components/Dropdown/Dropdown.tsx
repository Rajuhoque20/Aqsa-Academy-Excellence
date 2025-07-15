'use client'

import React, { useState } from 'react'

export default function Dropdown({options, value, setValue}:{options:any[], value:string, setValue:(val:string)=>void}) {
    const [toggle, setToggle]=useState(false);
    const handleClick=(event:string)=>{
        setToggle(prev=>!prev);
        setValue(event)
    }
  return (
    <div className="relative inline-block text-left">
            <div onClick={()=>setToggle(prev=>!prev)}>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {value}
                <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                </button>
            </div>

            {toggle&&<div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    {options?.map((item, index)=>{
                        return(
                            <span  key={index} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100" onClick={()=>handleClick(item.value)}>{item.label}</span>
                        )
                    })}
                           
                </div>
            </div>}
  </div>
  )
}
