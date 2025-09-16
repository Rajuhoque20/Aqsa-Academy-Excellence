import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:{name:string, id:string},
    getTeachers:()=>void,
}
export default function DeleteTeacher(
    {
        open,
        setOpen,
        deleteParam,
        getTeachers,
    }:Props

){
    const deleteHandler=()=>{
        axios.delete(`/api/teacher?id=${deleteParam.id}`)  
                .then(res=>{
                    if(res){
                         getTeachers();
                         setOpen(false);
                         Notification.success('Teacher has been deleted');
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
              title={'Delete Teacher'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
               deleteHandler(); 
              }}
              footer={true}
              >
                <span className="text-center">Are you sure, you want to delete the Teacher, <b>{deleteParam?.name}</b>?</span>
              </Modal>
    )
}