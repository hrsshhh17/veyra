const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const API = "https://api.unsplash.com";

function normalizePhoto(photo) {
  return {
    id: photo.id,
    url: photo.urls?.regular || photo.urls?.small,
    thumb: photo.urls?.small,
    alt: photo.alt_description || photo.description || "Travel destination",
    photographer: photo.user?.name || "Unsplash photographer",
    photographerUrl: photo.user?.links?.html ? `${photo.user.links.html}?utm_source=veyra&utm_medium=referral` : "https://unsplash.com",
    unsplashUrl: photo.links?.html ? `${photo.links.html}?utm_source=veyra&utm_medium=referral` : "https://unsplash.com",
  };
}

export async function searchDestinationPhotos(query, { count = 8, signal } = {}) {
  if (!ACCESS_KEY || !query?.trim()) return [];
  const params = new URLSearchParams({ query: `${query.trim()} travel landscape`, per_page: String(count), orientation: "landscape", content_filter: "high" });
  const response = await fetch(`${API}/search/photos?${params}`, {
    signal,
    headers: { Authorization: `Client-ID ${ACCESS_KEY}`, "Accept-Version": "v1" },
  });
  if (!response.ok) throw new Error("Destination photography is temporarily unavailable.");
  const data = await response.json();
  return (data.results || []).map(normalizePhoto);
}

export async function getDestinationPhoto(query, options = {}) {
  const photos = await searchDestinationPhotos(query, { ...options, count: 1 });
  return photos[0] || null;
}
