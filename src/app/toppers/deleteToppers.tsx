import axios from "axios";
import { useState } from "react";
import { Modal } from "src/components/modal/Modal";

type Props={
    open:boolean,
    setOpen:(val:boolean)=>void,
    deleteParam:{name:string, id:string},
    getToppers:()=>void,
}
export const DeleteTopper=(
    {
        open,
        setOpen,
        deleteParam,
        getToppers,
    }:Props

)=>{
     const [loading, setLoading]=useState<boolean>(false);
    const deleteHandler=()=>{
        if (loading) return;
        setLoading(true);
        axios.delete(`/api/topper?id=${deleteParam.id}`) 
                .then(res=>{
                    if(res){
                         getToppers();
                         setOpen(false);
                         setLoading(false);
                    }
                })
                .catch(error=>{
                    console.log(error)
                    setLoading(false);
                })
    }
    return(
         <Modal
             width='40vw'
              title={'Delete Topper'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
               deleteHandler(); 
              }}
              footer={true}
              okButtonProps={{disabled:loading}}
              okText={loading?"Deleting...":"Confirm"}
              >
                <span className="text-center">Are you sure, you want to delete the Topper, <b>{deleteParam?.name}</b>?</span>
       </Modal>
    )
}