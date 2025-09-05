'use client'
import axios from "axios";
import { useEffect, useState } from "react";

type MonthNumber =
  '01' | '02' | '03' | '04' | '05' | '06' |
  '07' | '08' | '09' | '10' | '11' | '12';

const monthsMap: Record<MonthNumber, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'Aug',
  '09': 'Sept',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};
export const NewsFeed=()=>{
    const [newsFeed,setNewsFeed]=useState([]);

    const getNotice=()=>{
     axios.get('/api/notice')
    .then(res=>{
      if(res){
        setNewsFeed(res?.data);
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{
   getNotice();
  },[]);
    return(
        <div className="text-gray-500 mt-50 px-30 gap-10 flex flex-col">
            <h1 className="text-black text-5xl">
                Notice & Important Links
            </h1>
            <div className="grid grid-cols-2 flex-col gap-5">
                {newsFeed?.map((item:any,index)=>{
                    const format=item?.date?.split('-');
                    const day=format?.[2];
                   const month = monthsMap[format?.[1] as MonthNumber];
                     const year=format?.[0];
                    return(
                        <div key={index} className="bg-white p-5 rounded-md shadow-md flex gap-2 items-center transition hover:scale-105">
                            <div className="p-5 flex flex-col items-center bg-gray-800 text-white w-1/4 justify-center">
                                <h3>{day}</h3>
                                <span>{month+", "+year}</span>
                            </div>
                            <div className="w-3/4">
                                <span>
                                    {item?.title}
                                    {item?.file? <a href={`${item?.file}`} className="text-blue-700 ml-3">Link</a>:
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