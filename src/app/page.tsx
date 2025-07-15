
'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react";
import Carousel from 'src/components/Carousel/Carousel';
import { OurTopper } from 'src/components/OurTopper/OurTopper';

const academicNav=[
  {
    title:"Mission & Vission",
    icon:"",
  },
   {
    title:"Exam & Result (Present Student)",
    icon:"Syllabus",
  },
   {
    title:"Book Lists I-IV 2025",
    icon:"",
  },
   {
    title:"Academic Calender",
    icon:"",
  },
]

const administration=[
  {
    title:"Secretary",
    icon:"",
  },
   {
    title:"Officers",
    icon:"Syllabus",
  },
   {
    title:"Chaiperson",
    icon:"",
  },
  {
    title:"Login",
    icon:"",
    navUrl:"/login"
  },
];

const admission=[
  {
    title:"Selection Procedure",
    icon:"",
  },
  {
    title:"Form Distribution Center",
    icon:"",
  },
  {
    title:"Admission Fee Structure",
    icon:"",
  },
  {
    title:"Fee Payment Mode",
    icon:"",
  },
  {
    title:"Help Line",
    icon:"",
  },
];

const students=[
   {
    title:"Check Your Due Fees",
    icon:"",
  },
   {
    title:"Our Alumini",
    icon:"",
  },
];

export default function Home() {
  return (
    <>
    <div className="flex flex-col h-[92vh]  w-screen relative">
            <Carousel/>
            <div className='absolute w-full h-full'>   
                  <div className='w-full h-full home-banner-container z-4 relative p-10'>
                        <div className='flex items-center gap-5'>
                            <div className='w-14 h-14 relative rounded-full border-dashed border-white border-1'  >
                                  <Image src={'/aqsa_logo.jpg'} alt="aqsa_logo"  fill  className='rounded-full'/>
                          </div>
                          <div className='flex flex-col items-center'>
                            <span className='text-3xl'>আকসা একাডেমি অফ এক্সিলেন্স | AQSA ACADEMY OF EXCELLENCE</span>
                            <span className='text-sm'> An Institute of Eminence, Coooch Behar, West Bengal, 736145</span>
                          </div>
                        </div>
                        <div className='absolute bottom-[-5rem] left-0 flex justify-center w-full h-[200px]'>
                          <div className='h-full flex'>
                          <div  className='bg-red-400 shadow-sm  h-full flex w-[300px] items-center justify-center cursor-pointer hover:scale-110 transition' >
                            <span className='text-xl font-semibold'>News</span>
                          </div>
                          <div  className='h-full shadow-sm  flex w-[300px] bg-blue-400 justify-center items-center cursor-pointer hover:scale-110 transition'>
                            <span className='text-xl font-semibold'>Our Toppers</span>
                          </div>
                          <div  className='h-full shadow-sm  flex w-[300px] bg-gray-800 justify-center items-center cursor-pointer hover:scale-110 transition'>
                            <span className='text-xl font-semibold'>Our Values</span>
                          </div>
                          </div>
                        </div>
                  </div>
            </div>
    </div>
    <OurTopper/>
    </>
  );
}

export const NavButton=({item, dataNavBg}:{item:any, dataNavBg:string})=>{
  const router=useRouter();
  return(
     <div className="p-4 flex flex-auto items-center justify-center cursor-pointer rounded-md hover:opacity-75"  style={{background:dataNavBg,}}
     onClick={()=>{
      if(item?.navUrl)
      {
        router.push(item?.navUrl);
      }
     }}
     >
          <span className="text-slate-600 text-white">
            {item?.title}
          </span>
        </div>  
  )
}

export const DetailInfo=({isOpen, data, dataNavBg}:{isOpen:boolean, data:any[], dataNavBg:string})=>{
     const contentRef = useRef(null);

   useEffect(() => {
    if (isOpen && contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      contentRef.current.style.maxHeight = scrollHeight + 'px';
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen]);

  return(
    <div
      className="transition-all duration-500 ease-in-out overflow-hidden max-h-0 w-full"
      ref={contentRef}            
     >
      <div className="relative flex flex-wrap gap-1 rounded-lg bg-white border border-slate-200 shadow-sm mt-1">
        {data?.map((item)=>{
          return(
            <NavButton item={item} key={item.title} dataNavBg={dataNavBg}/>
          )
        })}
      </div>
    </div>
  )
}

export const EachNav=({data, btnTitle, btnBg, dataNavBg}:{data:any[], btnTitle:string, btnBg:string, dataNavBg:string})=>{
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div className="h-min bg-transparent flex flex-col">
          <button  onClick={() => setIsOpen(!isOpen)} type="button" className={`${btnBg} cursor-pointer w-9/10 mx-auto p-3 rounded-md`}>{btnTitle}</button>
          <DetailInfo isOpen={isOpen} data={data} dataNavBg={dataNavBg}/>
      </div>
  )
}
