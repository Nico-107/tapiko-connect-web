/**
 * Lazily-imported by Configurator.tsx — Three.js stays out of SSR.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Plaque3D } from "./Plaque3D";
import { StudioLighting, GroundShadow } from "./StudioLighting";
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

      <StudioLighting />

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
        <GroundShadow />
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
