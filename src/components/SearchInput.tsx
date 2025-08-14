import React, { useEffect, useState } from 'react'

export const SearchInput = ({onChange}:{
  onChange:(val:string)=>void,
  value:string,
}) => {
  const [search, setSearch]=useState('');
  const [debounceSearch, setDebounceSearch]=useState('')
  const handleSeach=(e)=>{
      setSearch(e.target.value);
  };

  useEffect(()=>{
     setTimeout(()=>{
      setDebounceSearch(search);
    },500)
  },
  [search])

  useEffect(()=>{
    onChange(debounceSearch);
  },[debounceSearch])

  return ( 
    <div className="relative w-[20vw]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search"  onChange={handleSeach} id="default-search" className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
    </div>
  )
}
