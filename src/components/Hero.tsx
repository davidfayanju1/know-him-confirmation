function Hero() {
  return (
    <header className="relative isolate overflow-hidden bg-primary text-white">
      <img
        src="/image/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-primary/40 via-primary/55 to-primary/90"
      />

      <div className="mx-auto flex min-h-[88svh] max-w-5xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-24">
        <div className="rounded-2xl bg-white px-5 py-3 shadow-lg shadow-black/20 sm:px-7 sm:py-4">
          <img
            src="/image/logo.png"
            alt="RCCG Young Adults & Youths and Faith Sanctuary"
            className="h-20 w-auto sm:h-28"
          />
        </div>

        <h1 className="mt-10 text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          Youth Week 2026
        </h1>

        <p className="mt-5 text-xl font-medium text-accent sm:text-3xl">
          “That I May Know Him”
        </p>

        <div className="mt-10 grid w-full max-w-2xl gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 text-left backdrop-blur-sm sm:grid-cols-2">
          <div className="bg-primary/60 px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Thurs – Sun
            </p>
            <p className="mt-1.5 text-lg font-bold sm:text-xl">
              November 26th – 29th, 2026
            </p>
          </div>
          <div className="bg-primary/60 px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Faith Sanctuary
            </p>
            <p className="mt-1.5 text-base font-medium leading-snug text-white/90">
              26, Apo-Eso Str., Off Powerline Rd, Ejigbo, Lagos.
            </p>
          </div>
        </div>

        <a
          href="#information"
          className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 font-bold text-primary transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Get my flyer
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Hero;
