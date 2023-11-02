import { apiModelAdapter } from "@/adapter";
import {
  API_URL,
  API_URL_TERRIBLE,
  FILE_CACHE,
  Output,
  Podcast,
} from "@/domain";

export async function getPodcast(): Promise<Podcast[] | []> {
  try {
    const response = await fetch(API_URL);
    const responseData = await response.json();
    const mapperData = responseData?.data?.map((episode: any) =>
      apiModelAdapter(episode)
    );
    return mapperData;
  } catch (error) {
    console.error("Error fetching the episodes:", error);
    return [];
  }
}

export async function getPodcastTerrible(): Promise<Podcast[] | []> {
  try {
    const response = await fetch(API_URL_TERRIBLE);
    const responseData = await response.json();
    const mapperData = responseData?.data?.map((episode: any) =>
      apiModelAdapter(episode)
    );
    return mapperData;
  } catch (error) {
    console.error("Error fetching the episodes:", error);
    return [];
  }
}

export async function getLastResult(): Promise<Output | null> {
  const file = Bun.file(FILE_CACHE);
  const fileContent = await file.text();
  return JSON.parse(fileContent ?? "{}");
}

export async function saveResult(result: Output) {
  const data = JSON.stringify(result ?? {});
  Bun.write(FILE_CACHE, data);
}
