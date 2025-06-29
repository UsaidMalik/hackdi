
import Link from "next/link";
import LogoutButton from "@/app/_components/LogoutButton";
import type { User } from "@/app/_lib/types"; // Adjust type if needed
import HomeComponent from "@/app/_components/HomeComponent"
import { getSession } from "@/app/_lib/actions"
import ContributionCard from "@/app/_components/ContributionComponent"

export default async function ProfilePage() {

  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  const user = {
    username: session.username,
    score: session.score,
    contributions: session.contributions || [],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 p-6">

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
          <div className="space-y-4">
            {user.contributions.map((contribution, idx) => (
             <ContributionCard contribution={contribution} key={idx}/>
            ))}
          </div>
        )}
         
      </section>
    </div>
  );
}
