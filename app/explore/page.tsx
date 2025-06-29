// app/search/page.tsx
import SearchResultsServer from "@/app/_components/SearchResultsServer";
import ZuhdComponent from "@/app/_components/ZuhdComponent";

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;

  return (
<main className="flex justify-center items-start p-6 min-h-screen bg-background text-text">
  <div className="flex w-full max-w-7xl min-w-[80%] gap-6 border border-black shadow-md rounded-md p-6 bg-white">
    {/* Left Column (empty) */}
   <aside className="w-1/3 bg-gray-50 rounded-md border border-gray-200 p-4">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Zuhd</h2>
  <ZuhdComponent query={q} />
</aside>


    {/* Right Column (scrollable results) */}
    <section className="w-2/3 max-h-[80vh] overflow-y-auto pr-2">
      <SearchResultsServer query={q} />
    </section>
  </div>
</main>


  );
}
