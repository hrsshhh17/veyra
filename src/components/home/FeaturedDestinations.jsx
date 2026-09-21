import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    id: "01",
    name: "Iceland",
    slug: "iceland",
    region: "Nordic Wilderness",
    image: "/images/destinations/iceland.webp",
    className: "md:col-span-7 md:row-span-2",
    imagePosition: "center center",
  },
  {
    id: "02",
    name: "Amalfi Coast",
    slug: "amalfi-coast",
    region: "Italy",
    image: "/images/destinations/italy.webp",
    className: "md:col-span-5 md:row-span-1",
    imagePosition: "center center",
  },
  {
    id: "03",
    name: "Kyoto",
    slug: "kyoto",
    region: "Japan",
    image: "/images/destinations/japan.webp",
    className: "md:col-span-5 md:row-span-1",
    imagePosition: "center center",
  },
  {
    id: "04",
    name: "India",
    slug: "india",
    region: "South Asia",
    image: "/images/destinations/india.webp",
    className: "md:col-span-5 md:row-span-1",
    imagePosition: "center center",
  },
  {
    id: "05",
    name: "Bali",
    slug: "bali",
    region: "Indonesia",
    image: "/images/destinations/bali.webp",
    className: "md:col-span-5 md:row-span-1",
    imagePosition: "center center",
  },
  {
    id: "06",
    name: "Namibia",
    slug: "namibia",
    region: "Southern Africa",
    image: "/images/destinations/namibia.webp",
    className: "md:col-span-7 md:row-span-2",
    imagePosition: "center center",
  },
  {
    id: "07",
    name: "Patagonia",
    slug: "patagonia",
    region: "Argentina · Chile",
    image: "/images/destinations/patagonia.webp",
    className: "md:col-span-5 md:row-span-1",
    imagePosition: "center center",
  },
];

function DestinationCard({ destination }) {
  const card = useRef(null);
  const image = useRef(null);

  const handleMouseMove = (event) => {
    if (window.innerWidth < 768) return;

    const element = card.current;
    const imageElement = image.current;

    if (!element || !imageElement) return;

    const rect = element.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageElement, {
      xPercent: x * 2.5,
      yPercent: y * 2.5,
      scale: 1.075,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;

    gsap.to(image.current, {
      scale: 1.075,
      duration: 1,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;

    gsap.to(image.current, {
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      duration: 1.1,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      ref={card}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        destination-card
        group
        relative
        min-h-[540px]
        overflow-hidden
        bg-[#161616]
        ${destination.className}

        md:min-h-0
      `}
    >
      <img
        ref={image}
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        draggable="false"
        style={{
          objectPosition: destination.imagePosition,
        }}
        className="
          absolute inset-0
          h-full w-full
          scale-[1.01]
          object-cover
          will-change-transform
        "
      />

      {/* Permanent cinematic image treatment */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-t
          from-black/75
          via-black/5
          to-black/10
        "
      />

      {/* Hover darkening */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-black/0
          transition-colors
          duration-700
          group-hover:bg-black/10
        "
      />

      {/* Number */}
      <div
        className="
          absolute
          left-5 top-5
          z-10

          md:left-7 md:top-7
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.28em]
            text-white/70
          "
        >
          {destination.id}
        </span>
      </div>

      {/* Arrow */}
      <div
        className="
          absolute
          right-5 top-5
          z-10

          flex h-10 w-10
          items-center justify-center

          rounded-full
          border border-white/30
          bg-black/10
          text-white

          backdrop-blur-md

          transition-all
          duration-500

          group-hover:rotate-45
          group-hover:border-white/60
          group-hover:bg-white
          group-hover:text-black

          md:right-7 md:top-7
        "
      >
        <ArrowUpRight size={15} strokeWidth={1.5} />
      </div>

      {/* Bottom information */}
      <div
        className="
          absolute
          bottom-0 left-0 right-0
          z-10

          p-6

          md:p-8
        "
      >
        <div
          className="
            mb-3
            h-px
            w-full
            origin-left
            scale-x-0
            bg-white/50

            transition-transform
            duration-700
            ease-out

            group-hover:scale-x-100
          "
        />

        <div
          className="
            flex
            items-end
            justify-between
            gap-5
          "
        >
          <div>
            <p
              className="
                mb-2
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-white/65
              "
            >
              {destination.region}
            </p>

            <h3
              className="
                font-serif
                text-[2.15rem]
                font-normal
                leading-none
                tracking-[-0.035em]
                text-[#f7f3eb]

                md:text-[clamp(2.3rem,3.2vw,4rem)]
              "
            >
              {destination.name}
            </h3>
          </div>

          <span
            className="
              hidden
              pb-1
              text-[8px]
              uppercase
              tracking-[0.28em]
              text-white/55

              lg:block
            "
          >
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedDestinations() {
  const section = useRef(null);
  const eyebrow = useRef(null);
  const heading = useRef(null);
  const description = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrow.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 78%",
          },
        }
      );

      gsap.fromTo(
        heading.current,
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 72%",
          },
        }
      );

      gsap.fromTo(
        description.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".destination-card",
        {
          opacity: 0,
          y: 90,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.25,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".destinations-grid",
            start: "top 82%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="
        relative
        overflow-hidden
        bg-[#f1eee7]
        px-5
        pb-24
        pt-28
        text-[#111111]

        sm:px-7

        md:px-10
        md:pb-36
        md:pt-36

        lg:px-14

        xl:px-20
      "
    >
      {/* Tiny top divider */}
      <div className="mb-16 h-px w-full bg-black/15 md:mb-24" />

      {/* Header */}
      <div
        className="
          mb-16
          grid
          grid-cols-1
          gap-8

          md:mb-24
          md:grid-cols-12
          md:gap-6
        "
      >
        <div className="md:col-span-3">
          <p
            ref={eyebrow}
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.34em]
              text-black/55
            "
          >
            Selected destinations
          </p>
        </div>

        <div className="md:col-span-6">
          <h2
            ref={heading}
            className="
              max-w-[800px]
              font-serif
              text-[clamp(3.3rem,14vw,5.2rem)]
              font-normal
              leading-[0.86]
              tracking-[-0.055em]

              md:text-[clamp(4.5rem,7vw,8rem)]
            "
          >
            Places worth
            <br />
            going further for.
          </h2>
        </div>

        <div
          className="
            flex
            items-end

            md:col-span-3
          "
        >
          <p
            ref={description}
            className="
              max-w-[330px]
              text-[12px]
              font-normal
              leading-[1.75]
              text-black/55

              md:text-[13px]
            "
          >
            From volcanic roads to quiet temple streets, discover places
            chosen for what they make you feel — not simply where they are.
          </p>
        </div>
      </div>

      {/* =================================================
          DESTINATION GRID
          Desktop = asymmetric editorial composition
          Mobile = immersive vertical cards
      ================================================= */}

      <div
        className="
          destinations-grid

          grid
          grid-cols-1
          gap-3

          md:grid-cols-12
          md:auto-rows-[330px]
          md:gap-3

          lg:auto-rows-[390px]

          xl:auto-rows-[440px]
        "
      >
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.name}
            destination={destination}
          />
        ))}
      </div>

      {/* Bottom editorial line */}
      <div
        className="
          mt-14
          flex
          items-center
          justify-between
          border-t
          border-black/15
          pt-5

          md:mt-20
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-black/45
          "
        >
          Six places · endless ways to experience them
        </span>

        <span
          className="
            hidden
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-black/45

            sm:block
          "
        >
          Veyra / 2026
        </span>
      </div>
    </section>
  );
}