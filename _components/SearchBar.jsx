export default function SearchBar() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-2xl px-4">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full px-6 py-5 text-xl bg-white/10 text-white rounded-xl backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-white/60 shadow-lg hover:shadow-cyan-500/20"
        />
      </div>
    </div>
  );
}