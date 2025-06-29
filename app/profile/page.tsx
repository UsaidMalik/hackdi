'use client';

import Link from "next/link";
import LogoutButton from "@/app/_components/LogoutButton";
import type { User } from "@/app/_lib/types"; // Adjust type if needed
import HomeComponent from "@/app/_components/HomeComponent"
import { getUserData } from "@/app/_lib/userRetriever"
import ContributionCard from "@/app/_components/ContributionComponent"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProfilePage() {
const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData();
      setUser(data);
    }

    fetchUser();

    // Poll every 10 seconds (adjust as needed)
    const interval = setInterval(fetchUser, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (!user) return null; // or a loader

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-white text-gray-900 p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Center greeting and stats */}
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-bold">Hello {user.username}</h1>
        <p className="text-gray-600 text-lg">
          You have Points {user.score} <span className="text-orange-500 text-xl">🔥</span>
        </p>
      </div>

      {/* Contributions */}
      <section className="w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Contributions</h2>

        {user.contributions.length === 0 ? (
          <div className="flex items-center justify-center text-gray-600 text-lg gap-2">
            You have no contributions!
          </div>
        ) : (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {user.contributions.map((contribution, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <ContributionCard contribution={contribution} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}
