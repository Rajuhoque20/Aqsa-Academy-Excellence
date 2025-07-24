"use client";
import Image from 'next/image';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

const Carousel = ({RenderedItem, dataLength}:{RenderedItem:ReactNode, dataLength:number}) => {
    const [carouIndex, setCarouIndex]=useState(0);
    const listRef=useRef<HTMLDivElement>(null);
    const containerRef=useRef<HTMLDivElement>(null);
    const [inView, setInView]=useState(false);
    const handleIncrement=()=>{
          if(dataLength>carouIndex+1){
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
        scrolltoView(dataLength-1);
        setCarouIndex(dataLength-1);
    } 
}

const scrolltoView=(index:number)=>{
   
    const listNode=listRef.current;
    const imgNode=listNode?.children[index] as HTMLElement | undefined;
    imgNode?.scrollIntoView({
        behavior:"smooth",
        block:"nearest",
        inline:"center",
    })
}

useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{
        setInView(entry.isIntersecting);
    },{
        threshold:0.8
    })

    if(containerRef.current){
        observer.observe(containerRef.current)
    }
    return ()=>{
        if(containerRef.current){
        observer.unobserve(containerRef.current)
    }
    }
},[])


useEffect(()=>{
    if(!inView){
        return;
    }
    const interval=setInterval(()=>{
        handleIncrement();
    },5000)
    return()=>{
        clearInterval(interval);
    }
},[carouIndex, inView])

  return (
    <div className='relative h-full flex w-full'  ref={containerRef}>
         <button className="absolute left-15 top-1/2 transform -translate-y-1/2 bg-gray-500 cursor-pointer text-white w-[3.5rem] h-[3.5rem] z-10 rounded-full" onClick={handleDecrement}>{'<'}</button>
         <div
        className="flex w-[99vw] h-full overflow-hidden scroll-smooth snap-x snap-mandatory box-border"
        ref={listRef}
      >
        {RenderedItem}
        </div>
         <button className="absolute right-15 top-1/2 cursor-pointer transform -translate-y-1/2 bg-gray-500 text-white w-[3.5rem] h-[3.5rem] z-10 rounded-full"
         onClick={handleIncrement}
         >{'>'}</button>
    </div>
  )
}

export default Carousel