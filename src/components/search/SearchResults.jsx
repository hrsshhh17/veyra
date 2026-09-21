import { ArrowUpRight, Globe2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function placePath(place) {
  const params = new URLSearchParams({ name: place.name, country: place.country, region: place.region || "", lat: String(place.latitude), lon: String(place.longitude) });
  if (place.photo?.url) params.set("image", place.photo.url);
  if (place.photo?.photographer) params.set("photographer", place.photo.photographer);
  if (place.photo?.photographerUrl) params.set("photographerUrl", place.photo.photographerUrl);
  if (place.photo?.unsplashUrl) params.set("unsplashUrl", place.photo.unsplashUrl);
  return `/place?${params.toString()}`;
}

export default function SearchResults({ query, curated, worldwide, loading, error }) {
  const searching = query.trim().length >= 2;
  return <div className="mt-10 space-y-14">
    {curated.length > 0 && <section>
      <div className="mb-5 flex items-center justify-between"><p className="text-[8px] uppercase tracking-[0.3em] text-white/35">VEYRA collection</p><span className="text-[8px] uppercase tracking-[0.24em] text-white/20">Curated journeys</span></div>
      <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
        {curated.map((d) => <Link key={d.slug} to={`/destinations/${d.slug}`} className="group relative min-h-[230px] overflow-hidden bg-[#090a09] p-6 md:p-8">
          {d.image && <img src={d.image} alt={d.name} className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
          <div className="relative z-10 flex h-full items-start justify-between gap-6"><div><p className="mb-3 text-[8px] uppercase tracking-[0.28em] text-white/60">{d.region}</p><h2 className="font-serif text-4xl tracking-[-0.04em] text-[#f3efe6] md:text-5xl">{d.name}</h2><p className="mt-5 max-w-sm text-[11px] leading-6 text-white/60">{d.intro}</p></div><ArrowUpRight size={16} className="shrink-0 text-white/50 transition-all duration-500 group-hover:rotate-45 group-hover:text-white" /></div>
        </Link>)}
      </div>
    </section>}

    {searching && <section>
      <div className="mb-5 flex items-center justify-between"><p className="flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-white/35"><Globe2 size={12}/> Worldwide</p>{loading && <span className="text-[8px] uppercase tracking-[0.24em] text-white/25">Searching world...</span>}</div>
      {error && <p className="border-t border-white/10 py-6 text-sm text-white/45">{error}</p>}
      {!loading && !error && worldwide.length > 0 && <div className="grid gap-3 md:grid-cols-2">
        {worldwide.map((p) => <Link key={`${p.id}-${p.latitude}-${p.longitude}`} to={placePath(p)} className="group relative min-h-[210px] overflow-hidden border border-white/10 bg-white/[0.025] p-5">
          {p.photo?.thumb && <img src={p.photo.thumb} alt={p.photo.alt} className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-50" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />
          <div className="relative z-10 flex h-full flex-col justify-between"><div className="flex justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20"><MapPin size={13}/></span><ArrowUpRight size={15} className="text-white/55 transition-all duration-500 group-hover:rotate-45 group-hover:text-white"/></div><div><h3 className="font-serif text-3xl tracking-[-0.03em] text-[#f3efe6]">{p.name}</h3><p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/55">{[p.region,p.country].filter(Boolean).join(" · ")}</p>{p.photo && <p className="mt-3 text-[8px] text-white/35">Photo by {p.photo.photographer} on Unsplash</p>}</div></div>
        </Link>)}
      </div>}
      {!loading && !error && worldwide.length === 0 && <p className="border-t border-white/10 py-6 text-sm text-white/40">No worldwide matches found for “{query}”.</p>}
    </section>}
  </div>;
}
