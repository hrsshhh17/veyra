import {
    forwardRef,
    useImperativeHandle,
    useRef,
  } from "react";
  
  import SceneLayer from "./SceneLayer";
  
  const DESKTOP = "/images/cinematic/desert/desktop";
  const MOBILE = "/images/cinematic/desert/mobile";
  
  const DesertScene = forwardRef(function DesertScene(_, ref) {
    const root = useRef(null);
  
    const background = useRef(null);
    const leftCliff = useRef(null);
    const rightCliff = useRef(null);
    const foreground = useRef(null);
    const traveller = useRef(null);
  
    const overlay = useRef(null);
    const content = useRef(null);
  
    useImperativeHandle(ref, () => ({
      root: root.current,
  
      background: background.current,
      leftCliff: leftCliff.current,
      rightCliff: rightCliff.current,
      foreground: foreground.current,
      traveller: traveller.current,
  
      overlay: overlay.current,
      content: content.current,
    }));
  
    return (
      <section
        ref={root}
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
          bg-black
        "
      >
        {/* BACKGROUND */}
        <SceneLayer
          ref={background}
          desktopSrc={`${DESKTOP}/background.png`}
          mobileSrc={`${MOBILE}/background.png`}
          className="z-[1]"
        />
  
        {/* LEFT DESERT ROCK */}
        <SceneLayer
          ref={leftCliff}
          desktopSrc={`${DESKTOP}/rock-left.png`}
          mobileSrc={`${MOBILE}/rock-left.png`}
          className="z-[3]"
        />
  
        {/* RIGHT DESERT ROCK */}
        <SceneLayer
          ref={rightCliff}
          desktopSrc={`${DESKTOP}/rock-right.png`}
          mobileSrc={`${MOBILE}/rock-right.png`}
          className="z-[3]"
        />
  
        {/* BOTTOM FOREGROUND */}
        <SceneLayer
          ref={foreground}
          desktopSrc={`${DESKTOP}/foreground.png`}
          mobileSrc={`${MOBILE}/foreground.png`}
          className="z-[4]"
        />
  
        {/* TRAVELLER */}
        <SceneLayer
          ref={traveller}
          desktopSrc={`${DESKTOP}/traveller.png`}
          mobileSrc={`${MOBILE}/traveller.png`}
          className="z-[5]"
        />
  
        {/* CINEMATIC GRADING */}
        <div
          ref={overlay}
          className="
            pointer-events-none
            absolute inset-0
            z-[6]
            bg-gradient-to-b
            from-black/10
            via-transparent
            to-black/40
          "
        />
  
        {/* TEXT READABILITY */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            z-[7]
            bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.12)_38%,rgba(0,0,0,0)_70%)]
          "
        />
  
        {/* CONTENT */}
        <div
          ref={content}
          className="
            absolute inset-0
            z-20
            flex
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <div className="max-w-5xl">
            <p
              className="
                mb-5
                text-[8px]
                font-medium
                uppercase
                tracking-[0.45em]
                text-white/90
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
  
                md:text-[10px]
                md:tracking-[0.6em]
              "
            >
              Leave the noise behind
            </p>
  
            <h2
              className="
                font-serif
                text-[clamp(2.8rem,13vw,5rem)]
                leading-[0.9]
                tracking-[-0.045em]
                text-[#fffaf0]
                drop-shadow-[0_5px_20px_rgba(0,0,0,0.75)]
  
                md:text-[clamp(4rem,8vw,8rem)]
              "
            >
              SOMEWHERE
              <br />
              QUIETER.
            </h2>
  
            <p
              className="
                mx-auto
                mt-6
                max-w-[310px]
                text-[11px]
                font-light
                leading-relaxed
                tracking-[0.08em]
                text-white/95
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
  
                md:mt-8
                md:max-w-xl
                md:text-base
              "
            >
              Different landscapes. A deeper you.
            </p>
          </div>
        </div>
      </section>
    );
  });
  
  export default DesertScene;