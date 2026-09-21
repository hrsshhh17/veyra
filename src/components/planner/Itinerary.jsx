import { CalendarDays, Clock3, Copy, ExternalLink, MapPin, RotateCcw, Route, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getTravelPlaces } from "../../services/geoapify";

const TIMES = ["09:00", "11:30", "14:30", "18:30"];
const PERIODS = ["Morning", "Late morning", "Afternoon", "Evening"];

const CURATED_FALLBACKS = {
  India: ["Old Manali & Manu Temple area", "Hadimba Devi Temple", "Solang Valley", "Atal Tunnel scenic route", "Sissu village & waterfall", "Naggar Castle & heritage village", "Vashisht village & hot springs", "Mall Road evening walk"],
  Iceland: ["Reykjavík old harbour", "Hallgrímskirkja & central Reykjavík", "Þingvellir National Park", "Geysir geothermal area", "Gullfoss waterfall", "Reynisfjara coast", "Skógafoss waterfall", "Sky Lagoon or geothermal evening"],
  Bali: ["Ubud Palace & market", "Campuhan Ridge Walk", "Tegallalang rice terraces", "Tirta Empul", "Uluwatu Temple", "Seminyak sunset", "Sidemen countryside", "Water temple & local village"],
  Namibia: ["Windhoek city orientation", "Daan Viljoen reserve", "Sossusvlei dunes", "Deadvlei", "Sesriem Canyon", "Swakopmund waterfront", "Walvis Bay lagoon", "Desert sunset viewpoint"],
  Patagonia: ["El Calafate orientation", "Perito Moreno Glacier", "Glacier boardwalks", "Lago Argentino waterfront", "El Chaltén village", "Laguna Capri trail", "Mountain viewpoint", "Patagonian evening"],
};

