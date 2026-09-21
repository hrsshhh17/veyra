import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DestinationSearch from "../components/search/DestinationSearch";
import SearchResults from "../components/search/SearchResults";
import useDestinationSearch from "../hooks/useDestinationSearch";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const { curated, worldwide, loading, error } = useDestinationSearch(query);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (query.trim()) next.set("q", query.trim());
      else next.delete("q");
      setSearchParams(next, { replace: true });
    }, 200);
    return () => window.clearTimeout(timer);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen bg-[#090a09] px-5 pb-7 pt-24 text-white sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <Link to="/" className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-white">
        <ArrowLeft size={14} /> Back to Veyra
      </Link>

      <div className="mx-auto max-w-6xl py-20 md:py-28">
        <p className="mb-5 text-[9px] uppercase tracking-[0.34em] text-white/35">Explore the world</p>
        <h1 className="font-serif text-[clamp(4rem,10vw,9rem)] leading-[0.85] tracking-[-0.06em] text-[#f3efe6]">Where next?</h1>
        <p className="mt-7 max-w-xl text-[12px] leading-7 text-white/40">Start with a VEYRA journey or search cities and destinations around the world.</p>

        <div className="mt-12">
          <DestinationSearch value={query} onChange={setQuery} autoFocus />
          <SearchResults query={query} curated={curated} worldwide={worldwide} loading={loading} error={error} />
        </div>
      </div>

      <p className="mx-auto max-w-6xl pb-8 text-[8px] uppercase tracking-[0.22em] text-white/20">City search powered by Geoapify · photography by Unsplash</p>
    </main>
  );
}
