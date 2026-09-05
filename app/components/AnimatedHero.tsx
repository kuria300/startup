"use client";

import { motion } from "motion/react";
import Searchform from "./Searchform";

export default function AnimatedHero({ query }: { query?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pink_container bg-pattern"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="heading"
      >
        Pitch your Ideas <br /> connect with Developers
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="sub-heading"
      >
        Submit Ideas, Vote on Pitches and Get noticed
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full flex justify-center"
      >
        <Searchform query={query} />
      </motion.div>
    </motion.section>
  );
}