'use client'
import React, { useState } from "react";
import { Button } from "../Button";
const NewStudentRegistration=React.lazy(()=>import('../newStudentRegistration/newStudentRegistration'));

export default function AdmissionButtion(){
       const [open,setOpen]=useState(false);
    return(
        <>
        <Button type='primary'  onClick={()=>setOpen(true)} title={<strong>ONLINE ADMISSION</strong>}/>
        {open&&<NewStudentRegistration open={open} setOpen={setOpen}/>}
        </>    
    )
}