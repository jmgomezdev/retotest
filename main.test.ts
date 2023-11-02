import { apiModelAdapter } from "@/adapter";
import { Podcast, podcastSchema } from "@/domain";
import { getPodcast, getPodcastTerrible } from "@/service";
import {
  getNextPodcast,
  getShortestEpisode,
  getTitles,
  getTotalDuration,
} from "@/utils";
import { describe, expect, test } from "bun:test";

describe("test", () => {
  test("validation podcast", async () => {
    const podcasts = await getPodcast();
    for (const podcast of podcasts) {
      const result = podcastSchema.safeParse(podcast);
      if (!result.success) {
        const issues = result.error.issues.map((issue) => {
          return {
            ...issue,
            value: podcast[issue.path[0]],
          };
        });
        console.log(issues);
      }
      expect(result?.success).toBe(true);
    }
  });
  test("validation podcast terrible", async () => {
    const podcasts = await getPodcastTerrible();
    for (const podcast of podcasts) {
      const result = podcastSchema.safeParse(podcast);
      if (!result.success) {
        const issues = result.error.issues.map((issue) => {
          return {
            ...issue,
            value: podcast[issue.path[0]],
          };
        });
        console.log(issues);
      }
      expect(result?.success).toBe(true);
    }
  });
});

describe("Podcast utilities", () => {
  const podcasts: Podcast[] = [
    {
      date: 1696460166,
      description: "description",
      duration: 60,
      id: "1",
      name: "Episode 1",
      number: 1,
    },
    {
      date: 1696460167,
      description: "description",
      duration: 120,
      id: "2",
      name: "Episode 2",
      number: 2,
    },
    {
      date: 1696460168,
      description: "description",
      duration: 90,
      id: "3",
      name: "Episode 3",
      number: 3,
    },
  ];

  test("getNextPodcast", () => {
    expect(getNextPodcast(podcasts)).toBe(4);
  });

  test("getTotalDuration", () => {
    expect(getTotalDuration(podcasts)).toBe(270);
  });

  test("getShortestEpisode", () => {
    expect(getShortestEpisode(podcasts)).toBe(60);
  });

  test("getTitles", () => {
    const titles = getTitles(podcasts);
    expect(titles.length).toBe(3);
    expect(titles).toContain("Episode 1");
    expect(titles).toContain("Episode 2");
    expect(titles).toContain("Episode 3");
  });
});

describe("apiModelAdapter", () => {
  test("should correctly adapt the API model to the Podcast model", () => {
    const apiModel = {
      duration: 60,
      excerpt: "description",
      id: "1",
      number: 1,
      published_at: 1696460166,
      title: "Episode 1",
    };

    const expectedPodcastModel = {
      date: 1696460166,
      description: "description",
      duration: 60,
      id: "1",
      name: "Episode 1",
      number: 1,
    };

    expect(apiModelAdapter(apiModel)).toEqual(expectedPodcastModel);
  });
});
