/**
 * Lazily-imported by Configurator.tsx so Three.js never loads during SSR.
 * Only rendered after hasMounted === true on the client.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Plaque3D } from "./Plaque3D";
import type { Pattern, ZoneOption, ButtonShape, FontStyle, KickstandStyle } from "@/config/configurator";

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
  fontStyle:      FontStyle;
  kickstandStyle: KickstandStyle;
  shapeWidth:     number;
  shapeHeight:    number;
  cornerRadius:   number;
}

export default function ConfiguratorCanvas({
  bodyColor, accentColor, zoneCount, hasKickstand, pattern, businessName, isMobile,
  thickness, buttonShape, fontStyle, kickstandStyle,
  shapeWidth, shapeHeight, cornerRadius,
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.5], fov: 38 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: !isMobile }}
    >
      <color attach="background" args={["#F5F3EE"]} />

      {/* Studio lighting — enough fill to keep dark materials readable */}
      <ambientLight intensity={0.88} />
      <directionalLight position={[4, 7, 4]}   intensity={0.90} />
      <directionalLight position={[-3, 2, -2]} intensity={0.60} />
      <directionalLight position={[0, -3, 3]}  intensity={0.40} color="#FFF8F0" />
      <pointLight       position={[1, 4, 2]}   intensity={0.18} />

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
          fontStyle={fontStyle}
          kickstandStyle={kickstandStyle}
          shapeWidth={shapeWidth}
          shapeHeight={shapeHeight}
          cornerRadius={cornerRadius}
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
