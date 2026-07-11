import heroImg from "@/assets/hero-plaque.jpg";

/**
 * HERO 3D SLOT — interactive model to be integrated here.
 *
 * Reserved, self-contained component so a React Three Fiber
 * (@react-three/fiber + @react-three/drei) canvas with a scroll-driven
 * animation can be dropped in later without touching surrounding layout.
 * Public API stays `<Hero3D />`.
 */
export function Hero3D() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[3rem] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--terra) 22%, transparent), transparent 70%)",
        }}
      />
      <div className="animate-float will-change-transform">
        <img
          src={heroImg}
          alt="Custom white 3D-printed Tapiko NFC plaque with terracotta tap zones"
          width={1408}
          height={1408}
          className="mx-auto w-full max-w-[560px] rounded-3xl shadow-[0_40px_80px_-30px_rgba(11,31,58,0.35)]"
        />
      </div>
    </div>
  );
}