import { apiModelAdapter } from "@/adapter";
import { API_URL, API_URL_TERRIBLE } from "@/domain";

export async function getPodcast() {
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

export async function getPodcastTerrible() {
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
