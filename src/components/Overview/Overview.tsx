
const overviewData=[
    {
        id:1,
        title:"Students",
        count:"1000+",
    },
    {
        id:2,
        title:"Teachers",
        count:"50+",
    },
    {
        id:3,
        title:"Stuffs",
        count:"20+",
    }
]
export const Overview=()=>{

    return(
        <div className="p-20 mt-10 flex justify-between items-center">
            {overviewData?.map((item)=>{
                return(
                    <div key={item.id} className="flex flex-col justify-center items-center gap-2 bg-linear-to-t from-sky-500 to-indigo-500 w-[300px] h-[300px] shadow-md transition hover:scale-105">
                        <h2 className="text-4xl">{item.count}</h2>
                        <span className="h-[3px] bg-orange-300 w-1/2"></span>
                        <h3 className="text-xl">{item.title}</h3>
                    </div>
                )
            })}

        </div>
    )
}