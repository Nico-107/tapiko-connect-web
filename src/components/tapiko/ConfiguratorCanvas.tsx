/**
 * Lazily-imported by Configurator.tsx so Three.js never loads during SSR.
 * Only rendered after hasMounted === true on the client.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Plaque3D } from "./Plaque3D";
import type { Pattern, ZoneOption } from "@/config/configurator";

interface Props {
  bodyColor:    string;
  accentColor:  string;
  zoneCount:    ZoneOption;
  hasKickstand: boolean;
  pattern:      Pattern;
  businessName: string;
  isMobile:     boolean;
}

export default function ConfiguratorCanvas({
  bodyColor, accentColor, zoneCount, hasKickstand, pattern, businessName, isMobile,
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.5], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: !isMobile }}
    >
      {/* Background matching --paper */}
      <color attach="background" args={["#F5F3EE"]} />

      {/* Studio-style lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 4]}  intensity={1.05} />
      <directionalLight position={[-3, 2, -2]} intensity={0.28} />
      <pointLight       position={[0, -3, 3]}  intensity={0.10} color="#FFF8F0" />

      {/* Scene — Suspense keeps the canvas interactive while canvas textures generate */}
      <Suspense fallback={null}>
        <Plaque3D
          bodyColor={bodyColor}
          accentColor={accentColor}
          zoneCount={zoneCount}
          hasKickstand={hasKickstand}
          pattern={pattern}
          businessName={businessName}
        />
      </Suspense>

      <OrbitControls
        enableZoom
        enablePan={false}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.85}
        minDistance={2}
        maxDistance={6}
      />
    </Canvas>
  );
}
