import { ReactNode } from "react"

export const Title=({children}:{children:ReactNode})=>{
    return(
        <h1 className="text-black text-3xl font-semibold">{children}</h1>
    )
}