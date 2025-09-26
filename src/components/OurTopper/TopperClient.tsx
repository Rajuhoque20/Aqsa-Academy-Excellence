'use client'
import React, { useEffect } from 'react'
import ToppersContent from './ToppersContent';

type TopperDTO={
  image:string,
  marks:string,
  _id:string,
  name:string,
  class:string,
}
export const ToppersClient = ({toppersData}:{toppersData:TopperDTO[]}) => {

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
       
          if (entry.isIntersecting) {
            entry.target.classList.add("topper-card-normal");
          } else {
            entry.target.classList.remove('topper-card-normal');
          }
        
      });
    },
  );

  // Get all valid elements
  const elements = document.querySelectorAll('.topper-card-in');
  elements.forEach((el) => observer.observe(el));
  return () => {
    elements.forEach((el) => observer.unobserve(el));
    observer.disconnect();
  };
}, [toppersData]);

  return (
   <ToppersContent toppersData={toppersData}/>
  )
}
