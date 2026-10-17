import AnimatedCheck from "./AnimatedCheck";

type Props = {
  name: string;
  flyerUrl: string;
  fileName: string;
  onDownload: () => void;
  onEdit: () => void;
};

const stagger = (ms: number) => ({ animationDelay: `${ms}ms` });

function FlyerResult({ name, flyerUrl, fileName, onDownload, onEdit }: Props) {
  const firstName = name.split(/\s+/)[0];

  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-primary px-4 py-14 text-white sm:px-8 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -z-10 size-168 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a4bb8]/40 blur-3xl"
      />

      <div className="mx-auto w-full max-w-xl text-center">
        <AnimatedCheck
          className="size-16 bg-accent text-primary sm:size-20"
          ringClassName="bg-accent"
        />

        <p
          className="mt-6 animate-fade-up text-sm font-bold uppercase tracking-[0.25em] text-accent"
          style={stagger(250)}
        >
          Attendance confirmed
        </p>
        <h2
          className="mt-3 animate-fade-up text-3xl font-black tracking-tight sm:text-5xl"
          style={stagger(350)}
        >
          See you there, {firstName}!
        </h2>
        <p className="mt-3 animate-fade-up text-white/75" style={stagger(450)}>
          Here’s your personalised Youth Week 2026 flyer.
        </p>

        <img
          src={flyerUrl}
          alt={`Personalised Youth Week 2026 flyer for ${name}`}
          className="mt-10 aspect-square w-full animate-pop-in rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10"
          style={stagger(550)}
        />

        <div className="animate-fade-up" style={stagger(800)}>
          <a
            href={flyerUrl}
            download={fileName}
            onClick={onDownload}
            className="mt-10 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-lg font-bold text-primary shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-[#ffd84d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.69L6.28 8.47a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06l-2.97 2.97V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
            Download My Flyer
          </a>

          <button
            type="button"
            onClick={onEdit}
            className="mt-4 min-h-12 px-4 font-bold text-white/80 underline-offset-4 transition hover:text-white hover:underline"
          >
            Edit my details
          </button>
        </div>
      </div>
    </section>
  );
}

export default FlyerResult;
