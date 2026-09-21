import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
  } from "react";
  
  import { OrbitControls, useTexture } from "@react-three/drei";
  import { useFrame } from "@react-three/fiber";
  
  import * as THREE from "three";
  import { feature } from "topojson-client";
  import worldData from "world-atlas/countries-110m.json";
  
  import GlobeMarker from "./GlobeMarker";
  
  /* =========================================================
     DESTINATIONS
  ========================================================= */
  
  export const destinations = [
    {
      name: "Iceland",
      region: "Nordic Wilderness",
      lat: 64.9631,
      lon: -19.0208,
    },
    {
      name: "Italy",
      region: "Mediterranean",
      lat: 41.8719,
      lon: 12.5674,
    },
    {
      name: "India",
      region: "South Asia",
      lat: 20.5937,
      lon: 78.9629,
    },
    {
      name: "Japan",
      region: "East Asia",
      lat: 36.2048,
      lon: 138.2529,
    },
    {
      name: "Bali",
      region: "Indonesia",
      lat: -8.3405,
      lon: 115.092,
    },
    {
      name: "Namibia",
      region: "Southern Africa",
      lat: -22.9576,
      lon: 18.4904,
    },
    {
      name: "Patagonia",
      region: "Argentina · Chile",
      lat: -48.5,
      lon: -73,
    },
  ];
  
  /* =========================================================
     COORDINATE CONVERSION
  ========================================================= */
  
  export function latLonToVector3(lat, lon, radius = 2) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon + 180);
  
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }
  
  /* =========================================================
     WORLD DATA
  ========================================================= */
  
  const countries = feature(
    worldData,
    worldData.objects.countries
  ).features;
  
  /* =========================================================
     COUNTRY BORDERS
  ========================================================= */
  
  function CountryOutlines() {
    const geometry = useMemo(() => {
      const positions = [];
  
      const addRing = (ring) => {
        if (!ring || ring.length < 2) return;
  
        for (let i = 0; i < ring.length - 1; i++) {
          const [lon1, lat1] = ring[i];
          const [lon2, lat2] = ring[i + 1];
  
          if (Math.abs(lon1 - lon2) > 180) continue;
  
          const a = latLonToVector3(lat1, lon1, 2.018);
          const b = latLonToVector3(lat2, lon2, 2.018);
  
          positions.push(
            a.x,
            a.y,
            a.z,
            b.x,
            b.y,
            b.z
          );
        }
      };
  
      countries.forEach((country) => {
        const geometryData = country.geometry;
  
        if (!geometryData) return;
  
        if (geometryData.type === "Polygon") {
          geometryData.coordinates.forEach(addRing);
        }
  
        if (geometryData.type === "MultiPolygon") {
          geometryData.coordinates.forEach((polygon) => {
            polygon.forEach(addRing);
          });
        }
      });
  
      const buffer = new THREE.BufferGeometry();
  
      buffer.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
  
      return buffer;
    }, []);
  
    useEffect(() => {
      return () => geometry.dispose();
    }, [geometry]);
  
    return (
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color="#f3efe5"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </lineSegments>
    );
  }
  
  /* =========================================================
     LATITUDE / LONGITUDE GRID
  ========================================================= */
  
  function GlobeGrid() {
    const geometry = useMemo(() => {
      const vertices = [];
      const radius = 2.009;
  
      /* Latitude */
  
      for (let lat = -60; lat <= 60; lat += 30) {
        for (let lon = -180; lon < 180; lon += 4) {
          const a = latLonToVector3(lat, lon, radius);
          const b = latLonToVector3(lat, lon + 4, radius);
  
          vertices.push(
            a.x,
            a.y,
            a.z,
            b.x,
            b.y,
            b.z
          );
        }
      }
  
      /* Longitude */
  
      for (let lon = -180; lon < 180; lon += 30) {
        for (let lat = -88; lat < 88; lat += 4) {
          const a = latLonToVector3(lat, lon, radius);
          const b = latLonToVector3(lat + 4, lon, radius);
  
          vertices.push(
            a.x,
            a.y,
            a.z,
            b.x,
            b.y,
            b.z
          );
        }
      }
  
      const buffer = new THREE.BufferGeometry();
  
      buffer.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
  
      return buffer;
    }, []);
  
    useEffect(() => {
      return () => geometry.dispose();
    }, [geometry]);
  
    return (
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color="#d9eef5"
          transparent
          opacity={0.045}
          depthWrite={false}
        />
      </lineSegments>
    );
  }
  
  /* =========================================================
     TRAVEL ARC
  ========================================================= */
  
  function TravelArc({ from, to, active }) {
    const curve = useMemo(() => {
      const start = latLonToVector3(
        from.lat,
        from.lon,
        2.045
      );
  
      const end = latLonToVector3(
        to.lat,
        to.lon,
        2.045
      );
  
      const midpoint = start
        .clone()
        .add(end)
        .multiplyScalar(0.5);
  
      const distance = start.distanceTo(end);
  
      midpoint
        .normalize()
        .multiplyScalar(2.14 + distance * 0.19);
  
      return new THREE.QuadraticBezierCurve3(
        start,
        midpoint,
        end
      );
    }, [from, to]);
  
    const geometry = useMemo(() => {
      return new THREE.TubeGeometry(
        curve,
        64,
        active ? 0.009 : 0.004,
        6,
        false
      );
    }, [curve, active]);
  
    useEffect(() => {
      return () => geometry.dispose();
    }, [geometry]);
  
    return (
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={active ? "#f4d8a3" : "#e8e2d6"}
          transparent
          opacity={active ? 0.9 : 0.17}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    );
  }
  
  /* =========================================================
     ATMOSPHERE
  ========================================================= */
  
  function Atmosphere() {
    return (
      <>
        <mesh>
          <sphereGeometry args={[2.075, 64, 64]} />
  
          <meshBasicMaterial
            color="#4db8e8"
            transparent
            opacity={0.055}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
  
        <mesh>
          <sphereGeometry args={[2.14, 64, 64]} />
  
          <meshBasicMaterial
            color="#61c6f1"
            transparent
            opacity={0.025}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      </>
    );
  }
  
  /* =========================================================
     MAIN GLOBE
  ========================================================= */
  
  const Globe = forwardRef(function Globe(
    {
      activeDestination,
      onSelectDestination,
    },
    ref
  ) {
    const globeGroup = useRef(null);
  
    const [dragging, setDragging] = useState(false);
  
    const targetQuaternion = useRef(null);
    const rotatingToDestination = useRef(false);
  
    /* =======================================================
       EARTH TEXTURE
    ======================================================= */
  
    const earthTexture = useTexture(
        "/textures/earth/earth-blue-marble.jpg"
      );
  
    useEffect(() => {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
  
      earthTexture.wrapS = THREE.RepeatWrapping;
      earthTexture.wrapT = THREE.ClampToEdgeWrapping;
  
      earthTexture.anisotropy = 4;
  
      /*
       * If the map appears horizontally reversed on your
       * particular texture, change repeat.x from 1 to -1.
       */
      earthTexture.repeat.x = 1;
  
      earthTexture.needsUpdate = true;
    }, [earthTexture]);
  
    /* =======================================================
       EXPOSE DESTINATION FOCUS
    ======================================================= */
  
    useImperativeHandle(ref, () => ({
      focusDestination(destination) {
        if (!globeGroup.current) return;
  
        onSelectDestination(destination);
  
        const point = latLonToVector3(
          destination.lat,
          destination.lon,
          2
        ).normalize();
  
        const cameraDirection = new THREE.Vector3(
          0,
          0,
          1
        );
  
        targetQuaternion.current =
          new THREE.Quaternion().setFromUnitVectors(
            point,
            cameraDirection
          );
  
        rotatingToDestination.current = true;
      },
    }));
  
    /* =======================================================
       ROTATION
    ======================================================= */
  
    useFrame((_, delta) => {
      if (!globeGroup.current) return;
  
      /*
       * Destination focus
       */
  
      if (
        rotatingToDestination.current &&
        targetQuaternion.current
      ) {
        const speed =
          1 - Math.pow(0.002, delta);
  
        globeGroup.current.quaternion.slerp(
          targetQuaternion.current,
          speed
        );
  
        const difference =
          globeGroup.current.quaternion.angleTo(
            targetQuaternion.current
          );
  
        if (difference < 0.002) {
          globeGroup.current.quaternion.copy(
            targetQuaternion.current
          );
  
          rotatingToDestination.current = false;
        }
  
        return;
      }
  
      /*
       * Automatic slow rotation
       */
  
      if (!dragging) {
        globeGroup.current.rotateY(
          delta * 0.045
        );
      }
    });
  
    return (
      <>
        {/* ===================================================
            LIGHTING
        =================================================== */}
  
        <ambientLight intensity={0.5} />
  
        <hemisphereLight
          intensity={0.75}
          color="#bfe8ff"
          groundColor="#08141c"
        />
  
        <directionalLight
          position={[5, 3, 6]}
          intensity={2.1}
          color="#fff6e5"
        />
  
        <directionalLight
          position={[-5, -1, -4]}
          intensity={0.3}
          color="#4e9ec8"
        />
  
        {/* ===================================================
            EARTH
        =================================================== */}
  
        <group
          ref={globeGroup}
          rotation={[0.08, -0.55, 0]}
        >
          {/* REAL EARTH */}
  
          <mesh>
            <sphereGeometry args={[2, 72, 72]} />
  
            <meshStandardMaterial
              map={earthTexture}
              color="#ffffff"
              roughness={0.82}
              metalness={0}
            />
          </mesh>
  
          {/* VERY SUBTLE OCEAN / SURFACE SHEEN */}
  
          <mesh>
            <sphereGeometry args={[2.004, 64, 64]} />
  
            <meshPhongMaterial
              color="#4da7d2"
              specular="#a9e2ff"
              shininess={24}
              transparent
              opacity={0.055}
              depthWrite={false}
            />
          </mesh>
  
          {/* GRID */}
  
          <GlobeGrid />
  
          {/* REAL COUNTRY BORDERS */}
  
          <CountryOutlines />
  
          {/* =================================================
              ROUTES
          ================================================= */}
  
          <TravelArc
            from={destinations[0]}
            to={destinations[1]}
            active={
              activeDestination?.name === "Iceland" ||
              activeDestination?.name === "Italy"
            }
          />
  
          <TravelArc
            from={destinations[1]}
            to={destinations[2]}
            active={
              activeDestination?.name === "Italy" ||
              activeDestination?.name === "India"
            }
          />
  
          <TravelArc
            from={destinations[2]}
            to={destinations[3]}
            active={
              activeDestination?.name === "India" ||
              activeDestination?.name === "Japan"
            }
          />
  
          <TravelArc
            from={destinations[3]}
            to={destinations[4]}
            active={
              activeDestination?.name === "Japan" ||
              activeDestination?.name === "Bali"
            }
          />
  
          <TravelArc
            from={destinations[4]}
            to={destinations[5]}
            active={
              activeDestination?.name === "Bali" ||
              activeDestination?.name === "Namibia"
            }
          />
  
          <TravelArc
            from={destinations[5]}
            to={destinations[6]}
            active={
              activeDestination?.name === "Namibia" ||
              activeDestination?.name === "Patagonia"
            }
          />
  
          {/* =================================================
              DESTINATION MARKERS
          ================================================= */}
  
          {destinations.map((destination) => (
            <GlobeMarker
              key={destination.name}
              destination={destination}
              position={latLonToVector3(
                destination.lat,
                destination.lon,
                2.055
              )}
              active={
                activeDestination?.name ===
                destination.name
              }
              onSelect={onSelectDestination}
            />
          ))}
  
          {/* ATMOSPHERE */}
  
          <Atmosphere />
        </group>
  
        {/* ===================================================
            DRAG CONTROLS
        =================================================== */}
  
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.055}
          rotateSpeed={0.42}
          minPolarAngle={Math.PI * 0.18}
          maxPolarAngle={Math.PI * 0.82}
          onStart={() => {
            setDragging(true);
            rotatingToDestination.current = false;
          }}
          onEnd={() => {
            setDragging(false);
          }}
        />
      </>
    );
  });
  
  export default Globe;