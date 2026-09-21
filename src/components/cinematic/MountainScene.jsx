import {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
  } from "react";

  import { useNavigate } from "react-router-dom";
  
  import SceneLayer from "./SceneLayer";
  
  const DESKTOP = "/images/cinematic/mountain/desktop";
  const MOBILE = "/images/cinematic/mountain/mobile";
  
  const MountainScene = forwardRef(function MountainScene(_, ref) {
    const root = useRef(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
  
    const background = useRef(null);
    const mountains = useRef(null);
    const leftCliff = useRef(null);
    const rightCliff = useRef(null);
    const foreground = useRef(null);
    const traveller = useRef(null);
  
    const content = useRef(null);
    const overlay = useRef(null);
    const scrollIndicator = useRef(null);
  
    useImperativeHandle(ref, () => ({
      root: root.current,
  
      background: background.current,
      mountains: mountains.current,
      leftCliff: leftCliff.current,
      rightCliff: rightCliff.current,
      foreground: foreground.current,
      traveller: traveller.current,
  
      content: content.current,
      overlay: overlay.current,
      scrollIndicator: scrollIndicator.current,
    }));
  
    return (
      <section
        ref={root}
        className="absolute inset-0 overflow-hidden bg-black"
      >
        {/* BACKGROUND */}
  
        <SceneLayer
          ref={background}
          desktopSrc={`${DESKTOP}/background.png`}
          mobileSrc={`${MOBILE}/background.png`}
          className="z-[1]"
        />
  
        {/* MID MOUNTAINS - DESKTOP ONLY */}
  
        <SceneLayer
          ref={mountains}
          desktopSrc={`${DESKTOP}/mountains-mid.png`}
          mobileSrc={`${MOBILE}/mountains-mid.png`}
          className="z-[2] max-md:hidden"
        />
  
        {/* LEFT CLIFF */}
  
        <SceneLayer
          ref={leftCliff}
          desktopSrc={`${DESKTOP}/cliff-left.png`}
          mobileSrc={`${MOBILE}/cliff-left.png`}
          className="z-[4]"
        />
  
        {/* RIGHT CLIFF */}
  
        <SceneLayer
          ref={rightCliff}
          desktopSrc={`${DESKTOP}/cliff-right.png`}
          mobileSrc={`${MOBILE}/cliff-right.png`}
          className="z-[4]"
        />
  
        {/* FOREGROUND */}
  
        <SceneLayer
          ref={foreground}
          desktopSrc={`${DESKTOP}/foreground.png`}
          mobileSrc={`${MOBILE}/foreground.png`}
          className="z-[5]"
        />
  
        {/* TRAVELLER */}
  
        <SceneLayer
          ref={traveller}
          desktopSrc={`${DESKTOP}/traveller.png`}
          mobileSrc={`${MOBILE}/traveller.png`}
          className="z-[6]"
        />
  
        {/* GENERAL CINEMATIC GRADING */}
  
        <div
          ref={overlay}
          className="
            pointer-events-none
            absolute inset-0
            z-[7]
            bg-gradient-to-b
            from-black/15
            via-transparent
            to-black/35
          "
        />
  
        {/* 
          READABILITY OVERLAY
  
          Darkens only the central hero area.
          Background remains visible around it.
        */}
  
        <div
          className="
            pointer-events-none
            absolute inset-0
            z-[8]
            bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.15)_32%,rgba(0,0,0,0)_68%)]
          "
        />
  
        {/* HERO CONTENT */}
  
        <div
          ref={content}
          className="
            absolute inset-0
            z-20
            flex flex-col
            items-center justify-center
            px-5
            text-center
            md:px-6
          "
        >
          <p
            className="
              mb-4
              text-[8px]
              font-medium
              uppercase
              tracking-[0.42em]
              text-white/90
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
  
              sm:text-[9px]
  
              md:mb-5
              md:text-xs
              md:tracking-[0.55em]
            "
          >
            Discover what lies beyond
          </p>
  
          <h1
            className="
              font-serif
              text-[clamp(4rem,21vw,6rem)]
              font-normal
              leading-[0.8]
              tracking-[-0.06em]
              text-[#fffaf0]
              drop-shadow-[0_5px_18px_rgba(0,0,0,0.65)]
  
              md:text-[clamp(4.5rem,11vw,10rem)]
              md:leading-[0.78]
            "
          >
            VEYRA
          </h1>
  
          <p
            className="
              mt-5
              text-[10px]
              font-medium
              tracking-[0.15em]
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
  
              sm:text-xs
  
              md:mt-7
              md:text-base
              md:tracking-[0.18em]
            "
          >
            Travel beyond the familiar.
          </p>
  
          {/* SEARCH */}
  
          <div
            className="
              mt-7
              flex
              w-[88%]
              max-w-[350px]
              items-center
              rounded-full
              border border-white/35
              bg-black/35
              p-1
              shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              backdrop-blur-md
  
              md:mt-10
              md:w-full
              md:max-w-xl
              md:p-1.5
            "
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const query = searchQuery.trim();
                  navigate(query ? `/explore?q=${encodeURIComponent(query)}` : "/explore");
                }
              }}
              placeholder="Where do you want to go?"
              className="
                min-w-0
                flex-1
                bg-transparent
                px-4
                py-2.5
                text-[10px]
                text-white
                outline-none
                placeholder:text-white/75
  
                md:px-6
                md:py-3
                md:text-sm
              "
            />
  
            <button
              type="button"
              onClick={() => {
                const query = searchQuery.trim();
                navigate(query ? `/explore?q=${encodeURIComponent(query)}` : "/explore");
              }}
              aria-label="Search"
              className="
                flex
                h-9 w-9
                shrink-0
                items-center justify-center
                rounded-full
                bg-[#f5f1e8]
                text-base
                text-black
                transition-transform
                active:scale-95
  
                md:h-11
                md:w-11
                md:text-lg
                md:hover:scale-95
              "
            >
              →
            </button>
          </div>
        </div>
  
        {/* SCROLL INDICATOR */}
  
        <div
          ref={scrollIndicator}
          className="
            absolute
            bottom-5
            left-1/2
            z-20
            -translate-x-1/2
            text-center
            text-white/80
  
            md:bottom-8
          "
        >
          <span
            className="
              whitespace-nowrap
              text-[7px]
              font-medium
              uppercase
              tracking-[0.3em]
              drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]
  
              md:text-[9px]
              md:tracking-[0.35em]
            "
          >
            Scroll to explore
          </span>
  
          <div
            className="
              mx-auto
              mt-2
              h-7
              w-px
              bg-white/70
  
              md:mt-3
              md:h-10
            "
          />
        </div>
      </section>
    );
  });
  
  export default MountainScene;