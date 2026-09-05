import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import AnimatedHero from "../components/AnimatedHero";
import AnimatedCardGrid from "../components/AnimatedCardGrid";

export const revalidate = 60;

export type StartupPost = {
  _createdAt: Date;
  views: number;
  author: { _id: number; name: string; image: string };
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <AnimatedHero query={query} />

      <section className="section_container">
        <p className="text-2xl font-bold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <AnimatedCardGrid posts={posts} />
      </section>
    </>
  );
}