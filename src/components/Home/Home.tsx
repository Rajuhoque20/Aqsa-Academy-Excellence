
import Image from "next/image"
import Carousel from "../Carousel/Carousel"
import Link from "next/link"
import  './Home.css'
import { TabCard } from "./TabCard"
import { FaNewspaper, FaStar, FaUserGraduate, FaMapMarkerAlt  } from "react-icons/fa";

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
        icon:<FaNewspaper size={40}/>
    },
     {
        title:"Our Toppers",
        id:'toppers',
        bg:'bg-blue-700',
        icon:<FaUserGraduate size={40}/>
    },
     {
        title:"Why Aqsa",
        id:'why_aqsa',
        bg:'bg-gray-800',
        icon:<FaStar size={40}/>
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
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-3xl font-semibold'>AQSA ACADEMY OF EXCELLENCE</h1>
                                <small className='text-sm'> An Institute of Eminence ( for Girls Students )</small>
                            </div>

                            <div className="flex flex-col self-end ml-auto gap-2">
                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt size={30}/>
                                     <span className="text-yellow-400 text-xl"
                                     style={{ textShadow: "2px 4px 8px rgba(0,0,0,0.8)" }}
                                     >Location:</span>
                                </div>                              
                                <span className="text-green-200"
                                  style={{ textShadow: "2px 4px 8px rgba(0,0,0,0.8)" }}
                                >Takagach, Cooch Behar-736145</span>
                                
                                <Link style={{ textShadow: "2px 4px 8px rgba(0,0,0,0.8)" }} className="text-blue-500 underline decoration-dotted hover:scale-110 transition" href='https://www.google.com/maps/place/Cooch+Behar+Rajbari+Park/@26.3281508,89.4361229,17z/data=!3m1!4b1!4m6!3m5!1s0x39e2fe811fc784f1:0xd8ba085180bfd037!8m2!3d26.328146!4d89.4386978!16s%2Fg%2F11fx8gllz6?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D'>View Map</Link>
                            </div>

                        </div>
                        <div className='absolute bottom-[-1rem] left-0 flex justify-center w-full h-[150px]'>
                            <div className='h-full flex'>
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