// app/search/page.tsx
import SearchResultsServer from "@/app/_components/SearchResultsServer";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;

  return (
<main className="flex justify-center items-start p-6 min-h-screen">
  <div className="flex w-full max-w-7xl min-w-[80%] gap-6 border border-black shadow-md rounded-md p-6 bg-white">
    {/* Left Column (empty) */}
<aside className="w-1/3 bg-gray-50 rounded-md border border-gray-200 p-4">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">الزهد</h2>

  <div className="text-right text-gray-800 text-lg leading-loose border-t pt-4 border-gray-300">
    <p className="text-2xl mb-2">۞ يَـٰبَنِىٓ ءَادَمَ خُذُوا۟ زِينَتَكُمْ عِندَ كُلِّ مَسْجِدٍۢ وَكُلُوا۟ وَٱشْرَبُوا۟ وَلَا تُسْرِفُوٓا۟ ۚ إِنَّهُۥ لَا يُحِبُّ ٱلْمُسْرِفِينَ ﴿٣١﴾</p>
    <p className="text-sm italic text-gray-600 mt-2">
      “Children of Adam! Take your adornment at every time of prayer, and eat and drink—but do not be excessive. Indeed, He does not love those who commit excess.” (7:31)
    </p>
  </div>
</aside>



    {/* Right Column (scrollable results) */}
    <section className="w-2/3 max-h-[80vh] overflow-y-auto pr-2">
      <SearchResultsServer query={q} />
    </section>
  </div>
</main>


  );
}
