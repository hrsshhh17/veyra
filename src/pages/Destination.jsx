import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getDestinationBySlug } from "../data/destinations";

export default function Destination() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);

  if (!destination) return <Navigate to="/404" replace />;

  return (
    <main className="min-h-screen bg-[#090a09] text-white">
      <section className="relative min-h-[78vh] overflow-hidden">
        {destination.image ? (
          <img src={destination.image} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,#335c48_0%,#17271f_30%,#090a09_72%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a09] via-black/20 to-black/35" />

        <div className="relative z-10 flex min-h-[78vh] flex-col justify-between px-5 pb-7 pt-24 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <Link to="/" className="inline-flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-white/70 transition-colors hover:text-white">
            <ArrowLeft size={14} /> Back to Veyra
          </Link>

          <div className="pb-10 md:pb-14">
            <p className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.32em] text-white/65">
              <MapPin size={12} /> {destination.region}
            </p>
            <h1 className="max-w-5xl font-serif text-[clamp(4.5rem,12vw,10rem)] leading-[0.82] tracking-[-0.06em] text-[#f5f1e8]">
              {destination.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="grid gap-12 px-5 py-20 sm:px-8 md:grid-cols-12 md:px-12 md:py-28 lg:px-16 xl:px-20">
        <div className="md:col-span-3">
          <p className="text-[8px] uppercase tracking-[0.32em] text-white/35">Destination {destination.id}</p>
        </div>
        <div className="md:col-span-6">
          <p className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.08] tracking-[-0.035em] text-[#eee9df]">{destination.intro}</p>
        </div>
        <div className="md:col-span-3 md:flex md:items-end">
          <Link to={`/planner?name=${encodeURIComponent(destination.name)}&country=${encodeURIComponent(destination.country)}&region=${encodeURIComponent(destination.region)}&lat=${destination.lat}&lon=${destination.lon}&image=${encodeURIComponent(destination.image || "")}` } className="group inline-flex items-center gap-4 text-[9px] uppercase tracking-[0.28em] text-white/70 hover:text-white">
            Plan this journey
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
