
export const EditButton=({
  onClick
}:{
  onClick:()=>void
})=>{
  return(
    <button onClick={onClick} className='px-3 py-1 bg-green-600 rounded-md text-white cursor-pointer'>Edit</button>
  )
}
export const DeleteButton=({onClick}:{onClick:()=>void})=>{
  return(
    <button onClick={onClick} className='px-3 py-1 bg-red-600 rounded-md text-white cursor-pointer'>Delete</button>
  )
}
export const AddButton=({onClick}:{onClick:()=>void})=>{
  return(
    <button onClick={onClick} className='px-5 py-2 bg-blue-600 rounded-md text-white cursor-pointer'>Add Student</button>
  )
}
export const Button=({onClick, title, type="primary"}:{onClick:()=>void, title:string, type?:string})=>{
    return(<button
    onClick={onClick}
     className={`px-5 py-2 ${type==='secondary'?'bg-gray-200 text-blue-600 border-1 border-blue-600':'bg-blue-600 text-white'} rounded-md cursor-pointer transition hover:scale-105`}
     >{title}</button>
    )
}