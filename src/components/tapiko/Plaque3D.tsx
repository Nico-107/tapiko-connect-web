import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CanvasTexture, RepeatWrapping } from "three";
import { RoundedBox } from "@react-three/drei";
import type {
  Pattern, ZoneOption, ButtonShape, FontOption, KickstandStyle, ShapeKey, IconOption,
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
  fontOption:     FontOption;
  kickstandStyle: KickstandStyle;
  shapeKey:       ShapeKey;
  shapeWidth:     number;
  shapeHeight:    number;
  cornerRadius:   number;
  buttonIcons:    readonly IconOption[];
}

// ─── colour helpers ───────────────────────────────────────────────────────────
function luminance(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
function contrast(hex: string) { return luminance(hex) > 0.45 ? "#1A2030" : "#F5F3EE"; }

// ─── font map ─────────────────────────────────────────────────────────────────
const FONT_WEIGHT: Record<FontOption, string> = { modern:"500", serif:"400", rounded:"600", bold:"800" };
const FONT_FAMILY: Record<FontOption, string> = {
  modern:  "system-ui,-apple-system,sans-serif",
  serif:   "Georgia,'Times New Roman',serif",
  rounded: "'Trebuchet MS','Century Gothic',sans-serif",
  bold:    "system-ui,-apple-system,sans-serif",
};

// ─── canvas helpers ───────────────────────────────────────────────────────────
function rrPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}
function star(ctx: CanvasRenderingContext2D, cx: number, cy: number, pts: number, ro: number, ri: number) {
  ctx.beginPath();
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? ro : ri;
    const a = (Math.PI * 2 * i) / (pts * 2) - Math.PI / 2;
    const fn = i === 0 ? "moveTo" : "lineTo";
    ctx[fn](cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  ctx.closePath(); ctx.fill();
}

// ─── pattern texture ──────────────────────────────────────────────────────────
function makePatternTex(pattern: Pattern): CanvasTexture | null {
  if (pattern === "solid") return null;
  const S = 256;
  const cv = document.createElement("canvas");
  cv.width = S; cv.height = S;
  const ctx = cv.getContext("2d")!;

  if (pattern === "waves") {
    ctx.strokeStyle = "rgba(0,0,0,0.32)"; ctx.lineWidth = 2.0;
    for (let y = 20; y < S; y += 30) {
      ctx.beginPath();
      for (let x = 0; x <= S; x++) {
        const wy = y + Math.sin(x * 0.055) * 9;
        x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy);
      }
      ctx.stroke();
    }
  } else if (pattern === "dots") {
    ctx.fillStyle = "rgba(0,0,0,0.30)";
    for (let x = 16; x < S; x += 26) for (let y = 16; y < S; y += 26) {
      ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();
    }
  } else if (pattern === "grain") {
    const id = ctx.createImageData(S, S);
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

// ─── name texture ─────────────────────────────────────────────────────────────
function makeNameTex(name: string, color: string, fontOption: FontOption): CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 512; cv.height = 128;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, 512, 128);
  const label = name.trim() || "Your Name";
  const mkFont = (s: number) => `${FONT_WEIGHT[fontOption]} ${s}px ${FONT_FAMILY[fontOption]}`;
  let fs = 46;
  ctx.font = mkFont(fs);
  while (ctx.measureText(label).width > 490 && fs > 18) { fs -= 2; ctx.font = mkFont(fs); }
  ctx.fillStyle = color;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(label, 256, 64);
  return new CanvasTexture(cv);
}

