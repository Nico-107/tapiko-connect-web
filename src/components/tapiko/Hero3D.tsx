import { useState, useEffect, lazy, Suspense, Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import heroImg from "@/assets/hero-plaque.jpg";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

// ── WebGL error boundary ───────────────────────────────────────────────────────
interface EBState { hasError: boolean }
class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  componentDidCatch(e: Error, info: ErrorInfo) { console.warn("WebGL unavailable:", e, info); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

// Static image — shown instantly on first paint and as permanent WebGL fallback
const staticImage = (
  <div className="animate-float will-change-transform">
    <img
      src={heroImg}
      alt="Custom white 3D-printed Tapiko NFC plaque with terracotta tap zones"
      width={1408}
      height={1408}
      className="mx-auto w-full max-w-[680px] rounded-3xl shadow-[0_40px_80px_-30px_rgba(11,31,58,0.35)]"
    />
  </div>
);

export function Hero3D() {
  const [show3D, setShow3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    // Defer 3D canvas until after initial paint so text + CTAs render first
    const id = setTimeout(() => setShow3D(true), 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative flex items-center justify-center pb-8">
      {/* Warm ambient glow — visible through the transparent canvas */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[3rem] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--terra) 22%, transparent), transparent 70%)",
        }}
      />

      {show3D ? (
        <WebGLBoundary fallback={staticImage}>
          <Suspense fallback={staticImage}>
            {/*
              No background, no overflow-hidden, no box-shadow on this wrapper.
              gl={{ alpha: true }} makes the canvas transparent — the plaque floats
              directly on the page background and the ambient glow shows through.
              ContactShadows inside the scene provides the grounding shadow.
            */}
            <div className="mx-auto w-full max-w-[680px] aspect-square">
              <HeroCanvas isMobile={isMobile} />
            </div>
          </Suspense>
        </WebGLBoundary>
      ) : staticImage}
    </div>
  );
}
