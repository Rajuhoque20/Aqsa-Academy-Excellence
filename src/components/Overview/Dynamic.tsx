'use client';
import { useEffect, useState, useRef } from "react";
import { useInView } from "../customHooks/useInView";
import OverviewCard from "./OverviewCard";

type CardId = "1" | "2" | "3";

const limits = {
  student: 1000,
  teacher: 50,
  passing_ratio: 100,
};

const cardClasses: Record<CardId, string> = {
  "1": "bottom-in",
  "2": "left-in",
  "3": "right-in",
};

export default function DynamicOverview() {
  const { ref, isVisible } = useInView({ threshold: 0.5 });
  const [count, setCount] = useState({ student: 0, teacher: 0, passing_ratio: 0 });
  const cardsRef = useRef<Record<CardId, HTMLElement | null>>({ "1": null, "2": null, "3": null });

  // Count animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      setCount({
        student: Math.floor(progress * limits.student),
        teacher: Math.floor(progress * limits.teacher),
        passing_ratio: Math.floor(progress * limits.passing_ratio),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  // Add/remove active classes using single observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
        else entry.target.classList.remove("active");
      });
    });

    const cards=cardsRef.current;

    (Object.keys(cardClasses) as CardId[]).forEach((id) => {
      const el = document.getElementById(id);
     cards[id] = el;
      if (el) observer.observe(el);
    });

    return () => {
      Object.values(cards).forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const overviewData = [
    { id: "1", class: "left-in", title: "STUDENTS", count: `${count.student}+` },
    { id: "2", class: "bottom-in", title: "TEACHERS", count: `${count.teacher}+` },
    { id: "3", class: "right-in", title: "PASSING RATIO", count: `${count.passing_ratio}%` },
  ];

  return (
    <div className="mt-10 px-20 flex justify-between items-center" ref={ref}>
      {overviewData.map((item) => (
        <OverviewCard key={item.id} id={item.id} title={item.title} count={item.count} cssClass={item.class}/>
      ))}
    </div>
  );
}
