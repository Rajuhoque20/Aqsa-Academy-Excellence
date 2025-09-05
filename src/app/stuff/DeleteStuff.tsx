import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "src/components/modal/Modal";

type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:{name:string, id:string},
    getStuff:()=>void,
}
export const DeleteStuff=(
    {
        open,
        setOpen,
        deleteParam,
        getStuff,
    }:Props

)=>{
    const deleteHandler=()=>{
        axios.delete(`/api/stuff?id=${deleteParam.id}`)  
                .then(res=>{
                    if(res){
                         getStuff();
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
              title={'Delete Stuff'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
               deleteHandler(); 
              }}
              footer={true}
              >
                <span className="text-center">Are you sure, you want to delete the stuff, <b>{deleteParam?.name}</b>?</span>
              </Modal>
    )
}