import SearchBar from "@/app/_components/searchBar";
import QueryEntityMapper from "@/app/_components/QueryEntityMapper";
import LogoutButton from "@/app/_components/LogoutButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4">
      <LogoutButton />
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight">
        Mqt3
      </h1>
      <SearchBar redirect="/explore"/>
    </div>
  );
}
