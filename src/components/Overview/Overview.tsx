'use client'
import { useEffect, useState } from "react";
import { useInView } from "../customHooks/useInView";
import { Title } from "../Title";
const limits = {
      student: 1000,
      teacher: 50,
      passing_ratio: 100,
    };
export const Overview = () => {
  const { ref, isVisible } = useInView({ threshold: 0.5 });

  

  const [count, setCount] = useState({
    student: 0,
    teacher: 0,
    passing_ratio: 0,
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
    { id: 1, title: "STUDENTS", count: count.student+'+' },
    { id: 2, title: "TEACHERS", count: count.teacher+'+' },
    { id: 3, title: "PASSING RATIO", count: count.passing_ratio+'%' },
  ];

  return (
    <div id="why_aqsa" className="p mb-20 flex flex-col justify-between border-1 overview-bg p-30">
     <Title>WHY CHOOSE AQSA?</Title>
            <ul className="text-gray-800 list-disc pl-5 gap-2 mt-10 flex flex-col">
                <li> Top-rated Mission in Cooch Behar, known for academic excellence.</li>
                <li> Modern classrooms equipped with smart learning tools.</li>
                <li> Expert faculty dedicated to nurturing young minds.</li>
                <li> Comprehensive extracurricular activities including arts, sports, and STEM learning.</li>
                <li> Convenient location for parents in and around Cooch Behar.</li>
            </ul>
            <p className="text-black mt-5">Join the growing community of parents choosing the best Mission in Cooch Behar for their children. Our streamlined admission process ensures a hassle-free experience. Seats are limited, so act now to secure your child’s future.</p>
          
    <div
      className="mt-10 px-20 flex justify-between items-center"
      ref={ref}
    >
      {overviewData.map((item) => (
        <div
          key={item.id}
          style={{boxShadow:"0px 0px 15px rgba(0,0,0,0.4)"}}
          className="flex flex-col justify-center items-center gap-2 bg-gradient-to-t from-sky-500 to-indigo-500 w-[300px] h-[300px] transition hover:scale-105 rounded-2xl"
        >
          <h2 className="text-4xl font-bold">{item.count}</h2>
          <span className="h-[3px] bg-orange-300 w-1/2"></span>
          <strong>{item.title}</strong>
        </div>
      ))}
    </div>
      </div>
  );
};
