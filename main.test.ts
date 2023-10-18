import { podcastSchema } from "@/domain";
import { getPodcast, getPodcastTerrible } from "@/service";
import { describe, expect, test } from "bun:test";
import { ZodError } from "zod";

describe("test", () => {
  test("validation podcast", async () => {
    const podcasts = await getPodcast();
    for (const podcast of podcasts) {
      try {
        const result = podcastSchema.parse(podcast);
        expect(result).toBe(podcast);
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          console.log(err.issues);
        }
      }
    }
  });
  test("validation podcast terrible", async () => {
    const podcasts = await getPodcastTerrible();
    for (const podcast of podcasts) {
      try {
        const result = podcastSchema.parse(podcast);
        expect(result).toBe(podcast);
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          console.log(err.issues);
        }
      }
    }
  });
});
