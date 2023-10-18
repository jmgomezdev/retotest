import * as z from "zod";

export const API_URL =
  "https://tormenta-codigo-app-terrible.vercel.app/api/podcast";
export const API_URL_TERRIBLE =
  "https://tormenta-codigo-app-terrible.vercel.app/api/podcast/terrible";

export const podcastSchema = z.object({
  date: z.number(),
  description: z.string(),
  duration: z.string(),
  id: z.string(),
  name: z.string(),
  number: z.string(),
});

export type Podcast = z.infer<typeof podcastSchema>;
