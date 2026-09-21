import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: "01",
    title: "Wilderness",
    subtitle: "Go where silence gets louder.",
    image: "/images/experiences/wilderness.webp",
    description:
      "Remote landscapes, open horizons and journeys shaped by the wild.",
  },
  {
    number: "02",
    title: "Culture",
    subtitle: "Travel deeper than the surface.",
    image: "/images/experiences/culture.webp",
    description:
      "Local rituals, living traditions and encounters that reveal the soul of a place.",
  },
  {
    number: "03",
    title: "Coast",
    subtitle: "Follow the edge of the world.",
    image: "/images/experiences/coast.webp",
    description:
      "Hidden coves, open water and unhurried days shaped by the sea.",
  },
  {
    number: "04",
    title: "Retreat",
    subtitle: "Disappear for a while.",
    image: "/images/experiences/retreat.webp",
    description:
      "Private spaces, remote stays and quiet places designed for slowing down.",
  },
];

export default function TravelExperiences() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const panelsRef = useRef([]);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        introRef.current,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 90%",
          },
        }
      );

      panelsRef.current.forEach((panel, index) => {
        if (!panel) return;

        gsap.fromTo(
          panel,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: index * 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 92%",
            },
          }
        );

        const image = panel.querySelector(".experience-image");

        gsap.fromTo(
          image,
          {
            yPercent: -5,
            scale: 1.08,
          },
          {
            yPercent: 5,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#eeeae1]
        px-5
        py-28
        text-[#111]

        sm:px-7
        md:px-10
        md:py-36
        lg:px-14
        xl:px-20
      "
    >
      {/* HEADER */}

      <div className="mb-16 border-t border-black/15 pt-6 md:mb-24">
        <div
          className="
            grid grid-cols-1
            gap-9

            md:grid-cols-12
            md:gap-6
          "
        >
          <div className="md:col-span-3">
            <p
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.34em]
                text-black/50
              "
            >
              Travel experiences
            </p>
          </div>

          <div className="md:col-span-6">
            <h2
              ref={headingRef}
              className="
                max-w-[900px]
                font-serif
                text-[clamp(3.5rem,14vw,5.5rem)]
                font-normal
                leading-[0.87]
                tracking-[-0.055em]

                md:text-[clamp(4.8rem,7vw,8.5rem)]
              "
            >
              Choose how
              <br />
              you want to feel.
            </h2>
          </div>

          <div className="flex items-end md:col-span-3">
            <p
              ref={introRef}
              className="
                max-w-[330px]
                text-[12px]
                leading-[1.8]
                text-black/55

                md:text-[13px]
              "
            >
              Some journeys begin with a destination. Others begin with a
              feeling. Start with the experience you want to carry home.
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP EXPERIENCE PANELS */}

      <div
        className="
          hidden
          h-[78vh]
          min-h-[650px]
          w-full
          gap-[3px]

          lg:flex
        "
        onMouseLeave={() => setActiveIndex(null)}
      >
        {experiences.map((experience, index) => {
          const active = activeIndex === index;
          const somethingActive = activeIndex !== null;

          return (
            <article
              key={experience.title}
              onClick={() => navigate(`/explore?experience=${encodeURIComponent(experience.title.toLowerCase())}`)}
              ref={(element) => {
                panelsRef.current[index] = element;
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className="
                group
                relative
                min-w-0
                cursor-pointer
                overflow-hidden
                bg-[#111]
              "
              style={{
                flex: active
                  ? "2.15 1 0%"
                  : somethingActive
                    ? "0.78 1 0%"
                    : "1 1 0%",
                transition:
                  "flex 900ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* IMAGE */}

              <img
                src={experience.image}
                alt={experience.title}
                draggable="false"
                className="
                  experience-image
                  absolute
                  -inset-[5%]
                  h-[110%]
                  w-[110%]
                  object-cover
                  object-center
                  will-change-transform
                "
              />

              {/* DARK OVERLAY */}

              <div
                className="absolute inset-0 transition-colors duration-700"
                style={{
                  backgroundColor:
                    somethingActive && !active
                      ? "rgba(0,0,0,0.58)"
                      : active
                        ? "rgba(0,0,0,0.20)"
                        : "rgba(0,0,0,0.34)",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />

              {/* NUMBER */}

              <div className="absolute left-6 top-6 z-10">
                <span className="text-[9px] tracking-[0.3em] text-white/60">
                  {experience.number}
                </span>
              </div>

              {/* ARROW */}

              <div
                className="
                  absolute
                  right-6 top-6
                  z-10

                  flex h-10 w-10
                  items-center justify-center

                  rounded-full
                  border border-white/30

                  text-white

                  transition-all
                  duration-500

                  group-hover:rotate-45
                  group-hover:border-white
                  group-hover:bg-white
                  group-hover:text-black
                "
              >
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </div>

              {/* CONTENT */}

              <div
                className="
                  absolute
                  bottom-0 left-0
                  z-10
                  w-full
                  p-7

                  xl:p-9
                "
              >
                <p
                  className="
                    mb-4
                    whitespace-nowrap
                    text-[8px]
                    uppercase
                    tracking-[0.3em]
                    text-white/55
                  "
                >
                  {experience.subtitle}
                </p>

                <h3
                  className="
                    whitespace-nowrap
                    font-serif
                    text-[clamp(2.3rem,3.5vw,4.8rem)]
                    font-normal
                    leading-none
                    tracking-[-0.045em]
                    text-[#f6f2e9]
                  "
                >
                  {experience.title}
                </h3>

                <div
                  className="
                    grid
                    transition-all
                    duration-700
                    ease-out
                  "
                  style={{
                    gridTemplateRows: active ? "1fr" : "0fr",
                    opacity: active ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-6">
                      <div className="mb-5 h-px w-full bg-white/25" />

                      <p
                        className="
                          max-w-[410px]
                          text-[12px]
                          leading-[1.75]
                          text-white/65
                        "
                      >
                        {experience.description}
                      </p>

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          gap-3

                          text-[8px]
                          uppercase
                          tracking-[0.28em]
                          text-white/75
                        "
                      >
                        Explore experience

                        <span className="h-px w-8 bg-white/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* MOBILE / TABLET */}

      <div className="space-y-3 lg:hidden">
        {experiences.map((experience, index) => (
          <article
            key={experience.title}
            onClick={() => navigate(`/explore?experience=${encodeURIComponent(experience.title.toLowerCase())}`)}
            ref={(element) => {
              panelsRef.current[index] = element;
            }}
            className="
              relative
              h-[68vh]
              min-h-[520px]
              overflow-hidden
              bg-[#111]
            "
          >
            <img
              src={experience.image}
              alt={experience.title}
              loading="lazy"
              draggable="false"
              className="
                experience-image
                absolute
                -inset-[5%]
                h-[110%]
                w-[110%]
                object-cover
                object-center
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

            <div className="absolute left-5 top-5">
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/60
                "
              >
                {experience.number}
              </span>
            </div>

            <div
              className="
                absolute
                right-5 top-5

                flex h-10 w-10
                items-center justify-center

                rounded-full
                border border-white/30
                text-white
              "
            >
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
              <p
                className="
                  mb-3
                  text-[8px]
                  uppercase
                  tracking-[0.28em]
                  text-white/60
                "
              >
                {experience.subtitle}
              </p>

              <h3
                className="
                  font-serif
                  text-[clamp(3.2rem,14vw,5rem)]
                  leading-[0.9]
                  tracking-[-0.05em]
                  text-[#f6f2e9]
                "
              >
                {experience.title}
              </h3>

              <div className="my-6 h-px w-full bg-white/25" />

              <p
                className="
                  max-w-[390px]
                  text-[12px]
                  leading-[1.75]
                  text-white/65
                "
              >
                {experience.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* FOOTER LINE */}

      <div
        className="
          mt-16
          flex
          items-center
          justify-between
          border-t
          border-black/15
          pt-5

          md:mt-24
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-black/40
          "
        >
          Travel by instinct
        </span>

        <span
          className="
            hidden
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-black/40

            sm:block
          "
        >
          Veyra / Experiences
        </span>
      </div>
    </section>
  );
}