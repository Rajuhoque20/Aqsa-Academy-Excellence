const EditButton=()=>{
  return(
    <button className='px-3 py-1 bg-green-600 rounded-md text-white cursor-pointer'>Edit</button>
  )
}
const DeleteButton=()=>{
  return(
    <button className='px-3 py-1 bg-red-600 rounded-md text-white cursor-pointer'>Delete</button>
  )
}
const AddButton=()=>{
  return(
    <button className='px-5 py-2 bg-blue-600 rounded-md text-white cursor-pointer'>Add Student</button>
  )
}
export const Button=({onClick, title, type="primary"}:{onClick:()=>{}, title:string, type?:string})=>{
    return(<button
    onClick={onClick}
     className='px-5 py-2 bg-blue-600 rounded-md text-white cursor-pointer'
     >{title}</button>
    )
}