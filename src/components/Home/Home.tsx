
import Image from "next/image"
import Carousel from "../Carousel/Carousel"
import Link from "next/link"
import  './Home.css'
import { TabCard } from "./TabCard"
const banners=[
    {
          img:'/bg_banner_1.jpg',
          alt:"banner1"
    },
    {
        img:'/bg_banner_2.jpg',
         alt:"banner2"
    },
    {
          img:'/bg_banner_3.jpg',
           alt:"banner3"
    }
];

const tabs=[
    {
        title:"News",
        id:'news',
        bg:'bg-red-700',
    },
     {
        title:"Our Toppers",
        id:'toppers',
        bg:'bg-blue-700',
    },
     {
        title:"Why Aqsa",
        id:'about',
        bg:'bg-gray-800',
    },
];

 

export const BannerHome=()=>{
    return(
        <div className="flex flex-col h-[92vh]  w-screen relative" id="home">
               <Carousel
               dataLength={banners?.length}
               RenderedItem={banners?.map((item)=>{
                    return(
                        <div className='relative min-w-full h-full flex-shrink-0' key={item.img}>            
                                <Image src={item.img} fill alt={item.alt} 
                                className="object-cover"                     
                                />
                        </div>
                    )
                })}
               />
                <div className='absolute w-full h-full'>   
                    <div className='w-full h-full home-banner-container z-4 relative p-10'>
                        <div className='flex items-center gap-5'>
                            <div className='w-14 h-14 relative rounded-full border-dashed border-white border-1'  >
                                    <Image src={'/aqsa_logo.jpg'} alt="aqsa_logo"  fill  className='rounded-full'/>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-3xl'>AQSA ACADEMY OF EXCELLENCE</span>
                                <span className='text-sm'> An Institute of Eminence (for Girls Students)</span>
                            </div>

                            <div className="flex flex-col self-end ml-auto location">
                                <span className="text-yellow-400 text-xl">Location</span>
                                <span>Takagach, Cooch Behar-736145</span>
                                
                                <Link className="text-blue-500 underline decoration-dotted" href='https://www.google.com/maps/place/Cooch+Behar+Rajbari+Park/@26.3281508,89.4361229,17z/data=!3m1!4b1!4m6!3m5!1s0x39e2fe811fc784f1:0xd8ba085180bfd037!8m2!3d26.328146!4d89.4386978!16s%2Fg%2F11fx8gllz6?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D'>View Map</Link>
                            </div>

                        </div>
                        <div className='absolute bottom-[-5rem] left-0 flex justify-center w-full h-[200px]'>
                            <div className='h-full flex gap-5'>
                                {tabs?.map(item=>{
                                    return(
                                        <TabCard item={item} key={item.id}/>
                                    )
                                })}
                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>       
    )
}