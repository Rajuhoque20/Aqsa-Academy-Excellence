import Link from "next/link";

const notices=[
    {
        type:"Link",
        title:`Class 12 second Semester exam will start from 15th Sept, 2025.
        Check the Exam Shedule here.
        `,
        date:'July 22 25'
    }
    ,
     {
        type:"notice",
        title:'Summer holiday will start from 16th June, 2025 and institute will reopen from 2nd July 2025',
        date:'July 22 25'
    }
    ,
     {
        type:"Link",
        title:`Class 12 second Semester exam will start from 15th Sept, 2025.
        Check the Exam Shedule here.
        `,
        date:'July 22 25'
    },
     {
        type:"Link",
        title:`Class 12 second Semester exam will start from 15th Sept, 2025.
        Check the Exam Shedule here.
        `,
        date:'July 22 25'
    },
     {
        type:"Link",
        title:`Class 12 second Semester exam will start from 15th Sept, 2025.
        Check the Exam Shedule here.
        `,
        date:'July 22 25'
    },
     {
        type:"Link",
        title:`Class 12 second Semester exam will start from 15th Sept, 2025.
        Check the Exam Shedule here.
        `,
        date:'July 22 25'
    },
     {
        type:"Link",
        title:`Class 12 second Semester exam will start from 15th Sept, 2025.
        Check the Exam Shedule here.
        `,
        date:'July 22 25'
    },
     {
        type:"Link",
        title:`Class 12 second Semester exam will start from 15th Sept, 2025.
        Check the Exam Shedule here.
        `,
        date:'July 22 25'
    },
    
]

export const NewsFeed=()=>{
    return(
        <div className="text-gray-500 mt-50 px-30 gap-10 flex flex-col">
            <h1 className="text-black text-5xl">
                Notice & Important Links
            </h1>
            <div className="bg-gray-200 p-10 grid grid-cols-2 flex-col gap-5">
                {notices?.map((item,index)=>{
                    let day=item?.date?.split(' ')?.[1];
                    let month=item?.date?.split(' ')?.[0];
                    let year=item?.date?.split(' ')?.[2];
                    return(
                        <div key={index} className="bg-white p-5 rounded-md shadow-md flex gap-2 items-center transition hover:scale-105">
                            <div className="p-5 flex flex-col items-center bg-gray-800 text-white w-1/4 justify-center">
                                <h3>{day}</h3>
                                <span>{month+" "+year}</span>
                            </div>
                            <div>
                                <span>
                                    {item?.title}
                                    {item?.type==="Link"? <Link href={'https://wwww.pdf'} className="text-blue-700"></Link>:
                                    <span className="text-red-700 ml-3">New</span>
                                    }

                                </span>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}