import { useMemo } from "react";
import { CanvasTexture, RepeatWrapping } from "three";
import { RoundedBox } from "@react-three/drei";
import type { Pattern, ZoneOption } from "@/config/configurator";

interface Plaque3DProps {
  bodyColor:    string;
  accentColor:  string;
  zoneCount:    ZoneOption;
  hasKickstand: boolean;
  pattern:      Pattern;
  businessName: string;
}

function textColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#0B1F3A" : "#F5F3EE";
}

function makePatternTex(pattern: Pattern): CanvasTexture | null {
  if (pattern === "solid") return null;
  const SIZE = 256;
  const cv = document.createElement("canvas");
  cv.width = SIZE; cv.height = SIZE;
  const ctx = cv.getContext("2d")!;

  if (pattern === "waves") {
    ctx.strokeStyle = "rgba(120,120,120,0.18)";
    ctx.lineWidth = 1.5;
    for (let y = 18; y < SIZE; y += 28) {
      ctx.beginPath();
      for (let x = 0; x <= SIZE; x++) {
        const wy = y + Math.sin(x * 0.055) * 8;
        x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy);
      }
      ctx.stroke();
    }
  } else if (pattern === "dots") {
    ctx.fillStyle = "rgba(100,100,100,0.18)";
    for (let x = 14; x < SIZE; x += 24) {
      for (let y = 14; y < SIZE; y += 24) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (pattern === "grain") {
    const id = ctx.createImageData(SIZE, SIZE);
    for (let i = 0; i < id.data.length; i += 4) {
      const v = Math.round(Math.random() * 200 + 55);
      id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
      id.data[i + 3] = Math.round(Math.random() * 22);
    }
    ctx.putImageData(id, 0, 0);
  }

  const tex = new CanvasTexture(cv);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(2, 2.5);
  return tex;
}

function makeNameTex(name: string, color: string): CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 512; cv.height = 128;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, 512, 128);
  const label = name.trim() || "Your Name";
  let fs = 46;
  ctx.font = `600 ${fs}px system-ui,-apple-system,sans-serif`;
  while (ctx.measureText(label).width > 490 && fs > 18) {
    fs -= 2;
    ctx.font = `600 ${fs}px system-ui,-apple-system,sans-serif`;
  }
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 256, 64);
  return new CanvasTexture(cv);
}

export function Plaque3D({
  bodyColor, accentColor, zoneCount, hasKickstand, pattern, businessName,
}: Plaque3DProps) {
  const tc         = textColor(bodyColor);
  const patternTex = useMemo(() => makePatternTex(pattern),          [pattern]);
  const nameTex    = useMemo(() => makeNameTex(businessName, tc), [businessName, tc]);

  // Evenly space buttons along x
  const BTN_W = 0.20, BTN_GAP = 0.07;
  const totalW = zoneCount * BTN_W + (zoneCount - 1) * BTN_GAP;
  const btnXs  = Array.from({ length: zoneCount }, (_, i) =>
    -totalW / 2 + BTN_W / 2 + i * (BTN_W + BTN_GAP)
  );

  return (
    <group>
      {/* ── Body ── */}
      <RoundedBox args={[1.3, 1.6, 0.12]} radius={0.065} smoothness={4}>
        <meshStandardMaterial color={bodyColor} roughness={0.62} metalness={0.04} />
      </RoundedBox>

      {/* ── Pattern overlay (slightly in front to avoid z-fight) ── */}
      {patternTex && (
        <group position={[0, 0, 0.001]}>
          <RoundedBox args={[1.3, 1.6, 0.12]} radius={0.065} smoothness={4}>
            <meshBasicMaterial map={patternTex} transparent opacity={0.2} depthWrite={false} />
          </RoundedBox>
        </group>
      )}

      {/* ── Business name (canvas-texture plane) ── */}
      <mesh position={[0, 0.35, 0.063]}>
        <planeGeometry args={[1.08, 0.27]} />
        <meshBasicMaterial map={nameTex} transparent alphaTest={0.02} depthWrite={false} />
      </mesh>

      {/* ── Tap-zone buttons ── */}
      {btnXs.map((x, i) => (
        <RoundedBox
          key={i}
          args={[BTN_W, BTN_W, 0.042]}
          radius={0.032}
          smoothness={4}
          position={[x, -0.50, 0.079]}
        >
          <meshStandardMaterial color={accentColor} roughness={0.38} metalness={0.1} />
        </RoundedBox>
      ))}

      {/* ── Kickstand ── */}
      {hasKickstand && (
        <group position={[0, -0.62, -0.05]} rotation={[Math.PI * 0.20, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.55, 0.055, 0.016]} />
            <meshStandardMaterial color={bodyColor} roughness={0.65} metalness={0.04} />
          </mesh>
        </group>
      )}
    </group>
  );
}
