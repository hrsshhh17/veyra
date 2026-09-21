import { useEffect, useMemo, useState } from "react";
import { destinations } from "../data/destinations";
import { searchWorldwideDestinations } from "../services/destinationService";
import { getDestinationPhoto } from "../services/unsplash";

export default function useDestinationSearch(query) {
  const [worldwide,setWorldwide]=useState([]), [loading,setLoading]=useState(false), [error,setError]=useState("");
  const curated = useMemo(()=>{ const q=query.trim().toLowerCase(); if(!q) return destinations; return destinations.filter(d=>`${d.name} ${d.shortName||""} ${d.region} ${d.country}`.toLowerCase().includes(q)); },[query]);
  useEffect(()=>{
    const q=query.trim(); if(q.length<2){setWorldwide([]);setLoading(false);setError("");return;}
    const controller=new AbortController(); const timer=setTimeout(async()=>{
      setLoading(true);setError("");
      try { const places=await searchWorldwideDestinations(q,{signal:controller.signal,limit:5});
        const withPhotos=await Promise.all(places.map(async p=>({ ...p, photo: await getDestinationPhoto(`${p.name} ${p.region} ${p.country}`,{signal:controller.signal}).catch(()=>null) })));
        setWorldwide(withPhotos);
      } catch(e){if(e.name!=="AbortError"){setWorldwide([]);setError(e.message||"Search failed.");}}
      finally{if(!controller.signal.aborted)setLoading(false);}
    },300); return()=>{clearTimeout(timer);controller.abort();};
  },[query]);
  return {curated,worldwide,loading,error};
}
