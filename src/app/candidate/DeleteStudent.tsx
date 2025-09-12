import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "src/components/modal/Modal";

type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:{name:string, id:string},
    getStudents:()=>void,
}
export const DeleteStudent=(
    {
        open,
        setOpen,
        deleteParam,
        getStudents,
    }:Props

)=>{
    const deleteHandler=()=>{
        axios.delete(`/api/students?id=${deleteParam.id}`)  
                .then(res=>{
                    if(res){
                         getStudents();
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