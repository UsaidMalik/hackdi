import SearchBar from "@/components/SearchBar";

export default function Explore() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight drop-shadow-lg">
        Discover something new
      </h1>
      <SearchBar />
    </div>
  );
}
