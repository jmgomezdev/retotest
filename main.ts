import { Output, podcastSchema } from "@/domain";
import {
  getLastResult,
  getPodcast,
  getPodcastTerrible,
  saveResult,
} from "@/service";
import {
  getNextPodcast,
  getShortestEpisode,
  getTitles,
  getTotalDuration,
} from "@/utils";

async function main() {
  const podcast = await getPodcast();
  // const podcast = await getPodcastTerrible();
  const checkPodcast = podcast.every((episode) => {
    return podcastSchema.safeParse(episode).success;
  });
  if (!checkPodcast) {
    console.log("😉");
    return getLastResult();
  }
  const podcastParsed = podcast.map((episode) => {
    return podcastSchema.parse(episode);
  });
  const result: Output = {
    nextEpisode: getNextPodcast(podcastParsed),
    sumDuration: getTotalDuration(podcastParsed),
    minDuration: getShortestEpisode(podcastParsed),
    titlesAleatory: getTitles(podcastParsed),
  };
  saveResult(result);
  return result;
}

main().then((result) => {
  console.log(result);
});
