function Hero() {
  return (
    <header className="relative isolate overflow-hidden bg-primary text-white">
      <img
        src="/image/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-linear-to-b from-primary/30 via-primary/40 to-primary/90"
      />

      <div className="mx-auto flex min-h-svh max-w-5xl flex-col items-center px-5 pb-12 pt-10 text-center sm:px-8 sm:pb-16 sm:pt-14">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-lg shadow-black/20 sm:px-8 sm:py-5">
          <img
            src="/image/logo.png"
            alt="RCCG Young Adults & Youths and Faith Sanctuary"
            className="h-16 w-auto sm:h-24"
          />
        </div>

        <h1 className="mt-10 text-3xl font-black leading-[0.95] tracking-tight drop-shadow-lg sm:text-4xl lg:text-6xl">
          Youth Week 2026
        </h1>

        <div className="relative my-8 min-h-72 w-full flex-1 sm:my-10 sm:min-h-96">
          <img
            src="/image/theme-hands.png"
            alt="That I May Know Him"
            className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
          />
        </div>

        <div className="flex w-full flex-col items-center">
          <div className="mt-8 grid w-full max-w-2xl gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 text-left backdrop-blur-sm sm:grid-cols-2">
            <div className="bg-primary/60 px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Thurs – Sun
              </p>
              <p className="mt-1.5 text-lg font-bold sm:text-xl">
                November 26th - 29th, 2026
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
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 font-bold text-primary transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Get my flyer
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Hero;
