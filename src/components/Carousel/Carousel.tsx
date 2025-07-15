import Image from 'next/image'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

const banners=[
    {
          img:'/bg_banner_1.jpg',
          alt:"banner1"
    },
    {
        img:'/bg_banner_2.jpg',
         alt:"banner2"
    },
    {
          img:'/bg_banner_3.jpg',
           alt:"banner3"
    }
];

const Carousel = () => {
    const [carouIndex, setCarouIndex]=useState(0);
    const listRef=useRef<HTMLDivElement>(null);
    const handleIncrement=()=>{
          if(banners?.length>carouIndex+1){
        setCarouIndex(prev=>{
            scrolltoView(prev+1);
             return prev+1})
    } 
    else{
        setCarouIndex(0);
        scrolltoView(0);
    }
}
const handleDecrement=()=>{
    if(carouIndex>0){
        setCarouIndex(prev=>{
            scrolltoView(prev-1);
            return prev-1
        })
    }
    else{
        scrolltoView(banners.length-1);
        setCarouIndex(banners.length-1);
    } 
}

const scrolltoView=(index:number)=>{
   
    const listNode=listRef.current;
    const imgNode=listNode?.children[index] as HTMLElement | undefined;
    console.log("imgNode",imgNode)
    imgNode?.scrollIntoView({
        behavior:"smooth",
        block:"nearest",
        inline:"center",
    })
}

useEffect(()=>{
    const interval=setInterval(()=>{
        handleIncrement();
    },5000)
    return()=>{
        clearInterval(interval);
    }
},[carouIndex])

  return (
    <div className='relative h-full w-full ' >
         <button className="absolute left-15 top-1/2 transform -translate-y-1/2 bg-gray-500 cursor-pointer text-white w-[3.5rem] h-[3.5rem] z-10 rounded-full" onClick={handleDecrement}>{'<'}</button>
         <div
        className="flex w-[99vw] h-full overflow-hidden scroll-smooth snap-x snap-mandatory box-border"
        ref={listRef}
      >
        {banners?.map((item)=>{
            return(
                <div className='relative min-w-full h-full flex-shrink-0' key={item.img}>            
                        <Image src={item.img} fill alt={item.alt} 
                        className="object-cover"
                        // priority={index === 0}
                        />
                </div>
            )
        })}
        </div>
         <button className="absolute right-15 top-1/2 cursor-pointer transform -translate-y-1/2 bg-gray-500 text-white w-[3.5rem] h-[3.5rem] z-10 rounded-full"
         onClick={handleIncrement}
         >{'>'}</button>
    </div>
  )
}

export default Carousel