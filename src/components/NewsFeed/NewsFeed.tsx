
import { Title } from "../Title";

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
type NewsDTO={
  title:string,
  date:string,
  file:string,
}
export const NewsFeed=async()=>{
    const res=await fetch(`${process.env.NEXTAUTH_URL}/api/notice`);
    const newsFeed=await res.json();
    return(
        <div className="text-gray-500 mt-30 px-30 gap-10 flex flex-col" id="news">
            <Title>NOTICE & IMPORTANT LINKS</Title>
            <div className="grid grid-cols-2 flex-col gap-5">
                {newsFeed?.map((item:NewsDTO,index:number)=>{
                    const format=item?.date?.split('-');
                    const day=format?.[2];
                   const month = monthsMap[format?.[1] as MonthNumber];
                     const year=format?.[0];
                    return(
                        <div key={index} style={{boxShadow:'0px 0px 15px rgba(0,0,0,0.2)'}} className="bg-white p-5 rounded-md flex gap-2 items-center transition hover:scale-105">
                            <div className="p-5 flex flex-col items-center bg-gray-800 text-white w-1/4 justify-center"  style={{clipPath: 'circle(55%)'}}>
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