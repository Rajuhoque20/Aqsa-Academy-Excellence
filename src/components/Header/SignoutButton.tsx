
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
export default function SignoutButton(){
    return(
         <button onClick={()=>{
          signOut({ callbackUrl: "/" })

        }} className='p-2 rounded-full color-white bg-red-600 cursor-pointer'>
          <LogOut/>
        </button>
    )
}