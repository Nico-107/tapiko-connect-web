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

// Static image shown before 3D loads and as WebGL fallback
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
    // Defer canvas until after initial paint so text + CTAs render first
    const id = setTimeout(() => setShow3D(true), 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative flex items-center justify-center pb-8">
      {/* Warm ambient glow behind the product */}
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
            <div
              className="mx-auto w-full max-w-[680px] aspect-square rounded-3xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(11,31,58,0.35)]"
              style={{ background: "#F6F3ED" }}
            >
              <HeroCanvas isMobile={isMobile} />
            </div>
          </Suspense>
        </WebGLBoundary>
      ) : staticImage}

      {/* Ground shadow — stays put while the model rotates above */}
      <div
        aria-hidden
        className="absolute bottom-2 left-1/2 -z-10 h-5 w-[55%] -translate-x-1/2 rounded-full opacity-40 blur-2xl"
        style={{ background: "rgba(11,31,58,0.45)" }}
      />
    </div>
  );
}
