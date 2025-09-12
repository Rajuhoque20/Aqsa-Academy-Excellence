import { useEffect, useRef, useState } from "react";

export function useInView(options?:IntersectionObserverInit){
    const ref=useRef<HTMLDivElement|null>(null);
    const [isVisible, setIsVisible]=useState(false);

    useEffect(()=>{
        const element=ref.current;
        if(!element)
        {
            return;
        }
        const observer=new IntersectionObserver(([entry])=>{
            
                setIsVisible(entry.isIntersecting);
            
        },options);

        observer.observe(element);

        return()=>{
            if(element)
            {
                 observer.unobserve(element);
            }
        }
    },[options])

    return {ref, isVisible}
}