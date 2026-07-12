/**
 * Lazily-imported by Configurator.tsx — Three.js stays out of SSR.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Plaque3D } from "./Plaque3D";
import type { Pattern, ZoneOption, ButtonShape, FontOption, KickstandStyle, ShapeKey, IconOption } from "@/config/configurator";

interface Props {
  bodyColor:      string;
  accentColor:    string;
  zoneCount:      ZoneOption;
  hasKickstand:   boolean;
  pattern:        Pattern;
  businessName:   string;
  isMobile:       boolean;
  thickness:      number;
  buttonShape:    ButtonShape;
  fontOption:     FontOption;
  kickstandStyle: KickstandStyle;
  shapeKey:       ShapeKey;
  shapeWidth:     number;
  shapeHeight:    number;
  cornerRadius:   number;
  buttonIcons:    readonly IconOption[];
}

export default function ConfiguratorCanvas({
  bodyColor, accentColor, zoneCount, hasKickstand, pattern, businessName, isMobile,
  thickness, buttonShape, fontOption, kickstandStyle,
  shapeKey, shapeWidth, shapeHeight, cornerRadius, buttonIcons,
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.5], fov: 38 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: !isMobile }}
      shadows
    >
      {/* Warm off-white background matching the canvas wrapper gradient */}
      <color attach="background" args={["#F8F5EF"]} />

      {/* Studio lighting: clear key → soft fill → subtle rim from behind */}
      <ambientLight intensity={0.55} />
      {/* Key: upper-right warm */}
      <directionalLight position={[3.5, 6, 4]}  intensity={1.10} />
      {/* Fill: upper-left soft */}
      <directionalLight position={[-3, 3, 1]}   intensity={0.50} color="#FFF8F2" />
      {/* Rim: behind, slightly below — adds edge separation on dark bodies */}
      <directionalLight position={[0, -1, -3]}  intensity={0.30} color="#EAE4DA" />
      {/* Ground bounce: warm, low */}
      <pointLight       position={[0, -2.5, 2]} intensity={0.22} color="#FFF0E8" />

      <Suspense fallback={null}>
        <Plaque3D
          bodyColor={bodyColor}
          accentColor={accentColor}
          zoneCount={zoneCount}
          hasKickstand={hasKickstand}
          pattern={pattern}
          businessName={businessName}
          thickness={thickness}
          buttonShape={buttonShape}
          fontOption={fontOption}
          kickstandStyle={kickstandStyle}
          shapeKey={shapeKey}
          shapeWidth={shapeWidth}
          shapeHeight={shapeHeight}
          cornerRadius={cornerRadius}
          buttonIcons={buttonIcons}
        />

        {/* Grounding shadow so the object sits on a surface */}
        <ContactShadows
          position={[0, -1.08, 0]}
          opacity={0.28}
          scale={4.5}
          blur={3.0}
          far={1.2}
          color="#0B1F3A"
          frames={1}
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
