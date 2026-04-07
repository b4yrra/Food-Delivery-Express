"use client";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-[#f5f0e8]">
      {/* Repeating text background */}
      <div
        className="absolute inset-0 opacity-20 select-none pointer-events-none"
        style={{
          fontSize: "clamp(28px, 4vw, 56px)",
          fontWeight: 900,
          color: "#ef4444",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          wordBreak: "break-all",
          padding: "8px",
          overflow: "hidden",
        }}
      >
        SAY CHEESE FRESH FAST DELIVERED! SAY CHEESE FRESH FAST DELIVERED! SAY
        CHEESE FRESH FAST DELIVERED! SAY CHEESE FRESH FAST DELIVERED! SAY CHEESE
        FRESH FAST DELIVERED! SAY CHEESE FRESH FAST DELIVERED! SAY CHEESE FRESH
        FAST DELIVERED! SAY CHEESE FRESH FAST DELIVERED!
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 py-8 flex items-center">
        <div className="relative z-10 flex-1">
          <div className="bg-black rounded-[2rem] py-8 px-10 inline-block max-w-2xl relative overflow-visible">
            <div
              className="text-white font-black leading-none"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              TODAY'S
            </div>
            <div
              className="text-white font-black leading-none"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              OFFER!
            </div>
            <div className="mt-4">
              <span className="bg-[#ef4444] text-white font-bold px-6 py-2 rounded-full text-sm uppercase tracking-wider inline-block">
                Steak Society
              </span>
            </div>

            {/* Decorative plus */}
            <div className="absolute top-4 right-0 translate-x-1/2 text-[#ef4444] text-3xl font-bold">
              +
            </div>
          </div>
        </div>

        {/* Hero food image placeholder */}
        <div className="hidden md:block absolute right-0 bottom-0 w-80 h-64 pointer-events-none">
          <div className="w-full h-full flex items-end justify-center">
            <div className="w-56 h-56 rounded-full bg-[#e8e0d0] opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
}
