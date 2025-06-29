import SearchBar from "@/app/_components/searchBar";
import QueryEntityMapper from "@/app/_components/QueryEntityMapper";
import LogoutButton from "@/app/_components/LogoutButton";
import ProfileComponent from "@/app/_components/ProfileComponent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 px-4">
      {/* Top bar: Profile + Logout aligned on top */}
      <div className="w-full max-w-6xl flex justify-between items-center py-4 mx-auto">
        <ProfileComponent />
        <LogoutButton />
      </div>

      {/* Centered content below header */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight">
          Mqt3
        </h1>
        <SearchBar redirect="/explore" />
      </div>
    </div>
  );
}