function distanceKm(a, b) {
  if (!Number.isFinite(a?.lat) || !Number.isFinite(a?.lon) || !Number.isFinite(b?.lat) || !Number.isFinite(b?.lon)) return null;
  const R = 6371, dLat = (b.lat-a.lat)*Math.PI/180, dLon = (b.lon-a.lon)*Math.PI/180;
  const x = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(x));
}
function mapsUrl(p,destination){return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.fallback ? `${p.name}, ${destination.name}` : `${p.name} ${p.lat},${p.lon}`)}`;}
function dayDate(startDate, offset){if(!startDate)return "";const d=new Date(`${startDate}T12:00:00`);d.setDate(d.getDate()+offset);return new Intl.DateTimeFormat("en",{weekday:"short",day:"numeric",month:"short"}).format(d);}
function interestFallback(destination, interests) {
  const curated = CURATED_FALLBACKS[destination.name];
  if (curated) return curated.map((name,i)=>({id:`curated-${i}`,name,category:i%3===0?"Culture":"Experience",fallback:true,curated:true}));
  const i = interests?.length ? interests : ["Culture","Nature"];
  return [
    `${destination.name} historic centre & orientation walk`,
    `${destination.name} signature landmark`,
    `${destination.name} local market & regional lunch`,
    `${destination.name} scenic viewpoint or waterfront`,
    `${i[0]} experience chosen with a local operator`,
    `${i[1] || i[0]} district at an unhurried pace`,
    `Independent neighbourhood dinner in ${destination.name}`,
    `Sunset walk and open evening in ${destination.name}`,
  ].map((name,index)=>({id:`fallback-${index}`,name,category:index===2?"Food":i[index%i.length],fallback:true}));
}
function buildDays(realPlaces,prefs,destination){
  const perDay=prefs.pace==="Slow"?2:prefs.pace==="Full"?4:3;
  const realPool=[...realPlaces]; const fallbacks=interestFallback(destination,prefs.interests); const days=[];
  let anchor={lat:destination.lat,lon:destination.lon}; let fallbackIndex=0;
  for(let d=0;d<prefs.days;d++){
    const picks=[];
    while(picks.length<perDay && realPool.length){realPool.sort((a,b)=>(distanceKm(anchor,a)??9999)-(distanceKm(anchor,b)??9999));const next=realPool.shift();picks.push(next);anchor=next;}
    while(picks.length<perDay){const base=fallbacks[fallbackIndex++%fallbacks.length];picks.push({...base,id:`${base.id}-${d}-${picks.length}`});}
    const real=picks.filter(p=>!p.fallback); const title=d===0?`Arrive slowly, then meet ${destination.name}`:real.length?`${real[0].name}${real[1]?` → ${real[1].name}`:""}`:`A ${prefs.pace.toLowerCase()} day through ${destination.name}`;
    days.push({day:d+1,title,places:picks});
  }
  return days;
}
function travelHint(prev,current){const km=distanceKm(prev,current);if(km==null)return "Flexible transfer";if(km<1.5)return `${Math.max(8,Math.round(km*14))} min walk`;if(km<8)return `${Math.max(10,Math.round(km*4))} min local ride`;return `~${Math.max(20,Math.round(km*2.2))} min transfer`;}

export default function Itinerary({destination,preferences,onReset}){
  const [places,setPlaces]=useState([]),[loading,setLoading]=useState(true),[notice,setNotice]=useState("");
  useEffect(()=>{const controller=new AbortController();setLoading(true);setNotice("");const radius=["India","Iceland","Namibia","Patagonia"].includes(destination.name)?40000:26000;getTravelPlaces(destination.lat,destination.lon,{signal:controller.signal,radius,limit:72}).then(rows=>{setPlaces(rows);if(rows.length<6)setNotice("Live mapped coverage is light here. VEYRA has completed the route with clearly marked flexible recommendations.");}).catch(e=>{if(e.name!=="AbortError"){setPlaces([]);setNotice("Live place data could not be reached. VEYRA has still prepared a usable route using clearly marked destination recommendations.");}}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});return()=>controller.abort();},[destination.lat,destination.lon,destination.name]);
  const days=useMemo(()=>buildDays(places,preferences,destination),[places,preferences,destination]);
  const copy=async()=>{const text=days.map(d=>`Day ${d.day}${dayDate(preferences.startDate,d.day-1)?` · ${dayDate(preferences.startDate,d.day-1)}`:""} — ${d.title}\n${d.places.map((p,i)=>`${PERIODS[i]}: ${p.name}`).join("\n")}`).join("\n\n");await navigator.clipboard?.writeText(text);};
  if(loading)return <div className="py-24 text-center"><div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/15"><Sparkles size={18} className="animate-pulse text-[#d9bd87]"/></div><p className="text-[8px] uppercase tracking-[.34em] text-white/35">Shaping your journey</p><p className="mt-5 font-serif text-4xl text-[#f3efe6]">Reading {destination.name}...</p><p className="mx-auto mt-4 max-w-md text-[11px] leading-6 text-white/35">Finding mapped places, reducing backtracking and matching the day density to your pace.</p></div>;

  return <div className="mx-auto max-w-[1500px]">
    <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8"><p className="text-[8px] uppercase tracking-[.32em] text-[#d9bd87]/70">Your VEYRA route · {places.length ? `${places.length} mapped places considered` : "destination-led route"}</p><h2 className="mt-4 font-serif text-[clamp(3.7rem,7vw,7.5rem)] leading-[.82] tracking-[-.06em] text-[#f3efe6]">{preferences.days} days,<br/><span className="text-white/45">shaped around you.</span></h2></div>
      <div className="lg:col-span-4"><div className="grid grid-cols-2 gap-px bg-white/10"><div className="bg-[#090a09] p-4"><CalendarDays size={13} className="mb-3 text-white/30"/><span className="text-[8px] uppercase tracking-[.22em] text-white/30">Trip</span><p className="mt-2 text-sm text-white/70">{preferences.days} days · {preferences.travellers} traveller{preferences.travellers>1?"s":""}</p></div><div className="bg-[#090a09] p-4"><Route size={13} className="mb-3 text-white/30"/><span className="text-[8px] uppercase tracking-[.22em] text-white/30">Style</span><p className="mt-2 text-sm text-white/70">{preferences.pace} · {preferences.budget}</p></div></div><div className="mt-5 flex gap-6"><button onClick={copy} className="inline-flex items-center gap-2 text-[8px] uppercase tracking-[.25em] text-white/45 hover:text-white"><Copy size={13}/>Copy route</button><button onClick={onReset} className="inline-flex items-center gap-2 text-[8px] uppercase tracking-[.25em] text-white/45 hover:text-white"><RotateCcw size={13}/>Adjust</button></div></div>
    </div>
    {notice&&<div className="my-8 border border-[#d9bd87]/20 bg-[#d9bd87]/[.04] px-5 py-4 text-[10px] leading-5 text-[#d9bd87]/75">{notice}</div>}
    <div className="relative mt-10 space-y-5 before:absolute before:bottom-0 before:left-[23px] before:top-0 before:w-px before:bg-white/10 md:before:left-[35px]">
      {days.map(d=><article key={d.day} className="relative grid gap-5 pl-16 md:grid-cols-12 md:gap-8 md:pl-24">
        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#090a09] text-[9px] text-white/55 md:h-[70px] md:w-[70px]">{String(d.day).padStart(2,"0")}</div>
        <div className="border-t border-white/10 pt-6 md:col-span-4"><p className="text-[8px] uppercase tracking-[.26em] text-[#d9bd87]/60">Day {String(d.day).padStart(2,"0")}{preferences.startDate&&` · ${dayDate(preferences.startDate,d.day-1)}`}</p><h3 className="mt-3 font-serif text-[2rem] leading-[1] tracking-[-.04em] text-[#f3efe6]">{d.title}</h3><p className="mt-4 max-w-sm text-[10px] leading-5 text-white/30">{d.day===1?"Keep arrival day forgiving. Check in first, then start close to your base.":preferences.pace==="Slow"?"A deliberately breathable day with room to linger.":preferences.pace==="Full"?"A fuller day — start early and pre-book timed attractions.":"Balanced pacing with enough time between stops."}</p></div>
        <div className="space-y-2 border-t border-white/10 pt-6 md:col-span-8">{d.places.map((p,i)=>{const prev=i===0?{lat:destination.lat,lon:destination.lon}:d.places[i-1];return <a key={p.id} href={mapsUrl(p,destination)} target="_blank" rel="noreferrer" className="group grid gap-3 border border-white/10 bg-white/[.018] p-4 transition hover:border-white/25 hover:bg-white/[.035] sm:grid-cols-[72px_1fr_auto] sm:items-center"><div><span className="block text-[8px] uppercase tracking-[.2em] text-white/28">{PERIODS[i]}</span><span className="mt-1 block text-[10px] text-white/55">{TIMES[i]}</span></div><div><div className="flex items-start gap-2"><MapPin size={12} className="mt-1 shrink-0 text-[#d9bd87]/55"/><div><b className="block font-normal text-[14px] text-white/80">{p.name}</b><small className="mt-1 block text-[9px] capitalize leading-4 text-white/32">{p.category}{p.address?` · ${p.address}`:""}</small><span className="mt-2 inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[.16em] text-white/25"><Clock3 size={10}/>{p.fallback?"Flexible timing":travelHint(prev,p)}{p.fallback?" · recommendation":" · mapped stop"}</span></div></div></div><ExternalLink size={13} className="text-white/20 transition group-hover:text-white"/></a>})}</div>
      </article>)}
    </div>
    <div className="mt-14 grid gap-6 border-t border-white/10 pt-7 md:grid-cols-3"><div><p className="text-[8px] uppercase tracking-[.25em] text-white/30">Stay</p><p className="mt-2 text-sm text-white/65">{preferences.stay}</p></div><div><p className="text-[8px] uppercase tracking-[.25em] text-white/30">Interests</p><p className="mt-2 text-sm text-white/65">{preferences.interests.join(" · ")}</p></div><div><p className="text-[8px] uppercase tracking-[.25em] text-white/30">Before you go</p><p className="mt-2 text-[10px] leading-5 text-white/35">Verify opening hours, tickets, transport and road conditions for your exact dates. Mapped stops are live place data; flexible stops are clearly labelled.</p></div></div>
  </div>;
}
