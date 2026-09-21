import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MountainScene from "./MountainScene";
import CoastScene from "./CoastScene";
import DesertScene from "./DesertScene";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicExperience() {
  const section = useRef(null);

  const mountain = useRef(null);
  const coast = useRef(null);
  const desert = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mountainScene = mountain.current;
      const coastScene = coast.current;
      const desertScene = desert.current;

      if (!mountainScene || !coastScene || !desertScene) return;

      const mm = gsap.matchMedia();

      // =====================================================
      // DESKTOP
      // =====================================================

      mm.add("(min-width: 768px)", () => {
        // =================================================
        // INITIAL SCENE VISIBILITY
        // =================================================

        gsap.set(mountainScene.root, {
          autoAlpha: 1,
          zIndex: 3,
        });

        gsap.set(coastScene.root, {
          autoAlpha: 0,
          zIndex: 4,
          clipPath: "inset(100% 0% 0% 0%)",
        });

        gsap.set(desertScene.root, {
          autoAlpha: 0,
          zIndex: 5,
          clipPath: "inset(100% 0% 0% 0%)",
        });

        // =================================================
        // MOUNTAIN
        // =================================================

        gsap.set(mountainScene.background, {
          scale: 1.01,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center center",
        });

        if (mountainScene.mountains) {
          gsap.set(mountainScene.mountains, {
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            transformOrigin: "center center",
          });
        }

        gsap.set(mountainScene.leftCliff, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "left center",
        });

        gsap.set(mountainScene.rightCliff, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "right center",
        });

        gsap.set(mountainScene.foreground, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center bottom",
        });

        gsap.set(mountainScene.traveller, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "center bottom",
        });

        gsap.set(mountainScene.content, {
          opacity: 1,
          y: 0,
          scale: 1,
        });

        gsap.set(mountainScene.scrollIndicator, {
          opacity: 1,
        });

        // =================================================
        // COAST
        // =================================================

        gsap.set(coastScene.background, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center center",
        });

        gsap.set(coastScene.leftCliff, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "left center",
        });

        gsap.set(coastScene.rightCliff, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "right center",
        });

        gsap.set(coastScene.foreground, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center bottom",
        });

        gsap.set(coastScene.content, {
          opacity: 0,
          y: 35,
        });

        // =================================================
        // DESERT
        // =================================================

        gsap.set(desertScene.background, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center center",
        });

        gsap.set(desertScene.leftCliff, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "left center",
        });

        gsap.set(desertScene.rightCliff, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "right center",
        });

        gsap.set(desertScene.foreground, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "center bottom",
        });

        gsap.set(desertScene.traveller, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "center bottom",
        });

        gsap.set(desertScene.content, {
          opacity: 0,
          y: 35,
        });

        // =================================================
        // MASTER TIMELINE
        //
        // ~15 viewport heights of scroll.
        // =================================================

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 9.5}`,
            scrub: 0.38,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // =================================================
        // 01 — MOUNTAIN HERO HOLD
        // =================================================

        tl.to(
          mountainScene.background,
          {
            scale: 1.018,
            ease: "none",
            duration: 2.5,
          },
          0
        );

        // =================================================
        // 02 — MOUNTAIN CAMERA PUSH
        // =================================================

        tl.to(
          mountainScene.background,
          {
            scale: 1.055,
            ease: "none",
            duration: 3,
          },
          2.5
        );

        if (mountainScene.mountains) {
          tl.to(
            mountainScene.mountains,
            {
              scale: 1.02,
              ease: "none",
              duration: 3,
            },
            2.5
          );
        }

        tl.to(
          mountainScene.leftCliff,
          {
            xPercent: -3,
            scale: 1.025,
            ease: "none",
            duration: 3,
          },
          2.5
        );

        tl.to(
          mountainScene.rightCliff,
          {
            xPercent: 3,
            scale: 1.025,
            ease: "none",
            duration: 3,
          },
          2.5
        );

        tl.to(
          mountainScene.foreground,
          {
            yPercent: 2,
            scale: 1.035,
            ease: "none",
            duration: 3,
          },
          2.5
        );

        tl.to(
          mountainScene.traveller,
          {
            yPercent: 2,
            scale: 1.035,
            ease: "none",
            duration: 3,
          },
          2.5
        );

        // =================================================
        // 03 — HERO UI LEAVES
        // =================================================

        tl.to(
          mountainScene.content,
          {
            opacity: 0,
            y: -45,
            scale: 0.97,
            ease: "power2.in",
            duration: 1.5,
          },
          4.3
        );

        tl.to(
          mountainScene.scrollIndicator,
          {
            opacity: 0,
            ease: "power1.in",
            duration: 1,
          },
          4.1
        );

        // =================================================
        // 04 — MOUNTAIN OPENS
        // =================================================

        tl.to(
          mountainScene.leftCliff,
          {
            xPercent: -42,
            scale: 1.07,
            ease: "power2.inOut",
            duration: 4,
          },
          5.5
        );

        tl.to(
          mountainScene.rightCliff,
          {
            xPercent: 42,
            scale: 1.07,
            ease: "power2.inOut",
            duration: 4,
          },
          5.5
        );

        tl.to(
          mountainScene.foreground,
          {
            yPercent: 27,
            scale: 1.1,
            ease: "power2.inOut",
            duration: 4,
          },
          5.5
        );

        tl.to(
          mountainScene.traveller,
          {
            yPercent: 27,
            scale: 1.1,
            opacity: 0,
            ease: "power2.inOut",
            duration: 4,
          },
          5.5
        );

        tl.to(
          mountainScene.background,
          {
            scale: 1.09,
            ease: "none",
            duration: 4,
          },
          5.5
        );

        // =================================================
        // 05 — COAST REVEAL
        // =================================================

        tl.set(
          coastScene.root,
          {
            autoAlpha: 1,
          },
          8.2
        );

        tl.to(
          coastScene.root,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: 3.2,
          },
          8.2
        );

        tl.fromTo(
          coastScene.background,
          {
            scale: 1.035,
          },
          {
            scale: 1,
            ease: "power1.out",
            duration: 3.2,
          },
          8.2
        );

        tl.to(
          coastScene.content,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 1.8,
          },
          9.5
        );

        tl.set(
          mountainScene.root,
          {
            autoAlpha: 0,
          },
          11.4
        );

        // =================================================
        // 06 — COAST BREATHING ROOM
        //
        // Very subtle movement.
        // User gets time to actually see/read the scene.
        // =================================================

        tl.to(
          coastScene.background,
          {
            scale: 1.012,
            ease: "none",
            duration: 4,
          },
          11.4
        );

        tl.to(
          coastScene.leftCliff,
          {
            xPercent: -2,
            ease: "none",
            duration: 4,
          },
          11.4
        );

        tl.to(
          coastScene.rightCliff,
          {
            xPercent: 2,
            ease: "none",
            duration: 4,
          },
          11.4
        );

        tl.to(
          coastScene.foreground,
          {
            yPercent: 2,
            scale: 1.012,
            ease: "none",
            duration: 4,
          },
          11.4
        );

        // =================================================
        // 07 — COAST PARALLAX
        // =================================================

        tl.to(
          coastScene.background,
          {
            scale: 1.045,
            ease: "none",
            duration: 4.5,
          },
          15.4
        );

        tl.to(
          coastScene.leftCliff,
          {
            xPercent: -22,
            scale: 1.035,
            ease: "power1.inOut",
            duration: 4.5,
          },
          15.4
        );

        tl.to(
          coastScene.rightCliff,
          {
            xPercent: 22,
            scale: 1.035,
            ease: "power1.inOut",
            duration: 4.5,
          },
          15.4
        );

        tl.to(
          coastScene.foreground,
          {
            yPercent: 14,
            scale: 1.05,
            ease: "power1.inOut",
            duration: 4.5,
          },
          15.4
        );

        // Keep coast text visible for most of scene.

        tl.to(
          coastScene.content,
          {
            opacity: 0,
            y: -40,
            ease: "power2.in",
            duration: 1.5,
          },
          18.2
        );

        // =================================================
        // 08 — DESERT REVEAL
        // =================================================

        tl.set(
          desertScene.root,
          {
            autoAlpha: 1,
          },
          19.2
        );

        tl.to(
          desertScene.root,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: 3.2,
          },
          19.2
        );

        tl.to(
          desertScene.content,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 1.8,
          },
          20.6
        );

        tl.set(
          coastScene.root,
          {
            autoAlpha: 0,
          },
          22.4
        );

        // =================================================
        // 09 — DESERT BREATHING ROOM
        // =================================================

        tl.to(
          desertScene.background,
          {
            scale: 1.012,
            ease: "none",
            duration: 4,
          },
          22.4
        );

        // Rocks, traveller and foreground deliberately
        // stay almost locked here.

        tl.to(
          desertScene.foreground,
          {
            yPercent: 1.5,
            scale: 1.008,
            ease: "none",
            duration: 4,
          },
          22.4
        );

        tl.to(
          desertScene.traveller,
          {
            yPercent: 1,
            scale: 1.006,
            ease: "none",
            duration: 4,
          },
          22.4
        );

        // =================================================
        // 10 — DESERT FINAL PARALLAX
        // =================================================

        tl.to(
          desertScene.background,
          {
            scale: 1.045,
            ease: "none",
            duration: 4.5,
          },
          26.4
        );

        tl.to(
          desertScene.leftCliff,
          {
            xPercent: -18,
            scale: 1.035,
            ease: "power1.inOut",
            duration: 4.5,
          },
          26.4
        );

        tl.to(
          desertScene.rightCliff,
          {
            xPercent: 18,
            scale: 1.035,
            ease: "power1.inOut",
            duration: 4.5,
          },
          26.4
        );

        tl.to(
          desertScene.foreground,
          {
            yPercent: 12,
            scale: 1.045,
            ease: "power1.inOut",
            duration: 4.5,
          },
          26.4
        );

        tl.to(
          desertScene.traveller,
          {
            yPercent: 8,
            scale: 1.03,
            ease: "power1.inOut",
            duration: 4.5,
          },
          26.4
        );
      });

      // =====================================================
      // MOBILE
      // =====================================================

      mm.add("(max-width: 767px)", () => {
        // =================================================
        // INITIAL VISIBILITY
        // =================================================

        gsap.set(mountainScene.root, {
          autoAlpha: 1,
          zIndex: 3,
        });

        gsap.set(coastScene.root, {
          autoAlpha: 0,
          zIndex: 4,
          clipPath: "inset(100% 0% 0% 0%)",
        });

        gsap.set(desertScene.root, {
          autoAlpha: 0,
          zIndex: 5,
          clipPath: "inset(100% 0% 0% 0%)",
        });

        // =================================================
        // MOUNTAIN MOBILE
        // KEEP 0.62
        // =================================================

        gsap.set(mountainScene.background, {
          scale: 1,
          transformOrigin: "center center",
        });

        gsap.set(mountainScene.leftCliff, {
          scaleX: 0.62,
          scaleY: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "left center",
        });

        gsap.set(mountainScene.rightCliff, {
          scaleX: 0.62,
          scaleY: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "right center",
        });

        gsap.set(mountainScene.foreground, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center bottom",
        });

        gsap.set(mountainScene.traveller, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "center bottom",
        });

        gsap.set(mountainScene.content, {
          opacity: 1,
          y: 0,
          scale: 1,
        });

        gsap.set(mountainScene.scrollIndicator, {
          opacity: 1,
        });

        // =================================================
        // COAST MOBILE
        // KEEP 0.62
        // =================================================

        gsap.set(coastScene.background, {
          scale: 1,
          transformOrigin: "center center",
        });

        gsap.set(coastScene.leftCliff, {
          scaleX: 0.62,
          scaleY: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "left center",
        });

        gsap.set(coastScene.rightCliff, {
          scaleX: 0.62,
          scaleY: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "right center",
        });

        gsap.set(coastScene.foreground, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center bottom",
        });

        gsap.set(coastScene.content, {
          opacity: 0,
          y: 30,
        });

        // =================================================
        // DESERT MOBILE
        // KEEP 0.62
        // =================================================

        gsap.set(desertScene.background, {
          scale: 1,
          transformOrigin: "center center",
        });

        gsap.set(desertScene.leftCliff, {
          scaleX: 0.62,
          scaleY: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "left center",
        });

        gsap.set(desertScene.rightCliff, {
          scaleX: 0.62,
          scaleY: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "right center",
        });

        gsap.set(desertScene.foreground, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "center bottom",
        });

        gsap.set(desertScene.traveller, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          transformOrigin: "center bottom",
        });

        gsap.set(desertScene.content, {
          opacity: 0,
          y: 30,
        });

        // =================================================
        // MOBILE MASTER TIMELINE
        //
        // ~13 viewport heights.
        // =================================================

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 9}`,
            scrub: 0.42,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // =================================================
        // 01 — MOUNTAIN HOLD
        // =================================================

        tl.to(
          mountainScene.background,
          {
            scale: 1.008,
            ease: "none",
            duration: 2.2,
          },
          0
        );

        // =================================================
        // 02 — MOUNTAIN PUSH
        // =================================================

        tl.to(
          mountainScene.background,
          {
            scale: 1.025,
            ease: "none",
            duration: 3,
          },
          2.2
        );

        tl.to(
          mountainScene.leftCliff,
          {
            scaleX: 0.62,
            xPercent: -2,
            ease: "none",
            duration: 3,
          },
          2.2
        );

        tl.to(
          mountainScene.rightCliff,
          {
            scaleX: 0.62,
            xPercent: 2,
            ease: "none",
            duration: 3,
          },
          2.2
        );

        tl.to(
          mountainScene.foreground,
          {
            yPercent: 2,
            scale: 1.012,
            ease: "none",
            duration: 3,
          },
          2.2
        );

        tl.to(
          mountainScene.traveller,
          {
            yPercent: 2,
            scale: 1.012,
            ease: "none",
            duration: 3,
          },
          2.2
        );

        tl.to(
          mountainScene.content,
          {
            opacity: 0,
            y: -30,
            scale: 0.98,
            ease: "power2.in",
            duration: 1.3,
          },
          4
        );

        tl.to(
          mountainScene.scrollIndicator,
          {
            opacity: 0,
            duration: 0.9,
          },
          3.8
        );

        // =================================================
        // 03 — MOUNTAIN OPENS
        // =================================================

        tl.to(
          mountainScene.leftCliff,
          {
            scaleX: 0.62,
            xPercent: -20,
            ease: "power2.inOut",
            duration: 3.5,
          },
          5.2
        );

        tl.to(
          mountainScene.rightCliff,
          {
            scaleX: 0.62,
            xPercent: 20,
            ease: "power2.inOut",
            duration: 3.5,
          },
          5.2
        );

        tl.to(
          mountainScene.foreground,
          {
            yPercent: 14,
            scale: 1.03,
            ease: "power2.inOut",
            duration: 3.5,
          },
          5.2
        );

        tl.to(
          mountainScene.traveller,
          {
            yPercent: 14,
            scale: 1.03,
            opacity: 0,
            ease: "power2.inOut",
            duration: 3.5,
          },
          5.2
        );

        // =================================================
        // 04 — COAST REVEAL
        // =================================================

        tl.set(
          coastScene.root,
          {
            autoAlpha: 1,
          },
          7.6
        );

        tl.to(
          coastScene.root,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: 3,
          },
          7.6
        );

        tl.fromTo(
          coastScene.background,
          {
            scale: 1.02,
          },
          {
            scale: 1,
            ease: "power1.out",
            duration: 3,
          },
          7.6
        );

        tl.to(
          coastScene.content,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 1.6,
          },
          8.8
        );

        tl.set(
          mountainScene.root,
          {
            autoAlpha: 0,
          },
          10.6
        );

        // =================================================
        // 05 — COAST HOLD
        // =================================================

        tl.to(
          coastScene.background,
          {
            scale: 1.01,
            ease: "none",
            duration: 4,
          },
          10.6
        );

        tl.to(
          coastScene.leftCliff,
          {
            scaleX: 0.62,
            xPercent: -2,
            ease: "none",
            duration: 4,
          },
          10.6
        );

        tl.to(
          coastScene.rightCliff,
          {
            scaleX: 0.62,
            xPercent: 2,
            ease: "none",
            duration: 4,
          },
          10.6
        );

        // =================================================
        // 06 — COAST SLOW PARALLAX
        // =================================================

        tl.to(
          coastScene.background,
          {
            scale: 1.03,
            ease: "none",
            duration: 4.2,
          },
          14.6
        );

        tl.to(
          coastScene.leftCliff,
          {
            scaleX: 0.62,
            xPercent: -16,
            ease: "power1.inOut",
            duration: 4.2,
          },
          14.6
        );

        tl.to(
          coastScene.rightCliff,
          {
            scaleX: 0.62,
            xPercent: 16,
            ease: "power1.inOut",
            duration: 4.2,
          },
          14.6
        );

        tl.to(
          coastScene.foreground,
          {
            yPercent: 11,
            scale: 1.025,
            ease: "power1.inOut",
            duration: 4.2,
          },
          14.6
        );

        tl.to(
          coastScene.content,
          {
            opacity: 0,
            y: -30,
            ease: "power2.in",
            duration: 1.3,
          },
          17
        );

        // =================================================
        // 07 — DESERT REVEAL
        // =================================================

        tl.set(
          desertScene.root,
          {
            autoAlpha: 1,
          },
          18
        );

        tl.to(
          desertScene.root,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: 3,
          },
          18
        );

        tl.to(
          desertScene.content,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 1.6,
          },
          19.2
        );

        tl.set(
          coastScene.root,
          {
            autoAlpha: 0,
          },
          21
        );

        // =================================================
        // 08 — DESERT HOLD
        // =================================================

        tl.to(
          desertScene.background,
          {
            scale: 1.01,
            ease: "none",
            duration: 4,
          },
          21
        );

        tl.to(
          desertScene.foreground,
          {
            yPercent: 1,
            scale: 1.006,
            ease: "none",
            duration: 4,
          },
          21
        );

        tl.to(
          desertScene.traveller,
          {
            yPercent: 0.8,
            scale: 1.005,
            ease: "none",
            duration: 4,
          },
          21
        );

        // =================================================
        // 09 — DESERT FINAL PARALLAX
        // =================================================

        tl.to(
          desertScene.background,
          {
            scale: 1.03,
            ease: "none",
            duration: 4.2,
          },
          25
        );

        tl.to(
          desertScene.leftCliff,
          {
            scaleX: 0.62,
            xPercent: -15,
            ease: "power1.inOut",
            duration: 4.2,
          },
          25
        );

        tl.to(
          desertScene.rightCliff,
          {
            scaleX: 0.62,
            xPercent: 15,
            ease: "power1.inOut",
            duration: 4.2,
          },
          25
        );

        tl.to(
          desertScene.foreground,
          {
            yPercent: 10,
            scale: 1.025,
            ease: "power1.inOut",
            duration: 4.2,
          },
          25
        );

        tl.to(
          desertScene.traveller,
          {
            yPercent: 7,
            scale: 1.02,
            ease: "power1.inOut",
            duration: 4.2,
          },
          25
        );
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={section}
      className="
        relative
        h-[100svh]
        w-full
        overflow-hidden
        bg-black
        md:h-screen
      "
    >
      <MountainScene ref={mountain} />
      <CoastScene ref={coast} />
      <DesertScene ref={desert} />
    </section>
  );
}