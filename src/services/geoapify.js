const KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const BASE = "https://api.geoapify.com";

function ensureKey() {
  if (!KEY) throw new Error("Geoapify key is missing. Add VITE_GEOAPIFY_API_KEY to .env and restart Vite.");
}

export async function searchCities(query, { signal, limit = 6 } = {}) {
  ensureKey();
  const value = query?.trim();
  if (!value || value.length < 2) return [];
  const params = new URLSearchParams({ text: value, type: "city", lang: "en", limit: String(Math.max(limit * 2, 10)), format: "json", apiKey: KEY });
  const res = await fetch(`${BASE}/v1/geocode/autocomplete?${params}`, { signal });
  if (!res.ok) throw new Error("Destination search is temporarily unavailable.");
  const data = await res.json();
  const seen = new Set();
  const q = value.toLowerCase();
  return (data.results || []).map((p, index) => {
    const name = p.city || p.name || p.formatted?.split(",")[0] || value;
    const population = Number(p.datasource?.raw?.population || 0);
    const importance = Number(p.rank?.importance || 0);
    const confidence = Number(p.rank?.confidence || 0);
    const exact = name.toLowerCase() === q ? 3 : name.toLowerCase().startsWith(q) ? 2 : 0;
    return {
      id: p.place_id || `${p.lat}-${p.lon}-${index}`,
      name,
      country: p.country || "",
      countryCode: p.country_code || "",
      region: p.state || p.county || "",
      latitude: Number(p.lat),
      longitude: Number(p.lon),
      population,
      rank: exact * 100 + confidence * 10 + importance + Math.log10(Math.max(population, 1)) / 10,
      type: "worldwide",
    };
  }).filter((p) => {
    const key = `${p.name}|${p.region}|${p.country}`.toLowerCase();
    if (!p.name || !Number.isFinite(p.latitude) || !Number.isFinite(p.longitude) || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).sort((a, b) => b.rank - a.rank).slice(0, limit);
}

const CATEGORY_LABELS = {
  tourism: "Attraction",
  "tourism.attraction": "Landmark",
  "tourism.sights": "Sight",
  "tourism.attraction.viewpoint": "Viewpoint",
  "entertainment.museum": "Museum",
  "entertainment.culture": "Culture",
  "leisure.park": "Park",
  natural: "Nature",
  "natural.mountain": "Mountain",
  "natural.forest": "Nature",
};

function normalizePlaces(features = []) {
  const seen = new Set();
  return features.map((f) => {
    const p = f.properties || {};
    const cats = p.categories || [];
    const coords = f.geometry?.coordinates || [p.lon, p.lat];
    const name = p.name || p.address_line1;
    const categoryKey = Object.keys(CATEGORY_LABELS).find((key) => cats.includes(key)) || cats.find((c) => c.startsWith("tourism")) || cats.find((c) => c.startsWith("natural")) || cats[0];
    return {
      id: p.place_id || `${coords[1]}-${coords[0]}-${name}`,
      name,
      address: p.formatted || p.address_line2 || "",
      category: CATEGORY_LABELS[categoryKey] || categoryKey?.split(".").pop()?.replaceAll("_", " ") || "Place",
      lat: Number(coords[1]),
      lon: Number(coords[0]),
      distance: Number(p.distance || 0),
      categories: cats,
    };
  }).filter((p) => {
    const key = p.name?.trim().toLowerCase();
    if (!key || !Number.isFinite(p.lat) || !Number.isFinite(p.lon) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function getTravelPlaces(lat, lon, { signal, radius = 22000, limit = 48 } = {}) {
  ensureKey();
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return [];

  // Broad, documented parent categories are intentionally used here. A single
  // unsupported child category can make the whole Places request fail.
  const categoryGroups = ["tourism", "natural", "entertainment.culture,entertainment.museum", "leisure.park"];
  const requests = categoryGroups.map(async (categories) => {
    const params = new URLSearchParams({
      categories,
      filter: `circle:${lon},${lat},${radius}`,
      bias: `proximity:${lon},${lat}`,
      limit: String(Math.min(20, limit)),
      lang: "en",
      apiKey: KEY,
    });
    const res = await fetch(`${BASE}/v2/places?${params}`, { signal });
    if (!res.ok) return [];
    const data = await res.json();
    return data.features || [];
  });

  const settled = await Promise.allSettled(requests);
  const features = settled.flatMap((r) => r.status === "fulfilled" ? r.value : []);
  return normalizePlaces(features)
    .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
    .slice(0, limit);
}
