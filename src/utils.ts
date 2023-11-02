import { Podcast } from "./domain";

export function getNextPodcast(podcasts: Podcast[]): number {
  const maxNumber = podcasts.reduce(
    (maxId, obj) => Math.max(maxId, obj.number),
    -1
  );
  return maxNumber + 1;
}

export function getTotalDuration(podcasts: Podcast[]): number {
  return podcasts.reduce((sum, podcast) => sum + podcast.duration, 0);
}

export function getShortestEpisode(podcasts: Podcast[]): number {
  return podcasts.reduce(
    (shortest, podcast) =>
      podcast.duration < shortest ? podcast.duration : shortest,
    Infinity
  );
}

export function getTitles(podcasts: Podcast[]): string[] {
  const shuffledPodcasts = podcasts.sort(() => Math.random() - 0.5);
  const twoHourLimit = 2 * 60 * 60;
  let durationSum = 0;
  const selectedTitles: string[] = [];
  for (const podcast of shuffledPodcasts) {
    if (durationSum + podcast.duration <= twoHourLimit) {
      durationSum += podcast.duration;
      selectedTitles.push(podcast.name);
    }
  }
  return selectedTitles;
}
