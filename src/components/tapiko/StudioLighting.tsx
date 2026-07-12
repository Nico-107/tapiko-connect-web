/**
 * Shared studio lighting rig + ground shadow.
 * Import inside a Canvas context — both Hero and Configurator canvases use this.
 */
import { ContactShadows } from "@react-three/drei";

export function StudioLighting() {
  return (
    <>
      {/* Key: upper-right warm */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3.5, 6, 4]}  intensity={1.10} />
      {/* Fill: upper-left soft */}
      <directionalLight position={[-3, 3, 1]}   intensity={0.50} color="#FFF8F2" />
      {/* Rim: behind, slightly below — edge separation on dark bodies */}
      <directionalLight position={[0, -1, -3]}  intensity={0.30} color="#EAE4DA" />
      {/* Ground bounce: warm, low */}
      <pointLight       position={[0, -2.5, 2]} intensity={0.22} color="#FFF0E8" />
    </>
  );
}

export function GroundShadow({ opacity = 0.28 }: { opacity?: number }) {
  return (
    <ContactShadows
      position={[0, -1.08, 0]}
      opacity={opacity}
      scale={4.5}
      blur={3.0}
      far={1.2}
      color="#0B1F3A"
      frames={1}
    />
  );
}
