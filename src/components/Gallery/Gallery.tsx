// app/components/Gallery/Gallery.tsx
import { GalleryClient } from "./GalleryClient";

type EventDTO = {
  title: string;
  id: string;
  image: string;
  alt?: string;
  description?: string;
};

export const Gallery = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/event`, { cache: "no-store" });
  const events: EventDTO[] = await res.json();

  return <GalleryClient events={events} />;
};
