import heroImg from "@/assets/hero-plaque.jpg";

export function Hero3D() {
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

      {/* Floating product photo */}
      <div className="animate-float will-change-transform">
        <img
          src={heroImg}
          alt="Custom white 3D-printed Tapiko NFC plaque with terracotta tap zones"
          width={1408}
          height={1408}
          className="mx-auto w-full max-w-[680px] rounded-3xl shadow-[0_40px_80px_-30px_rgba(11,31,58,0.35)]"
        />
      </div>

      {/* Ground shadow — stays put while the image floats above */}
      <div
        aria-hidden
        className="absolute bottom-2 left-1/2 -z-10 h-5 w-[55%] -translate-x-1/2 rounded-full opacity-40 blur-2xl"
        style={{ background: "rgba(11,31,58,0.45)" }}
      />
    </div>
  );
}
