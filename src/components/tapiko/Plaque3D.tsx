import { useMemo } from "react";
import { CanvasTexture, RepeatWrapping } from "three";
import { RoundedBox } from "@react-three/drei";
import type {
  Pattern, ZoneOption, ButtonShape, FontStyle, KickstandStyle,
} from "@/config/configurator";

interface Plaque3DProps {
  bodyColor:      string;
  accentColor:    string;
  zoneCount:      ZoneOption;
  hasKickstand:   boolean;
  pattern:        Pattern;
  businessName:   string;
  thickness:      number;
  buttonShape:    ButtonShape;
  fontStyle:      FontStyle;
  kickstandStyle: KickstandStyle;
  shapeWidth:     number;
  shapeHeight:    number;
  cornerRadius:   number;
}

function luminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function textColor(hex: string): string {
  return luminance(hex) > 0.45 ? "#0B1F3A" : "#F5F3EE";
}

const FONT_WEIGHT: Record<FontStyle, string> = {
  normal:  "500",
  serif:   "400",
  bold:    "800",
  rounded: "600",
};
const FONT_FAMILY: Record<FontStyle, string> = {
  normal:  "system-ui,-apple-system,sans-serif",
  serif:   "Georgia,'Times New Roman',serif",
  bold:    "system-ui,-apple-system,sans-serif",
  rounded: "'Trebuchet MS','Century Gothic',sans-serif",
};

function makePatternTex(pattern: Pattern): CanvasTexture | null {
  if (pattern === "solid") return null;
  const SIZE = 256;
  const cv = document.createElement("canvas");
  cv.width = SIZE; cv.height = SIZE;
  const ctx = cv.getContext("2d")!;

  if (pattern === "waves") {
    ctx.strokeStyle = "rgba(0,0,0,0.32)";
    ctx.lineWidth = 2.0;
    for (let y = 20; y < SIZE; y += 30) {
      ctx.beginPath();
      for (let x = 0; x <= SIZE; x++) {
        const wy = y + Math.sin(x * 0.055) * 9;
        x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy);
      }
      ctx.stroke();
    }
  } else if (pattern === "dots") {
    ctx.fillStyle = "rgba(0,0,0,0.30)";
    for (let x = 16; x < SIZE; x += 26) {
      for (let y = 16; y < SIZE; y += 26) {
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (pattern === "grain") {
    const id = ctx.createImageData(SIZE, SIZE);
    for (let i = 0; i < id.data.length; i += 4) {
      const v = Math.round(Math.random() * 160 + 40);
      id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
      id.data[i + 3] = Math.round(Math.random() * 42 + 10);
    }
    ctx.putImageData(id, 0, 0);
  }

  const tex = new CanvasTexture(cv);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(2, 2.5);
  return tex;
}

function makeNameTex(name: string, color: string, fontStyle: FontStyle): CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 512; cv.height = 128;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, 512, 128);
  const label = name.trim() || "Your Name";
  const weight = FONT_WEIGHT[fontStyle];
  const family = FONT_FAMILY[fontStyle];
  let fs = 46;
  const font = (s: number) => `${weight} ${s}px ${family}`;
  ctx.font = font(fs);
  while (ctx.measureText(label).width > 490 && fs > 18) {
    fs -= 2;
    ctx.font = font(fs);
  }
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 256, 64);
  return new CanvasTexture(cv);
}

