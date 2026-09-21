import { ArrowLeft, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TripPlanner from "../components/planner/TripPlanner";
import Itinerary from "../components/planner/Itinerary";

const PLANNING_BASES = {
  India: { lat: 32.2432, lon: 77.1892, region: "Himalayan India · Manali base" },
  Iceland: { lat: 64.1466, lon: -21.9426, region: "Iceland · Reykjavík base" },
  Namibia: { lat: -22.5609, lon: 17.0658, region: "Namibia · Windhoek base" },
  Patagonia: { lat: -50.3379, lon: -72.2648, region: "Patagonia · El Calafate base" },
  Bali: { lat: -8.5069, lon: 115.2625, region: "Bali · Ubud base" },
};

export default function Planner() {
  const [params] = useSearchParams();
  const name = params.get("name") || "Your destination";
  const base = PLANNING_BASES[name];
  const destination = {
    name,
    country: params.get("country") || "",
    region: base?.region || params.get("region") || "",
    image: params.get("image") || "",
    lat: base?.lat ?? Number(params.get("lat")),
    lon: base?.lon ?? Number(params.get("lon")),
  };
  const [preferences, setPreferences] = useState(null);
  const valid = Number.isFinite(destination.lat) && Number.isFinite(destination.lon);

  return <main className="min-h-screen bg-[#090a09] text-white">
    <section className="relative min-h-[52vh] overflow-hidden px-5 pb-10 pt-28 sm:px-8 md:px-12 md:pt-32 lg:px-16 xl:px-20">
      {destination.image && <img src={destination.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40"/>}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a09] via-black/45 to-black/65"/>
      <div className="relative z-10 flex min-h-[38vh] flex-col justify-between">
        <Link to="/explore" className="inline-flex w-fit items-center gap-3 text-[9px] uppercase tracking-[.28em] text-white/65 hover:text-white"><ArrowLeft size={14}/> Explore</Link>
        <div className="pb-3"><p className="mb-4 flex items-center gap-2 text-[8px] uppercase tracking-[.3em] text-white/45"><MapPin size={11}/>{[destination.region, destination.country].filter(Boolean).join(" · ")}</p><h1 className="font-serif text-[clamp(4rem,10vw,9rem)] leading-[.84] tracking-[-.06em] text-[#f3efe6]">Plan a journey.</h1></div>
      </div>
    </section>
    <section className="px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16 xl:px-20">{!valid ? <p className="text-white/50">Choose a destination from Explore first so VEYRA has coordinates to build around.</p> : preferences ? <Itinerary destination={destination} preferences={preferences} onReset={() => setPreferences(null)}/> : <TripPlanner destination={destination} onGenerate={setPreferences}/>}</section>
  </main>;
}
