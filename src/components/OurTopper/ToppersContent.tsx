import Image from "next/image";
import { Title } from "../Title";
type TopperDTO={
  image:string,
  marks:string,
  _id:string,
  name:string,
  class:string,
}
export default function ToppersContent({toppersData}:{toppersData:TopperDTO[]}){
    return(
         <div className='h-max text-black p-5 md:p-30 gap-5 flex flex-col mt-10 md:mt-0' id="toppers">
       <Title>OUR TOPPERS</Title>
      <div className='grid md:gap-20 gap-8 grid-cols-1 md:grid-cols-4 mt-8'>
        {toppersData?.map((item:TopperDTO)=>(
          <div className={`rounded-md flex flex-col items-center gap-3 transform transition hover:scale-105 topper-card-in`} key={item._id} >
            <div className='relative h-[220px] w-[220PX] mx-10'>
            <Image
              style={{boxShadow:'0px 0px 30px skyblue'}}
              className='rounded-full'
            alt={item?.image}
            src={item?.image}
            fill={true}
          
            />
            </div>
            <div className='flex mx-auto flex-col gap-2 items-center'>
            <div className='flex gap-5 items-center font-md' >
            <h1>{item.name}</h1>
            <span className='w-[10px] h-[10px] rounded-full bg-gray-600'></span>
            <p> {item.class}</p>
            </div>
            <p className='text-gray-600 text-xl font-bold'><span className='text-sm'>Marks:</span> {item.marks}</p>
            </div>
          </div>
        ))}

      </div>
     
    </div>
    )
}