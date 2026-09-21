import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getDestinationPath } from "../../data/destinations";

const destinationDetails = {
  Iceland: {
    number: "01",
    description:
      "Volcanic roads, glacial valleys and landscapes that feel almost untouched.",
  },

  Italy: {
    number: "02",
    description:
      "Coastal villages, slow afternoons and a Mediterranean rhythm shaped by the sea.",
  },

  India: {
    number: "03",
    description:
      "Himalayan landscapes, ancient cities, tropical coasts and living traditions unfolding across an extraordinary range of journeys.",
  },

  Japan: {
    number: "04",
    description:
      "Ancient rituals, quiet streets and cities where tradition and modern life overlap.",
  },

  Bali: {
    number: "05",
    description:
      "Tropical landscapes, sacred spaces and a slower way of moving through the world.",
  },

  Namibia: {
    number: "06",
    description:
      "Immense desert horizons, remote roads and extraordinary night skies.",
  },

  Patagonia: {
    number: "07",
    description:
      "Granite peaks, glacial lakes and wilderness stretching toward the edge of the continent.",
  },
};

export default function DestinationCards({
  activeDestination,
  onClear,
}) {
  if (!activeDestination) {
    return (
      <div className="border-t border-white/15 pt-7 lg:min-h-[240px]">
        <span className="mb-4 block text-[8px] uppercase tracking-[0.32em] text-white/35">
          Interactive globe
        </span>

        <p className="max-w-[310px] text-[12px] leading-[1.8] text-white/45">
          Drag the world or select a destination. Every point opens another way
          of experiencing it.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="block h-[5px] w-[5px] rounded-full bg-white/60" />

          <span className="text-[7px] uppercase tracking-[0.28em] text-white/30">
            Drag to explore
          </span>
        </div>
      </div>
    );
  }

  const details =
    destinationDetails[activeDestination.name];

  return (
    <div className="border-t border-white/15 pt-6 lg:min-h-[240px]">
      <div className="mb-10 flex items-center justify-between">
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/35">
          Destination {details?.number}
        </span>

        <button
          type="button"
          onClick={onClear}
          className="
            text-[8px]
            uppercase
            tracking-[0.28em]
            text-white/35
            transition-colors
            duration-300
            hover:text-white
          "
        >
          Close
        </button>
      </div>

      <p className="mb-3 text-[8px] uppercase tracking-[0.3em] text-white/40">
        {activeDestination.region}
      </p>

      <div className="flex items-end justify-between gap-6">
        <h3
          className="
            font-serif
            text-[clamp(3rem,4vw,5rem)]
            leading-[0.9]
            tracking-[-0.05em]
            text-[#f3efe6]
          "
        >
          {activeDestination.name}
        </h3>

        <Link
          to={getDestinationPath(activeDestination.name)}
          aria-label={`Explore ${activeDestination.name}`}
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            text-white

            transition-all
            duration-500

            hover:rotate-45
            hover:border-white
            hover:bg-white
            hover:text-black
          "
        >
          <ArrowUpRight
            size={15}
            strokeWidth={1.5}
          />
        </Link>
      </div>

      <div className="my-6 h-px bg-white/10" />

      <p className="max-w-[390px] text-[12px] leading-[1.8] text-white/50">
        {details?.description}
      </p>
    </div>
  );
}