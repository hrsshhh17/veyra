export const destinations = [
  { id: '01', slug: 'iceland', name: 'Iceland', region: 'Nordic Wilderness', country: 'Iceland', image: '/images/destinations/iceland.webp', lat: 64.9631, lon: -19.0208, intro: 'Volcanic roads, glacial valleys and landscapes that feel almost untouched.' },
  { id: '02', slug: 'amalfi-coast', name: 'Amalfi Coast', shortName: 'Italy', region: 'Mediterranean', country: 'Italy', image: '/images/destinations/italy.webp', lat: 40.6333, lon: 14.6029, intro: 'Coastal villages, slow afternoons and a Mediterranean rhythm shaped by the sea.' },
  { id: '03', slug: 'india', name: 'India', region: 'South Asia', country: 'India', image: '/images/destinations/india.webp', lat: 20.5937, lon: 78.9629, intro: 'Himalayan landscapes, ancient cities, tropical coasts and living traditions across an extraordinary range of journeys.' },
  { id: '04', slug: 'kyoto', name: 'Kyoto', shortName: 'Japan', region: 'Japan', country: 'Japan', image: '/images/destinations/japan.webp', lat: 35.0116, lon: 135.7681, intro: 'Ancient rituals, quiet streets and a city where tradition and modern life overlap.' },
  { id: '05', slug: 'bali', name: 'Bali', region: 'Indonesia', country: 'Indonesia', image: '/images/destinations/bali.webp', lat: -8.3405, lon: 115.092, intro: 'Tropical landscapes, sacred spaces and a slower way of moving through the world.' },
  { id: '06', slug: 'namibia', name: 'Namibia', region: 'Southern Africa', country: 'Namibia', image: '/images/destinations/namibia.webp', lat: -22.9576, lon: 18.4904, intro: 'Immense desert horizons, remote roads and extraordinary night skies.' },
  { id: '07', slug: 'patagonia', name: 'Patagonia', region: 'Argentina · Chile', country: 'Argentina · Chile', image: '/images/destinations/patagonia.webp', lat: -48.5, lon: -73, intro: 'Granite peaks, glacial lakes and wilderness stretching toward the edge of the continent.' },
];

export function getDestinationBySlug(slug) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getDestinationPath(name) {
  const normalized = name?.toLowerCase();
  const destination = destinations.find((item) =>
    [item.name, item.shortName, item.country].filter(Boolean).some((value) => value.toLowerCase() === normalized)
  );
  return destination ? `/destinations/${destination.slug}` : '/explore';
}
