import { Dispatch, SetStateAction } from "react";
import { Button } from "src/components/Button";
import { Modal } from "src/components/modal/Modal";

type Props={
    open:boolean,
    type:string,
    setOpen:Dispatch<SetStateAction<boolean>>,
}

export const AddStudentModal=({
    open,
    type,
    setOpen
}:Props
)=>{
  return(
    <>
     <Modal
     width='40vw'
      title={type==='edit'?'Edit Student':"Add Student"}
      open={open}
      onCancel={()=>{setOpen(false)}}
      onOk={()=>{
        setOpen(false);  
      }}
      footer={false}
      >
       <div className="flex flex-col gap-10 ">
            <form className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Name</label>
                    <input required name="name" type="text" placeholder="Enter your name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Email</label>
                    <input required name="name" type="text" placeholder="Enter your email" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Phone</label>
                    <input required name="name" type="text" placeholder="Enter your phone number" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Father's Name</label>
                    <input required name="name" type="text" placeholder="Enter your father's name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Mother's Name</label>
                    <input required name="name" type="text" placeholder="Enter your mother's name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Address</label>
                    <input required name="name" type="text" placeholder="Enter your address" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Marks (percentage or CGPA)</label>
                    <input required name="name" type="text" placeholder="Enter your marks" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">School</label>
                    <input required name="name" type="text" placeholder="Enter your previous school" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Class (Current)</label>
                    <input required name="name" type="text" placeholder="Enter V,VII, XI etc" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Uplaod Marksheet</label>
                    <input required name="marksheet" type="file" placeholder="Enter your name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex justify-center gap-5 item-center">
                    <button className="bg-blue-600 px-5 py-2 text-white transition hover:scale-105 cursor-pointer rounded-md">{type==='edit'?'Save':'Submit'}</button>
                    <Button type="secondary" title="Cancel" onClick={()=>setOpen(false)}/>
                </div>             
            </form>          
        </div>
      </Modal>
    </>
  )
}