// ─── icon textures ────────────────────────────────────────────────────────────
function makeIconTex(icon: IconOption, iconColor: string): CanvasTexture {
  const S = 128, c = S / 2;
  const cv = document.createElement("canvas");
  cv.width = S; cv.height = S;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, S, S);

  switch (icon) {
    case "maps": {
      ctx.fillStyle = "#EA4335";
      ctx.beginPath(); ctx.arc(c, c - 14, 28, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(c, c + 42); ctx.lineTo(c - 20, c + 6); ctx.lineTo(c + 20, c + 6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(c, c - 14, 11, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "google": {
      const r = 36; ctx.lineWidth = 12; ctx.lineCap = "round";
      ctx.strokeStyle = "#4285F4"; ctx.beginPath(); ctx.arc(c, c, r, -0.55, Math.PI * 0.93, false); ctx.stroke();
      ctx.strokeStyle = "#DB4437"; ctx.beginPath(); ctx.arc(c, c, r, Math.PI * 0.93, Math.PI * 1.33, false); ctx.stroke();
      ctx.strokeStyle = "#F4B400"; ctx.beginPath(); ctx.arc(c, c, r, Math.PI * 1.33, Math.PI * 1.72, false); ctx.stroke();
      ctx.strokeStyle = "#0F9D58"; ctx.beginPath(); ctx.arc(c, c, r, Math.PI * 1.72, -0.55, false); ctx.stroke();
      ctx.strokeStyle = "#4285F4"; ctx.beginPath(); ctx.moveTo(c, c); ctx.lineTo(c + r + 3, c); ctx.stroke();
      break;
    }
    case "instagram": {
      ctx.strokeStyle = "#C13584"; ctx.lineWidth = 8;
      rrPath(ctx, 14, 14, S - 28, S - 28, 22); ctx.stroke();
      ctx.beginPath(); ctx.arc(c, c, 21, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "#C13584"; ctx.beginPath(); ctx.arc(c + 23, c - 23, 5, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "tiktok": {
      const draw = (dx: number, dy: number, col: string) => {
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(c - 9 + dx, c + 20 + dy, 21, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(c + 7 + dx, c - 40 + dy, 10, 58);
        ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.lineCap = "round";
        ctx.beginPath(); ctx.arc(c + 26 + dx, c - 22 + dy, 18, -Math.PI * 0.5, Math.PI * 0.5, false); ctx.stroke();
      };
      ctx.globalAlpha = 0.85; draw(-3, -3, "#69C9D0"); draw(3, 3, "#EE1D52"); ctx.globalAlpha = 1; draw(0, 0, "#000000");
      break;
    }
    case "menu": {
      ctx.fillStyle = iconColor;
      [c - 24, c, c + 24].forEach(y => ctx.fillRect(c - 38, y - 5, 76, 10));
      break;
    }
    case "website": {
      ctx.strokeStyle = iconColor; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.arc(c, c, 42, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(c, c - 42); ctx.lineTo(c, c + 42); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(c - 42, c); ctx.lineTo(c + 42, c); ctx.stroke();
      ctx.save(); ctx.translate(c, c);
      for (const sx of [-0.45, 0.45]) { ctx.beginPath(); ctx.ellipse(0, 0, 42 * Math.abs(sx), 42, 0, 0, Math.PI * 2); ctx.stroke(); }
      ctx.restore();
      break;
    }
    case "review":  { ctx.fillStyle = "#F4B400"; star(ctx, c, c + 4, 5, 42, 18); break; }
    case "message": {
      ctx.fillStyle = iconColor;
      rrPath(ctx, 10, 10, S - 20, S * 0.62, 14); ctx.fill();
      ctx.beginPath(); ctx.moveTo(c - 18, S * 0.72 - 4); ctx.lineTo(c + 8, S * 0.72 - 4); ctx.lineTo(c - 10, S - 10); ctx.closePath(); ctx.fill();
      break;
    }
    case "social": {
      ctx.fillStyle = "#E1306C"; ctx.beginPath();
      ctx.moveTo(c, c + 28);
      ctx.bezierCurveTo(c - 52, c - 4, c - 56, c - 44, c, c - 18);
      ctx.bezierCurveTo(c + 56, c - 44, c + 52, c - 4, c, c + 28);
      ctx.fill(); break;
    }
    case "share": {
      ctx.fillStyle = iconColor; ctx.beginPath();
      ctx.moveTo(c, 12); ctx.lineTo(c - 22, 46); ctx.lineTo(c - 9, 46);
      ctx.lineTo(c - 9, 92); ctx.lineTo(c + 9, 92); ctx.lineTo(c + 9, 46); ctx.lineTo(c + 22, 46);
      ctx.closePath(); ctx.fill(); break;
    }
  }
  return new CanvasTexture(cv);
}

// ─── Custom ExtrudeGeometry for non-classic shapes ────────────────────────────
function buildExtrudedGeom(
  shapeKey: ShapeKey, width: number, height: number, thickness: number, cornerRadius: number,
): THREE.BufferGeometry | null {
  if (shapeKey === "classic") return null;
  const w = width / 2, h = height / 2;
  const shape = new THREE.Shape();

  if (shapeKey === "rounded-top") {
    const r = Math.min(cornerRadius, w * 0.94, h * 0.94);
    shape.moveTo(-w, -h);
    shape.lineTo(w, -h);
    shape.lineTo(w, h - r);
    shape.absarc(w - r, h - r, r, 0, Math.PI / 2, false);
    shape.lineTo(-w + r, h);
    shape.absarc(-(w - r), h - r, r, Math.PI / 2, Math.PI, false);
    shape.closePath();
  } else if (shapeKey === "full-round") {
    const capR = w, straight = h - capR;
    shape.moveTo(-w, straight);
    shape.absarc(0, straight, capR, Math.PI, 0, false);
    shape.lineTo(w, -straight);
    shape.absarc(0, -straight, capR, 0, Math.PI, false);
    shape.closePath();
  } else {
    const r = Math.min(w, h);
    shape.moveTo(r, 0);
    shape.absarc(0, 0, r, 0, Math.PI * 2, false);
    shape.closePath();
  }

  const geom = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false });
  geom.center();
  return geom;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Plaque3D({
  bodyColor, accentColor, zoneCount, hasKickstand, pattern, businessName,
  thickness, buttonShape, fontOption, kickstandStyle,
  shapeKey, shapeWidth, shapeHeight, cornerRadius, buttonIcons,
}: Plaque3DProps) {
  const tc       = contrast(bodyColor);
  const accentIC = contrast(accentColor);

  // ── Persistent material instances — survive geometry swaps ────────────────
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    roughness: 0.84, metalness: 0.02, envMapIntensity: 0.12,
  }), []);
  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    roughness: 0.45, metalness: 0.06, envMapIntensity: 0.18,
  }), []);
  const overlayMat = useMemo(() => new THREE.MeshBasicMaterial({
    transparent: true, opacity: 0.50, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
  }), []);

  // ── Colour lerp targets ───────────────────────────────────────────────────
  const bodyTarget   = useRef(new THREE.Color(bodyColor));
  const accentTarget = useRef(new THREE.Color(accentColor));

  // Seed current color on first mount
  useEffect(() => {
    bodyMat.color.set(bodyColor);
    accentMat.color.set(accentColor);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { bodyTarget.current.set(bodyColor); },   [bodyColor]);
  useEffect(() => { accentTarget.current.set(accentColor); }, [accentColor]);

  // Update overlay texture when pattern changes
  const patternTex = useMemo(() => makePatternTex(pattern), [pattern]);
  useEffect(() => {
    overlayMat.map        = patternTex;
    overlayMat.needsUpdate = true;
  }, [patternTex, overlayMat]);

  // ── Scale-bounce on geometry / visual changes ─────────────────────────────
  const groupRef  = useRef<THREE.Group>(null);
  const animStart = useRef<number | null>(null);
  useEffect(() => { animStart.current = Date.now(); }, [shapeKey, pattern, hasKickstand]);

  // ── Textures ─────────────────────────────────────────────────────────────
  const nameTex = useMemo(
    () => makeNameTex(businessName, tc, fontOption),
    [businessName, tc, fontOption],
  );
  const iconTextures = useMemo(
    () => buttonIcons.slice(0, zoneCount).map(icon => makeIconTex(icon, accentIC)),
    [buttonIcons, zoneCount, accentIC],
  );

  // ── Custom geometry ───────────────────────────────────────────────────────
  const customGeom = useMemo(
    () => buildExtrudedGeom(shapeKey, shapeWidth, shapeHeight, thickness, cornerRadius),
    [shapeKey, shapeWidth, shapeHeight, thickness, cornerRadius],
  );

  // ── Animation loop ────────────────────────────────────────────────────────
  useFrame(() => {
    // Smooth colour transitions (~300ms at 60fps with factor 0.08)
    bodyMat.color.lerp(bodyTarget.current, 0.08);
    accentMat.color.lerp(accentTarget.current, 0.08);

    // Scale-bounce feedback when something snaps
    if (groupRef.current && animStart.current !== null) {
      const elapsed = Date.now() - animStart.current;
      if (elapsed < 380) {
        groupRef.current.scale.setScalar(1 - 0.032 * Math.sin((elapsed / 380) * Math.PI));
      } else {
        groupRef.current.scale.setScalar(1);
        animStart.current = null;
      }
    }
  });

  // ── Button layout ─────────────────────────────────────────────────────────
  const availW  = shapeWidth * 0.82;
  const BTN_GAP = 0.05;
  const maxBtnW = buttonShape === "large-square" ? 0.24 : 0.20;
  const BTN_W   = Math.min(
    maxBtnW,
    zoneCount > 1 ? (availW - (zoneCount - 1) * BTN_GAP) / zoneCount : availW * 0.38,
  );
  const totalBtnW = zoneCount * BTN_W + (zoneCount - 1) * BTN_GAP;
  const btnXs     = Array.from({ length: zoneCount }, (_, i) =>
    -totalBtnW / 2 + BTN_W / 2 + i * (BTN_W + BTN_GAP)
  );
  const BTN_Y  = -(shapeHeight * 0.31);
  const BTN_Z  = thickness / 2 + 0.021;
  const BTN_TH = thickness * 0.38;

  const KS = { thin: { w: 0.14, d: 0.024, len: 0.64 }, wide: { w: 0.24, d: 0.030, len: 0.64 }, block: { w: 0.30, d: 0.058, len: 0.60 } }[kickstandStyle];

  // ── JSX ──────────────────────────────────────────────────────────────────
  return (
    <group ref={groupRef}>
      {/* Body */}
      {customGeom ? (
        <mesh geometry={customGeom}>
          <primitive object={bodyMat} attach="material" />
        </mesh>
      ) : (
        <RoundedBox args={[shapeWidth, shapeHeight, thickness]} radius={cornerRadius} smoothness={6}>
          <primitive object={bodyMat} attach="material" />
        </RoundedBox>
      )}

      {/* Pattern overlay */}
      {patternTex && (
        customGeom ? (
          <mesh geometry={customGeom}>
            <primitive object={overlayMat} attach="material" />
          </mesh>
        ) : (
          <RoundedBox args={[shapeWidth, shapeHeight, thickness]} radius={cornerRadius} smoothness={6}>
            <primitive object={overlayMat} attach="material" />
          </RoundedBox>
        )
      )}

      {/* Business name */}
      <mesh position={[0, shapeHeight * 0.22, thickness / 2 + 0.002]}>
        <planeGeometry args={[shapeWidth * 0.84, shapeHeight * 0.17]} />
        <meshBasicMaterial map={nameTex} transparent alphaTest={0.02} depthWrite={false} />
      </mesh>

      {/* Tap-zone buttons + icons */}
      {btnXs.map((x, i) => {
        const iconTex = iconTextures[i];
        const iconPlane = iconTex ? (
          <mesh position={[x, BTN_Y, BTN_Z + BTN_TH / 2 + 0.001]}>
            <planeGeometry args={[BTN_W * 0.72, BTN_W * 0.72]} />
            <meshBasicMaterial map={iconTex} transparent alphaTest={0.05} depthWrite={false} />
          </mesh>
        ) : null;

        if (buttonShape === "circle") {
          return (
            <group key={i}>
              <mesh position={[x, BTN_Y, BTN_Z]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[BTN_W * 0.50, BTN_W * 0.50, BTN_TH, 28]} />
                <primitive object={accentMat} attach="material" />
              </mesh>
              {iconPlane}
            </group>
          );
        }
        if (buttonShape === "pill") {
          return (
            <group key={i}>
              <RoundedBox args={[BTN_W, BTN_W * 0.52, BTN_TH]} radius={BTN_W * 0.24} smoothness={4} position={[x, BTN_Y, BTN_Z]}>
                <primitive object={accentMat} attach="material" />
              </RoundedBox>
              {iconPlane}
            </group>
          );
        }
        return (
          <group key={i}>
            <RoundedBox
              args={[BTN_W, BTN_W, BTN_TH]}
              radius={buttonShape === "large-square" ? 0.020 : 0.030}
              smoothness={4}
              position={[x, BTN_Y, BTN_Z]}
            >
              <primitive object={accentMat} attach="material" />
            </RoundedBox>
            {iconPlane}
          </group>
        );
      })}

      {/* Kickstand */}
      {hasKickstand && (
        <group position={[0, -(shapeHeight / 2) - 0.02, -(thickness / 2) - 0.01]} rotation={[Math.PI * 0.22, 0, 0]}>
          <mesh position={[0, -(KS.len / 2), 0]}>
            <boxGeometry args={[KS.w, KS.len, KS.d]} />
            <primitive object={bodyMat} attach="material" />
          </mesh>
          <mesh position={[0, -KS.len - 0.012, 0]}>
            <boxGeometry args={[KS.w * 1.5, 0.022, KS.d * 3]} />
            <primitive object={bodyMat} attach="material" />
          </mesh>
        </group>
      )}
    </group>
  );
}
