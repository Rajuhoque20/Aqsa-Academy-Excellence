import { ChangeEvent } from "react"

export default function CheckBox({checked, onChange}:{checked:boolean, onChange:(e:ChangeEvent<HTMLInputElement>)=>void}){
  return(
    <input type='checkbox' className='w-[1rem] h-[1rem] accent-blue-600' onChange={onChange} checked={checked}/>
  )
}