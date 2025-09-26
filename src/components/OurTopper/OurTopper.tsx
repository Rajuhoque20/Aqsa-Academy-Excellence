

import React from 'react'

import { ToppersClient } from './TopperClient';

export const OurTopper = async() => {
  const resp=await fetch(`${process.env.NEXTAUTH_URL}/api/topper`)
  const toppersData=await resp.json();

  return (
   <ToppersClient toppersData={toppersData}/>
  )
}
