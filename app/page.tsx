import SearchBar from "@/_components/SearchBar";
import SearchSubscriber from "@/_components/AlgorithmSubscriber";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight">
        Discover Something Better
      </h1>
      <SearchBar />
      <SearchSubscriber />
    </div>
  );
}