import SearchBar from "@/app/_components/searchBar";
import QueryEntityMapper from "@/app/_components/QueryEntityMapper";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4">
      <div className="absolute top-4 right-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Log Out
        </button>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight">
        Mqt3
      </h1>
      <SearchBar />
      <QueryEntityMapper />
    </div>
  );
}