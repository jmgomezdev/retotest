import { Podcast } from "@/domain";

export function apiModelAdapter(episode: any): Podcast {
  return {
    date: episode?.published_at,
    description: episode?.excerpt,
    duration: episode?.duration,
    id: episode?.id,
    name: episode?.title,
    number: episode?.number,
  };
}
