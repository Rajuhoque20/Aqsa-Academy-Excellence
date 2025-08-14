import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "src/components/modal/Modal";

type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:{name:string, id:string},
    getTeachers:()=>void,
}
export const DeleteTeacher=(
    {
        open,
        setOpen,
        deleteParam,
        getTeachers,
    }:Props

)=>{
    const deleteHandler=()=>{
        axios.delete(`/api/teacher?id=${deleteParam.id}`)  
                .then(res=>{
                    if(res){
                         getTeachers();
                         setOpen(false);
                    }
                })
                .catch(error=>{
                    console.log(error)
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