// app/components/Gallery/GalleryClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "../Carousel/Carousel";
import { Title } from "../Title";

type EventDTO = {
  title: string;
  id: string;
  image: string;
  alt?: string;
  description?: string;
};

export function GalleryClient({ events }: { events: EventDTO[] }) {
  const [slides, setSlides] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const buildSlides = () => {
      const increment = window.innerWidth < 768 ? 1 : 3;
      const out: React.ReactNode[] = [];

      for (let i = 0; i < events.length; i += increment) {
        const chunk = events.slice(i, i + increment);
        out.push(
          <div key={`slide-${i}`} className="min-w-full h-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {chunk.map((event, idx) => (
              <div
                key={`${event.id}-${idx}`}
                className="p-5 flex flex-col gap-3 rounded-md"
                style={{ border: "1px solid rgba(0,0,0,0.2)" }}
              >
                <div className="relative h-[300px]">
                  <Image
                    src={event.image}
                    fill
                    alt={event.alt ?? event.title ?? "event image"}
                    className="rounded-md"
                    style={{ boxShadow: "0px 0px 15px rgba(0,0,0,0.5)" }}
                  />
                </div>
                <h2 className="text-gray-700 font-semibold">{event.title}</h2>
                <p className="text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        );
      }

      setSlides(out);
    };

    buildSlides();
    window.addEventListener("resize", buildSlides);
    return () => window.removeEventListener("resize", buildSlides);
  }, [events]);

  if (slides.length === 0) {
    // optional placeholder while first build runs
    return (
      <div className="w-full px-5">
        <Title>EVENTS</Title>
        <div className="py-10 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full md:px-30 px-5 md:gap-10 gap-5 flex flex-col mt-10 md:mt-0">
      <Title>EVENTS</Title>
      <Carousel dataLength={slides.length} RenderedItem={slides} />
    </div>
  );
}
