export default function SearchBar() {
  return (
    <div className="flex items-center justify-center w-full max-w-4xl px-4">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="w-full px-5 py-3 text-lg bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md"
      />
    </div>
  );
}
