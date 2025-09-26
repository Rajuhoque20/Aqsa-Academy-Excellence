
type Props={
    id:string,
    count:string,
    title:string,
    cssClass:string,
}
export default function OverviewCard({id, count, title, cssClass}:Props){

    return(
        <div
          id={id}
          className={`flex flex-col justify-center items-center gap-2 bg-gradient-to-t from-sky-500 to-indigo-500 w-[300px] h-[300px] transition hover:scale-105 rounded-2xl ${cssClass}`}
        >
          <h2 className="text-4xl font-bold">{count}</h2>
          <span className="h-[3px] bg-orange-300 w-1/2"></span>
          <strong>{title}</strong>
        </div>
    )
}