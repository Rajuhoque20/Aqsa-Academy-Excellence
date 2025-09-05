import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "src/components/modal/Modal";

type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:{name:string, id:string},
    getManagingUsers:()=>void,
}
export const DeleteManagingUser=(
    {
        open,
        setOpen,
        deleteParam,
        getManagingUsers,
    }:Props

)=>{
    const deleteHandler=()=>{
        axios.delete(`/api/managingUser?id=${deleteParam.id}`)  
                .then(res=>{
                    if(res){
                         getManagingUsers();
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
              title={'Delete Managing User'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
               deleteHandler(); 
              }}
              footer={true}
              >
                <span className="text-center">Are you sure, you want to delete the Managing User, <b>{deleteParam?.name}</b>?</span>
              </Modal>
    )
}