export function Plaque3D({
  bodyColor, accentColor, zoneCount, hasKickstand, pattern, businessName,
  thickness, buttonShape, fontStyle, kickstandStyle,
  shapeWidth, shapeHeight, cornerRadius,
}: Plaque3DProps) {
  const tc         = textColor(bodyColor);
  const patternTex = useMemo(() => makePatternTex(pattern),                      [pattern]);
  const nameTex    = useMemo(() => makeNameTex(businessName, tc, fontStyle), [businessName, tc, fontStyle]);

  // Button sizing — auto-fit within available plaque width
  const availW  = shapeWidth * 0.82;
  const BTN_GAP = 0.05;
  const maxBtnW = buttonShape === "large-square" ? 0.24 : 0.20;
  const BTN_W   = Math.min(
    maxBtnW,
    zoneCount > 1
      ? (availW - (zoneCount - 1) * BTN_GAP) / zoneCount
      : availW * 0.38,
  );
  const totalBtnW = zoneCount * BTN_W + (zoneCount - 1) * BTN_GAP;
  const btnXs     = Array.from({ length: zoneCount }, (_, i) =>
    -totalBtnW / 2 + BTN_W / 2 + i * (BTN_W + BTN_GAP)
  );
  const BTN_Y  = -(shapeHeight * 0.31);
  const BTN_Z  = thickness / 2 + 0.021;
  const BTN_TH = thickness * 0.38;

  // Kickstand arm proportions per style
  const KS = {
    thin:  { w: 0.14, d: 0.024, len: 0.64 },
    wide:  { w: 0.24, d: 0.030, len: 0.64 },
    block: { w: 0.30, d: 0.058, len: 0.60 },
  }[kickstandStyle];

  return (
    <group>
      {/* ── Body ── */}
      <RoundedBox
        args={[shapeWidth, shapeHeight, thickness]}
        radius={cornerRadius}
        smoothness={6}
      >
        <meshStandardMaterial color={bodyColor} roughness={0.84} metalness={0.02} />
      </RoundedBox>

      {/* ── Pattern overlay — same mesh, polygonOffset prevents z-fight ── */}
      {patternTex && (
        <RoundedBox
          args={[shapeWidth, shapeHeight, thickness]}
          radius={cornerRadius}
          smoothness={6}
        >
          <meshBasicMaterial
            map={patternTex}
            transparent
            opacity={0.50}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </RoundedBox>
      )}

      {/* ── Business name ── */}
      <mesh position={[0, shapeHeight * 0.22, thickness / 2 + 0.002]}>
        <planeGeometry args={[shapeWidth * 0.84, shapeHeight * 0.17]} />
        <meshBasicMaterial map={nameTex} transparent alphaTest={0.02} depthWrite={false} />
      </mesh>

      {/* ── Tap-zone buttons ── */}
      {btnXs.map((x, i) => {
        if (buttonShape === "circle") {
          return (
            <mesh key={i} position={[x, BTN_Y, BTN_Z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[BTN_W * 0.50, BTN_W * 0.50, BTN_TH, 28]} />
              <meshStandardMaterial color={accentColor} roughness={0.45} metalness={0.05} />
            </mesh>
          );
        }
        if (buttonShape === "pill") {
          return (
            <RoundedBox
              key={i}
              args={[BTN_W, BTN_W * 0.52, BTN_TH]}
              radius={BTN_W * 0.24}
              smoothness={4}
              position={[x, BTN_Y, BTN_Z]}
            >
              <meshStandardMaterial color={accentColor} roughness={0.45} metalness={0.05} />
            </RoundedBox>
          );
        }
        // square / large-square
        return (
          <RoundedBox
            key={i}
            args={[BTN_W, BTN_W, BTN_TH]}
            radius={buttonShape === "large-square" ? 0.020 : 0.030}
            smoothness={4}
            position={[x, BTN_Y, BTN_Z]}
          >
            <meshStandardMaterial color={accentColor} roughness={0.45} metalness={0.05} />
          </RoundedBox>
        );
      })}

      {/* ── Kickstand ── attaches at bottom-back of plaque, angled backward */}
      {hasKickstand && (
        <group
          position={[0, -(shapeHeight / 2) + 0.05, -(thickness / 2) - 0.01]}
          rotation={[Math.PI * 0.22, 0, 0]}
        >
          {/* Main arm */}
          <mesh position={[0, -(KS.len / 2), 0]}>
            <boxGeometry args={[KS.w, KS.len, KS.d]} />
            <meshStandardMaterial color={bodyColor} roughness={0.84} metalness={0.02} />
          </mesh>
          {/* Foot pad at the tip */}
          <mesh position={[0, -KS.len - 0.012, 0]}>
            <boxGeometry args={[KS.w * 1.5, 0.022, KS.d * 3]} />
            <meshStandardMaterial color={bodyColor} roughness={0.84} metalness={0.02} />
          </mesh>
        </group>
      )}
    </group>
  );
}
