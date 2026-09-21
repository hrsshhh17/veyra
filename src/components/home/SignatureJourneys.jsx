import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journeys = [
  {
    number: "01",
    title: "Nordic Silence",
    destinationSlug: "iceland",
    location: "Iceland",
    duration: "8 days",
    image: "/images/journeys/nordic-silence.webp",
    description:
      "Volcanic roads, isolated stays and long stretches of landscape where silence becomes part of the journey.",
  },
  {
    number: "02",
    title: "Mediterranean Slow",
    destinationSlug: "amalfi-coast",
    location: "Southern Italy",
    duration: "7 days",
    image: "/images/journeys/mediterranean-slow.webp",
    description:
      "A slower passage along the Mediterranean — quiet coves, coastal villages and days shaped by the sea.",
  },
  {
    number: "03",
    title: "Japan After Dark",
    destinationSlug: "kyoto",
    location: "Kyoto, Japan",
    duration: "6 days",
    image: "/images/journeys/japan-after-dark.webp",
    description:
      "Lantern-lit streets, hidden neighbourhoods and intimate evenings revealing another side of Japan.",
  },
  {
    number: "04",
    title: "Into Patagonia",
    destinationSlug: "patagonia",
    location: "Patagonia",
    duration: "10 days",
    image: "/images/journeys/wild-patagonia.webp",
    description:
      "A remote expedition through glacial valleys and granite wilderness at the far edge of the continent.",
  },
];

function Journey({ journey, index }) {
  const item = useRef(null);
  const image = useRef(null);
  const imageWrap = useRef(null);
  const content = useRef(null);
  const line = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrap.current,
        {
          clipPath: "inset(12% 0% 12% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: item.current,
            start: "top 90%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        image.current,
        {
          scale: 1.13,
          yPercent: -3,
        },
        {
          scale: 1.02,
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: item.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        content.current,
        {
          opacity: 0,
          y: 55,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item.current,
            start: "top 65%",
          },
        }
      );

      gsap.fromTo(
        line.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.3,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: item.current,
            start: "top 60%",
          },
        }
      );
    }, item);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={item}
      className="
        relative
        border-t
        border-white/15
        py-14

        md:py-20

        lg:min-h-[92vh]
        lg:py-24
      "
    >
      <div
        className="
          grid
          grid-cols-1
          gap-10

          lg:grid-cols-12
          lg:items-center
          lg:gap-10
        "
      >
        {/* ========================================
            TEXT
        ======================================== */}
        <div
          ref={content}
          className={`
            order-2
            lg:order-none
            lg:col-span-4

            ${index % 2 === 1 ? "lg:order-2 lg:col-start-9" : ""}
          `}
        >
          <div className="mb-12 flex items-center justify-between lg:mb-20">
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.32em]
                text-white/45
              "
            >
              Journey {journey.number}
            </span>

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.28em]
                text-white/45
              "
            >
              {journey.duration}
            </span>
          </div>

          <p
            className="
              mb-5
              text-[9px]
              uppercase
              tracking-[0.34em]
              text-white/55
            "
          >
            {journey.location}
          </p>

          <h3
            className="
              max-w-[520px]
              font-serif
              text-[clamp(3.3rem,12vw,5.4rem)]
              font-normal
              leading-[0.88]
              tracking-[-0.055em]
              text-[#f4f0e8]

              lg:text-[clamp(4rem,5.2vw,6.5rem)]
            "
          >
            {journey.title}
          </h3>

          <div
            ref={line}
            className="
              my-8
              h-px
              w-full
              origin-left
              bg-white/20

              lg:my-10
            "
          />

          <p
            className="
              max-w-[390px]
              text-[12px]
              leading-[1.85]
              text-white/55

              md:text-[13px]
            "
          >
            {journey.description}
          </p>

          <Link
            to={`/destinations/${journey.destinationSlug}`}
            className="
              group
              mt-9
              inline-flex
              items-center
              gap-4

              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/75

              transition-colors
              duration-300

              hover:text-white
            "
          >
            Discover journey

            <span
              className="
                flex h-9 w-9
                items-center justify-center

                rounded-full
                border border-white/25

                transition-all
                duration-500

                group-hover:rotate-45
                group-hover:border-white
                group-hover:bg-white
                group-hover:text-black
              "
            >
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </span>
          </Link>
        </div>

        {/* ========================================
            IMAGE
        ======================================== */}
        <div
          ref={imageWrap}
          className={`
            order-1
            relative
            h-[58vh]
            min-h-[430px]
            overflow-hidden
            bg-[#161616]

            lg:order-none
            lg:col-span-7
            lg:h-[72vh]
            lg:min-h-[620px]

            ${
              index % 2 === 0
                ? "lg:col-start-6"
                : "lg:col-start-1 lg:row-start-1"
            }
          `}
        >
          <img
            ref={image}
            src={journey.image}
            alt={journey.title}
            loading="lazy"
            draggable="false"
            className="
              absolute
              -inset-[6%]
              h-[112%]
              w-[112%]
              object-cover
              object-center
              will-change-transform
            "
          />

          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-t
              from-black/35
              via-transparent
              to-black/10
            "
          />

          <div
            className="
              absolute
              bottom-5 left-5
              flex
              items-center
              gap-3

              md:bottom-7
              md:left-7
            "
          >
            <span className="h-px w-8 bg-white/60" />

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-white/70
              "
            >
              Veyra Signature
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SignatureJourneys() {
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
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 75%",
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
          duration: 1.2,
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
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 70%",
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
        bg-[#0b0b0b]
        px-5
        pb-20
        pt-28
        text-white

        sm:px-7

        md:px-10
        md:pb-28
        md:pt-36

        lg:px-14

        xl:px-20
      "
    >
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        className="
          mb-24
          grid
          grid-cols-1
          gap-8

          md:grid-cols-12
          md:gap-6

          lg:mb-36
        "
      >
        <div className="md:col-span-3">
          <p
            ref={eyebrow}
            className="
              text-[9px]
              uppercase
              tracking-[0.34em]
              text-white/45
            "
          >
            Signature journeys
          </p>
        </div>

        <div className="md:col-span-6">
          <h2
            ref={heading}
            className="
              font-serif
              text-[clamp(3.4rem,14vw,5.4rem)]
              font-normal
              leading-[0.87]
              tracking-[-0.055em]
              text-[#f4f0e8]

              md:text-[clamp(4.8rem,7vw,8.5rem)]
            "
          >
            Not itineraries.
            <br />
            Stories in motion.
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
              leading-[1.8]
              text-white/50

              md:text-[13px]
            "
          >
            Thoughtfully paced journeys shaped around landscape, culture and
            the moments that stay with you long after you return.
          </p>
        </div>
      </div>

      {/* ========================================
          JOURNEYS
      ======================================== */}

      <div>
        {journeys.map((journey, index) => (
          <Journey
            key={journey.title}
            journey={journey}
            index={index}
          />
        ))}
      </div>

      {/* ========================================
          FOOT
      ======================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-white/15
          pt-5
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/35
          "
        >
          Designed for the journey, not the checklist
        </span>

        <span
          className="
            hidden
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/35

            sm:block
          "
        >
          Veyra / Signature Collection
        </span>
      </div>
    </section>
  );
}