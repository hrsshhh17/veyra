import { ArrowLeft, ArrowUpRight, CloudSun, Compass, MapPin, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPlaceWeather, weatherLabel } from "../services/destinationService";
import { getDestinationPhoto } from "../services/unsplash";

export default function Place() {
  const [params] = useSearchParams();
  const name = params.get("name") || "Destination", country = params.get("country") || "", region = params.get("region") || "";
  const latitude = Number(params.get("lat")), longitude = Number(params.get("lon"));
  const [weather, setWeather] = useState(null), [error, setError] = useState("");
  const [photo, setPhoto] = useState(() => params.get("image") ? { url: params.get("image"), photographer: params.get("photographer"), photographerUrl: params.get("photographerUrl"), unsplashUrl: params.get("unsplashUrl") } : null);
  const validCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude);

  useEffect(() => {
    const controller = new AbortController();
    if (validCoordinates) getPlaceWeather(latitude, longitude, { signal: controller.signal }).then(setWeather).catch((e) => { if (e.name !== "AbortError") setError(e.message || "Weather unavailable."); });
    if (!photo) getDestinationPhoto(`${name} ${country}`, { signal: controller.signal }).then(setPhoto).catch(() => {});
    return () => controller.abort();
  }, [name, country, latitude, longitude, validCoordinates]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = weather?.current, daily = weather?.daily;
  const plannerParams = new URLSearchParams({ name, country, region, lat: String(latitude), lon: String(longitude) });
  if (photo?.url) plannerParams.set("image", photo.url);

  return <main className="min-h-screen bg-[#090a09] text-white">
    <section className="relative min-h-[78vh] overflow-hidden px-5 pb-7 pt-24 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {photo?.url && <img src={photo.url} alt={name} className="absolute inset-0 h-full w-full object-cover"/>}
      <div className={`absolute inset-0 ${photo?.url ? "bg-gradient-to-t from-[#090a09] via-black/25 to-black/45" : "bg-[radial-gradient(circle_at_65%_35%,rgba(42,121,158,.34),rgba(9,10,9,1)_72%)]"}`}/>
      <div className="relative z-10 flex min-h-[72vh] flex-col justify-between"><Link to="/explore" className="inline-flex w-fit items-center gap-3 text-[9px] uppercase tracking-[.28em] text-white/75 hover:text-white"><ArrowLeft size={14}/> Back to search</Link><div className="pb-12"><p className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[.32em] text-white/65"><MapPin size={12}/>{[region,country].filter(Boolean).join(" · ") || "Worldwide"}</p><h1 className="max-w-5xl font-serif text-[clamp(4.5rem,13vw,11rem)] leading-[.8] tracking-[-.065em] text-[#f5f1e8]">{name}</h1>{photo?.photographer && <p className="mt-6 text-[8px] uppercase tracking-[.18em] text-white/45">Photo by <a href={photo.photographerUrl} target="_blank" rel="noreferrer" className="underline">{photo.photographer}</a> on <a href={photo.unsplashUrl || "https://unsplash.com"} target="_blank" rel="noreferrer" className="underline">Unsplash</a></p>}</div></div>
    </section>
    <section className="grid gap-10 border-t border-white/10 px-5 py-16 sm:px-8 md:grid-cols-12 md:px-12 md:py-24 lg:px-16 xl:px-20"><div className="md:col-span-3"><p className="text-[8px] uppercase tracking-[.3em] text-white/30">Live destination signal</p></div><div className="md:col-span-6">{current ? <div><p className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-none tracking-[-.04em] text-[#f3efe6]">{Math.round(current.temperature_2m)}°C</p><p className="mt-4 text-sm text-white/50">{weatherLabel(current.weather_code)} · feels like {Math.round(current.apparent_temperature)}°C</p><div className="mt-8 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3"><div className="bg-[#090a09] p-5"><Wind size={14} className="mb-4 text-white/35"/><p className="text-[8px] uppercase tracking-[.25em] text-white/30">Wind</p><p className="mt-2 text-sm text-white/70">{Math.round(current.wind_speed_10m)} km/h</p></div><div className="bg-[#090a09] p-5"><CloudSun size={14} className="mb-4 text-white/35"/><p className="text-[8px] uppercase tracking-[.25em] text-white/30">Today</p><p className="mt-2 text-sm text-white/70">{Math.round(daily.temperature_2m_min[0])}° / {Math.round(daily.temperature_2m_max[0])}°</p></div><div className="bg-[#090a09] p-5"><Compass size={14} className="mb-4 text-white/35"/><p className="text-[8px] uppercase tracking-[.25em] text-white/30">Coordinates</p><p className="mt-2 text-sm text-white/70">{latitude.toFixed(2)}, {longitude.toFixed(2)}</p></div></div></div> : <p className="text-sm text-white/45">{error || "Reading current conditions..."}</p>}</div><div className="md:col-span-3 md:flex md:items-end"><Link to={`/planner?${plannerParams}`} className="group inline-flex items-center gap-4 text-[9px] uppercase tracking-[.28em] text-white/70 hover:text-white">Plan a journey<span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black"><ArrowUpRight size={15}/></span></Link></div></section>
  </main>;
}
