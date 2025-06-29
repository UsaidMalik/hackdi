import SearchBar from "@/app/_components/searchBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4 -mt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight">
        Mqt3
      </h1>
      <SearchBar redirect="/explore"/>
    </div>
  );
}
