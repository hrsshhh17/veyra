import {
    Suspense,
    useEffect,
    useRef,
    useState,
  } from "react";
  
  import { Canvas } from "@react-three/fiber";
  
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  
  import Globe, {
    destinations,
  } from "./Globe";
  
  import DestinationCards from "./DestinationCards";
  
  gsap.registerPlugin(ScrollTrigger);
  
  export default function WorldExplorer() {
    const section = useRef(null);
  
    const eyebrow = useRef(null);
    const heading = useRef(null);
    const intro = useRef(null);
    const globeWrap = useRef(null);
  
    const globeRef = useRef(null);
  
    const [activeDestination, setActiveDestination] =
      useState(null);
  
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
              start: "top 76%",
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
          intro.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
  
            scrollTrigger: {
              trigger: section.current,
              start: "top 70%",
            },
          }
        );
  
        gsap.fromTo(
          globeWrap.current,
          {
            opacity: 0,
            scale: 0.88,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power4.out",
  
            scrollTrigger: {
              trigger: globeWrap.current,
              start: "top 88%",
            },
          }
        );
      }, section);
  
      return () => ctx.revert();
    }, []);
  
    const selectDestination = (destination) => {
      setActiveDestination(destination);
  
      globeRef.current?.focusDestination(
        destination
      );
    };
  
    return (
      <section
        ref={section}
        className="
          relative
          overflow-hidden
          bg-[#080908]
          px-5
          py-28
          text-white
  
          sm:px-7
  
          md:px-10
          md:py-36
  
          lg:px-14
  
          xl:px-20
        "
      >
        {/* BACKGROUND GLOW */}
  
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[54%]
  
            h-[800px]
            w-[800px]
  
            -translate-x-1/2
            -translate-y-1/2
  
            rounded-full
  
            bg-[#3b8eaf]/[0.035]
  
            blur-[140px]
          "
        />
  
        {/* ===================================================
            HEADER
        =================================================== */}
  
        <div
          className="
            relative
            z-10
  
            grid
            grid-cols-1
            gap-8
  
            md:grid-cols-12
            md:gap-6
          "
        >
          <div className="md:col-span-3">
            <p
              ref={eyebrow}
              className="
                text-[9px]
                uppercase
                tracking-[0.34em]
                text-white/35
              "
            >
              Explore the world
            </p>
          </div>
  
          <div className="md:col-span-6">
            <h2
              ref={heading}
              className="
                font-serif
  
                text-[clamp(3.8rem,15vw,6rem)]
                leading-[0.84]
                tracking-[-0.06em]
  
                text-[#f3efe6]
  
                md:text-[clamp(5.5rem,7.4vw,9rem)]
              "
            >
              The world,
              <br />
              your way.
            </h2>
          </div>
  
          <div
            ref={intro}
            className="
              flex
              items-end
  
              md:col-span-3
            "
          >
            <p
              className="
                max-w-[300px]
  
                text-[11px]
                leading-[1.8]
                text-white/40
              "
            >
              Spin the globe. Follow your curiosity. Every point is the beginning
              of another story.
            </p>
          </div>
        </div>
  
        {/* ===================================================
            WORLD EXPLORER
        =================================================== */}
  
        <div
          className="
            relative
            z-10
  
            mt-16
  
            grid
            grid-cols-1
            gap-12
  
            md:mt-20
  
            lg:grid-cols-12
            lg:items-center
            lg:gap-8
          "
        >
          {/* =================================================
              DESTINATION LIST
          ================================================= */}
  
          <div
            className="
              order-2
  
              lg:order-1
              lg:col-span-3
            "
          >
            <p
              className="
                mb-6
  
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-white/30
              "
            >
              Selected places
            </p>
  
            {destinations.map(
              (destination, index) => {
                const active =
                  activeDestination?.name ===
                  destination.name;
  
                return (
                  <button
                    key={destination.name}
                    type="button"
                    onClick={() =>
                      selectDestination(
                        destination
                      )
                    }
                    className="
                      group
  
                      flex
                      w-full
  
                      items-center
                      justify-between
  
                      border-t
                      border-white/10
  
                      py-4
  
                      text-left
                    "
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`
                          block
                          h-[4px]
                          rounded-full
  
                          transition-all
                          duration-500
  
                          ${
                            active
                              ? "w-5 bg-[#f2d39b]"
                              : "w-0 bg-white/40 group-hover:w-3"
                          }
                        `}
                      />
  
                      <span
                        className={`
                          text-[9px]
                          uppercase
                          tracking-[0.25em]
  
                          transition-colors
                          duration-300
  
                          ${
                            active
                              ? "text-white"
                              : "text-white/45 group-hover:text-white"
                          }
                        `}
                      >
                        {destination.name}
                      </span>
                    </div>
  
                    <span className="text-[7px] text-white/20">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </button>
                );
              }
            )}
  
            <div className="border-t border-white/10" />
          </div>
  
          {/* =================================================
              GLOBE
          ================================================= */}
  
          <div
            ref={globeWrap}
            className="
              order-1
              relative
  
              h-[500px]
  
              sm:h-[620px]
  
              lg:order-2
              lg:col-span-6
              lg:h-[720px]
            "
          >
            <Canvas
              dpr={[1, 1.15]}
              camera={{
                position: [0, 0, 5.6],
                fov: 42,
              }}
              gl={{
                antialias: true,
                alpha: true,
              }}
            >
              <Suspense fallback={null}>
                <Globe
                  ref={globeRef}
                  activeDestination={
                    activeDestination
                  }
                  onSelectDestination={
                    setActiveDestination
                  }
                />
              </Suspense>
            </Canvas>
  
            {/* DRAG LABEL */}
  
            <div
              className="
                pointer-events-none
  
                absolute
                bottom-4
                left-1/2
  
                flex
                -translate-x-1/2
                items-center
                gap-3
  
                whitespace-nowrap
              "
            >
              <span
                className="
                  h-[4px]
                  w-[4px]
  
                  rounded-full
                  bg-[#75c8eb]
                "
              />
  
              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.3em]
                  text-white/30
                "
              >
                Drag to explore
              </span>
            </div>
          </div>
  
          {/* =================================================
              DESTINATION INFORMATION
          ================================================= */}
  
          <div
            className="
              order-3
  
              lg:col-span-3
            "
          >
            <DestinationCards
              activeDestination={
                activeDestination
              }
              onClear={() =>
                setActiveDestination(null)
              }
            />
          </div>
        </div>
  
        {/* ===================================================
            FOOT
        =================================================== */}
  
        <div
          className="
            relative
            z-10
  
            mt-16
  
            flex
            items-center
            justify-between
  
            border-t
            border-white/10
  
            pt-5
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/25
            "
          >
            07 destinations · one world
          </span>
  
          <span
            className="
              hidden
  
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/25
  
              sm:block
            "
          >
            Veyra / World Explorer
          </span>
        </div>
      </section>
    );
  }