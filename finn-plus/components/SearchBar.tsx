export default function SearchBar({
  placeholder = "Søk på FINN",
}: {
  placeholder?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-finn-border bg-white px-4 py-3 shadow-card focus-within:border-finn-blue">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#84848f" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-base outline-none placeholder:text-finn-gray-2"
      />
    </div>
  );
}
