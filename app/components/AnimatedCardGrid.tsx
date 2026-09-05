"use client";

import { motion } from "motion/react";
import StartupCard from "./StartupCard";
import type { StartupPost } from "@/app/(Root)/page";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
} as const;

export default function AnimatedCardGrid({ posts }: { posts: StartupPost[] }) {
  if (!posts?.length) {
    return <p className="no-results">No startups found</p>;
  }

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-6 card_grid"
    >
      {posts.map((startupCard) => (
        <StartupCard key={startupCard._id} post={startupCard} />
      ))}
    </motion.ul>
  );
}