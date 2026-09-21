import { Html } from "@react-three/drei";

export default function GlobeMarker({
  position,
  destination,
  active,
  onSelect,
}) {
  return (
    <group position={position}>
      {/* CLICK TARGET */}

      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect(destination);
        }}
      >
        <sphereGeometry args={[0.045, 20, 20]} />

        <meshBasicMaterial
          color={active ? "#ffffff" : "#ded9ce"}
          toneMapped={false}
        />
      </mesh>

      {/* GLOW */}

      <mesh>
        <sphereGeometry args={[active ? 0.095 : 0.075, 20, 20]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={active ? 0.16 : 0.07}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* LABEL */}

      <Html
        center
        occlude
        distanceFactor={8.5}
        zIndexRange={[20, 0]}
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className={`
            translate-y-[-24px]
            whitespace-nowrap
            rounded-full
            border
            px-2.5
            py-1

            text-[7px]
            font-medium
            uppercase
            tracking-[0.22em]

            backdrop-blur-md

            transition-all
            duration-500

            ${
              active
                ? "border-[#f3efe6] bg-[#f3efe6] text-[#111]"
                : "border-white/20 bg-black/60 text-white/65"
            }
          `}
        >
          {destination.name}
        </div>
      </Html>
    </group>
  );
}