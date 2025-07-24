import Image from "next/image";
import Carousel from "../Carousel/Carousel"
const gallery=[
    {
        id:1,
        data:[
            {
                id:1,
                img:'/student1.jpg',
                alt:"banstudent1er1",
                title:"Republic day has been celebrated"
            },
             {
                id:2,
                img:'/student1.jpg',
                alt:"banstudent1er1",
                 title:"Republic day has been celebrated"
            },
             {
                id:3,
                img:'/student1.jpg',
                alt:"banstudent1er1",
                 title:"Republic day has been celebrated"
            },
        ]
          
    },
    {
        id:2,
        data:[
            {
                id:1,
                img:'/student2.jpg',
                alt:"banstudent2er1",
                 title:"Republic day has been celebrated"
            },
             {
                id:2,
                img:'/student2.jpg',
                alt:"banstudent2er1",
                 title:"Republic day has been celebrated"
            },
             {
                id:3,
                img:'/student2.jpg',
                alt:"banstudent2er1",
                 title:"Republic day has been celebrated"
            },
        ]
          
    },
    {
        id:3,
        data:[
            {
                id:1,
                img:'/contact.jpg',
                alt:"bancontacter1",
                 title:"Republic day has been celebrated"
            },
             {
                id:2,
                img:'/contact.jpg',
                alt:"bancontacter1",
                 title:"Republic day has been celebrated"
            },
             {
                id:3,
                img:'/contact.jpg',
                alt:"bancontacter1",
                 title:"Republic day has been celebrated"
            },
        ]
          
    },
];
export const Gallery=()=>{
    return(
        <div className="h-[70vh] w-full px-30 mb-30 gap-10 flex flex-col">
            <h1 className="text-5xl text-black">Gallery</h1>
             <Carousel
               dataLength={gallery?.length}
               RenderedItem={gallery?.map((item)=>{
                    return(
                        <div key={item.id} className='min-w-full h-full grid grid-cols-3 gap-8'> 
                        {
                            item?.data?.map(img=>{
                                return(
                                    <div key={img.id} className="shadow-md p-5 flex flex-col gap-3 bg-gray-200 rounded-md">
                                        <div className="relative h-[350px]">
                                            <Image src={img.img} fill alt={img.alt} />

                                        </div>
                                        <span className="text-gray-700">{img.title}</span>
                                    </div>
                                )
                            })
                        }                             
                        </div>
                    )
                })}
               />
        </div>
    )
}