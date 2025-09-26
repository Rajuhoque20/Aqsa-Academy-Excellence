import Image from "next/image";
import Carousel from "../Carousel/Carousel";
import { Title } from "../Title";

type EventDTO = {
  title: string;
  id: string;
  image: string;
  alt: string;
  description: string;
};

// Server component (no 'use client')
export const Gallery = async () => {
  // Fetch event data from API or database directly
  // If fetching from database, replace the fetch with your DB query
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/event`);
  const events: EventDTO[] = await res.json();

  // Chunk the events into groups of 3
  const gallery = [];
  for (let i = 0; i < events.length; i += 3) {
    const chunk = events.slice(i, i + 3);
    gallery.push({
      id: gallery.length + 1,
      data: chunk.map((event, idx) => ({
        id: idx + 1,
        img: event.image,
        alt: event.title || "event image",
        description: event.description,
        title: event.title,
      })),
    });
  }

  return (
    <div className="w-full px-30 gap-10 flex flex-col">
      <Title>EVENTS</Title>
      <Carousel
        dataLength={gallery.length}
        RenderedItem={gallery.map((item) => (
          <div key={item.id} className="min-w-full h-full grid grid-cols-3 gap-8">
            {item.data.map((img) => (
              <div
                key={img.id}
                className="p-5 flex flex-col gap-3 rounded-md"
                style={{ border: "1px solid rgba(0,0,0,0.2)" }}
              >
                <div className="relative h-[300px]">
                  <Image
                    src={img.img}
                    fill
                    alt={img.alt}
                    className="rounded-md"
                    style={{ boxShadow: "0px 0px 15px rgba(0,0,0,0.5)" }}
                  />
                </div>
                <h2 className="text-gray-700 font-semibold">{img.title}</h2>
                <p className="text-gray-700">{img.description}</p>
              </div>
            ))}
          </div>
        ))}
      />
    </div>
  );
};
