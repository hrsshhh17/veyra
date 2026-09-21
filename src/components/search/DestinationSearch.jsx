import { Search, X } from "lucide-react";

export default function DestinationSearch({ value, onChange, autoFocus = false }) {
  return (
    <div className="relative border-b border-white/20 transition-colors focus-within:border-white/55">
      <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/35" size={20} />
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search Paris, Tokyo, Manali, Dubai..."
        className="w-full bg-transparent py-6 pl-10 pr-12 text-xl text-white outline-none placeholder:text-white/25 md:text-2xl"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/35 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
