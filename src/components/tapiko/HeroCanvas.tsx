/**
 * Lazily-imported by Hero3D — Three.js stays out of SSR.
 * Fixed showcase configuration — no user controls, auto-rotates.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Plaque3D } from "./Plaque3D";
import type { IconOption, ZoneOption } from "@/config/configurator";

const HERO_ICONS: readonly IconOption[] = ["maps", "instagram"];
const HERO_ZONES: ZoneOption = 2;

export default function HeroCanvas({ isMobile }: { isMobile: boolean }) {
  return (
    <Canvas
      camera={{ position: [0.2, 0.15, 3.2], fov: 40 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: !isMobile, alpha: true }}
    >
      {/* Same studio lighting rig as the configurator */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3.5, 6, 4]}  intensity={1.10} />
      <directionalLight position={[-3, 3, 1]}   intensity={0.50} color="#FFF8F2" />
      <directionalLight position={[0, -1, -3]}  intensity={0.30} color="#EAE4DA" />
      <pointLight       position={[0, -2.5, 2]} intensity={0.22} color="#FFF0E8" />

      <Suspense fallback={null}>
        <Plaque3D
          bodyColor="#F5F3EE"
          accentColor="#E2683C"
          zoneCount={HERO_ZONES}
          hasKickstand={false}
          pattern="solid"
          businessName="Your Brand"
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
        <ContactShadows
          position={[0, -1.08, 0]}
          opacity={0.22}
          scale={4.5}
          blur={3.0}
          far={1.2}
          color="#0B1F3A"
          frames={1}
        />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.7}
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
