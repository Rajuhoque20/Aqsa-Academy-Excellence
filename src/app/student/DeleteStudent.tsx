import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));
type DeleteDTO={
  name:string,
  id:string|undefined
}
type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:DeleteDTO|null,
    getStudents:()=>void,
}
export default function DeleteStudent(
    {
        open,
        setOpen,
        deleteParam,
        getStudents,
    }:Props

){
    const deleteHandler=()=>{
        axios.delete(`/api/students?id=${deleteParam?.id}`)  
                .then(res=>{
                    if(res){
                         getStudents();
                         setOpen(false);
                         Notification.success("Student has been deleted successfully.")
                    }
                })
                .catch(error=>{
                    console.log(error);
                    Notification.error('Something went wrong');
                })
    }
    return(
         <Modal
             width='40vw'
              title={'Delete Student'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
               deleteHandler(); 
              }}
              footer={true}
              >
                <span className="text-center">Are you sure, you want to delete the student, <b>{deleteParam?.name}</b>?</span>
              </Modal>
    )
}