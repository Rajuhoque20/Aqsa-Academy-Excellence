import { Dispatch, SetStateAction } from "react";
import { Modal } from "src/components/modal/Modal";

type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
}
export const DeleteStudent=(
    {
        open,
        setOpen
    }:Props

)=>{
    return(
         <Modal
             width='40vw'
              title={'Delete Student'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
                setOpen(false);  
              }}
              footer={true}
              >
                <span className="text-center">Are you sure, you want to delete this student?</span>
              </Modal>
    )
}