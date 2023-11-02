import * as z from "zod";

export const API_URL =
  "https://tormenta-codigo-app-terrible.vercel.app/api/podcast";
export const API_URL_TERRIBLE =
  "https://tormenta-codigo-app-terrible.vercel.app/api/podcast/terrible";
export const FILE_CACHE = "src/data/result.json";

export const podcastSchema = z.object({
  date: z.number(),
  description: z.string(),
  duration: z.coerce.number().int(),
  id: z.string(),
  name: z.string(),
  number: z.coerce.number().int(),
});

export type Podcast = z.infer<typeof podcastSchema>;

export type Output = {
  nextEpisode: number;
  sumDuration: number;
  minDuration: number;
  titlesAleatory: string[];
};
