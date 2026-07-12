/**
 * Lazily-imported by Hero3D — Three.js stays out of SSR.
 * Fixed showcase configuration — auto-rotates, no user controls.
 * Uses the shared StudioLighting rig for visual parity with the configurator.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Plaque3D } from "./Plaque3D";
import { StudioLighting, GroundShadow } from "./StudioLighting";
import type { IconOption, ZoneOption } from "@/config/configurator";

const HERO_ICONS: readonly IconOption[] = ["maps", "instagram"];
const HERO_ZONES: ZoneOption = 2;

export default function HeroCanvas({ isMobile }: { isMobile: boolean }) {
  return (
    <Canvas
      // Start from a slight back-right angle so kickstand is visible at first glance;
      // auto-rotation then sweeps through to reveal the full front face.
      camera={{ position: [0.6, 0.7, -3.2], fov: 42 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: !isMobile, alpha: true }}
    >
      <StudioLighting />

      <Suspense fallback={null}>
        <Plaque3D
          bodyColor="#F5F3EE"
          accentColor="#E2683C"
          zoneCount={HERO_ZONES}
          hasKickstand={true}
          pattern="solid"
          businessName="Bar Deriva"
          thickness={0.10}
          buttonShape="square"
          fontOption="modern"
          kickstandStyle="thin"
          shapeKey="classic"
          shapeWidth={1.30}
          shapeHeight={1.60}
          cornerRadius={0.04}
          buttonIcons={HERO_ICONS}
        />
        {/* Slightly lighter shadow than configurator since it renders on page background */}
        <GroundShadow opacity={0.20} />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.6}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={Math.PI * 0.20}
        maxPolarAngle={Math.PI * 0.80}
      />
    </Canvas>
  );
}
