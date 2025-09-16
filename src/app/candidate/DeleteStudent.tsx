import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:{name:string, id:string},
    getCandidates:()=>void,
}
export const DeleteStudent=(
    {
        open,
        setOpen,
        deleteParam,
        getCandidates,
    }:Props

)=>{
    const deleteHandler=()=>{
        axios.delete(`/api/newStudentRegistration?id=${deleteParam.id}`)  
                .then(res=>{
                    if(res){
                        Notification.success('Candidate has been deleted')
                         getCandidates();
                         setOpen(false);
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
                <span className="text-center">Are you sure, you want to delete the Candidate, <b>{deleteParam?.name}</b>?</span>
              </Modal>
    )
}