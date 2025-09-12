'use client'
import { useEffect, useState } from "react";
import { useInView } from "../customHooks/useInView";
const limits = {
      student: 1000,
      teacher: 50,
      stuff: 20,
    };
export const Overview = () => {
  const { ref, isVisible } = useInView({ threshold: 0.5 });

  

  const [count, setCount] = useState({
    student: 0,
    teacher: 0,
    stuff: 0,
  });

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000;

    const intervals = Object.keys(limits).map((key) => {
      const stepTime = duration / limits[key as keyof typeof limits];
      return setInterval(() => {
        setCount((prev) => {
          const current = prev[key as keyof typeof prev];
          const max = limits[key as keyof typeof limits];
          if (current < max) {
            return { ...prev, [key]: current + 1 };
          }
          return prev;
        });
      }, stepTime);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible]);

  const overviewData = [
    { id: 1, title: "Students", count: count.student },
    { id: 2, title: "Teachers", count: count.teacher },
    { id: 3, title: "Stuffs", count: count.stuff },
  ];

  return (
    <div
      className="p-20 mt-10 flex justify-between items-center"
      ref={ref}
    >
      {overviewData.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-center items-center gap-2 bg-gradient-to-t from-sky-500 to-indigo-500 w-[300px] h-[300px] shadow-md transition hover:scale-105 rounded-2xl"
        >
          <h2 className="text-4xl font-bold">{item.count+' +'}</h2>
          <span className="h-[3px] bg-orange-300 w-1/2"></span>
          <h3 className="text-xl">{item.title}</h3>
        </div>
      ))}
    </div>
  );
};
