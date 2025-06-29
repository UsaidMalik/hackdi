'use client';

import SearchBar from "@/app/_components/searchBar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-background text-text px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Centered content */}
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Mqt3
        </motion.h1>

        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SearchBar redirect="/explore" />
        </motion.div>
      </div>
    </motion.div>
  );
}
