
import React from 'react'
import './Header.css';
import { useSession } from 'next-auth/react';
import HeaderClient from './HeaderClient';

export default function Header() {
const {data}=useSession();
  return (
    <HeaderClient data={{name:data?.user?.name||''}}/>
  )
}
