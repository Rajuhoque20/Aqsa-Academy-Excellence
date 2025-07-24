import Image from 'next/image'
import React from 'react'

const toppers_12=[
  {
    id:1,
    name:"Mimtaj Aktar",
    marks:"444",
    img:'/student1.jpg',
  },
  {
    id:2,
    name:"Muskan Aktar",
    marks:"454",
    img:'/student1.jpg',
  },
  {
    id:3,
    name:"Bullbuli",
    marks:"464",
    img:'/student1.jpg',
  },
  {
    id:4,
    name:"Chumki Parveen",
    marks:"444",
    img:'/student1.jpg',
  },
  {
    id:5,
    name:"Mimtaj Aktar",
    marks:"444",
    img:'/student1.jpg',
  },
  {
    id:6,
    name:"Mimtaj Aktar",
    marks:"444",
    img:'/student1.jpg',
  },
  // {
  //   id:7,
  //   name:"Mimtaj Aktar",
  //   marks:"444",
  //   img:'/student1.jpg',
  // },
];

const toppers_10=[
  {
    id:1,
    name:"Mimtaj Aktar",
    marks:"672",
    img:'/student2.jpg',
  },
  {
    id:2,
    name:"Muskan Aktar",
    marks:"650",
    img:'/student2.jpg',
  },
  {
    id:3,
    name:"Bullbuli",
    marks:"652",
    img:'/student2.jpg',
  },
  {
    id:4,
    name:"Chumki Parveen",
    marks:"620",
    img:'/student2.jpg',
  },
  {
    id:5,
    name:"Mimtaj Aktar",
    marks:"615",
    img:'/student2.jpg',
  },
  {
    id:6,
    name:"Mimtaj Aktar",
    marks:"600",
    img:'/student2.jpg',
  },
]

export const OurTopper = () => {
  return (
    <div className='h-max text-black p-30 gap-5 flex flex-col'>
      <h1 className='text-5xl mt-10'>Our Toppers</h1>
      <h2 className='text-3xl mt-5'>Class XII (2024)</h2>
      <div className='grid gap-8 grid-cols-3 '>
        {toppers_12?.map((item)=>(
          <div className='p-5 bg-gray-200 rounded-md shadow-sm transform transition hover:scale-105' key={item.id}>
            <div className='relative h-[300px]'>
            <Image
            alt={item?.img}
            src={item?.img}
            fill={true}
            objectFit='cover'
            />
            </div>
            <h1 >{item.name}</h1>
            <span className='text-gray-600 text-sm'>Marks: {item.marks}</span>
          </div>
        ))}

      </div>


      <h2 className='text-3xl mt-5'>Class X (2024)</h2>
      <div className='grid gap-5 grid-cols-3'>
        {toppers_10?.map((item)=>(
          <div className='p-5 bg-gray-200 rounded-md shadow-sm transform transition hover:scale-105' key={item.id}>
            <div className='relative h-[300px]'>
            <Image
            alt={item?.img}
            src={item?.img}
            fill={true}
            objectFit='cover'
            style={{objectFit:"fill"}}
            />
            </div>
            <h1 >{item.name}</h1>
            <span className='text-gray-600 text-sm'>Marks: {item.marks}</span>
          </div>
        ))}

      </div>
    </div>
  )
}
