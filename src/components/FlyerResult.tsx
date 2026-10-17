type Props = {
  name: string;
  flyerUrl: string;
  fileName: string;
  onEdit: () => void;
};

function FlyerResult({ name, flyerUrl, fileName, onEdit }: Props) {
  const firstName = name.split(/\s+/)[0];

  return (
    <div className="mx-auto w-full max-w-xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700">
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
        Attendance confirmed
      </span>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        See you there, {firstName}!
      </h2>
      <p className="mt-2 text-slate-600">Here’s your personalised Youth Week 2026 flyer.</p>

      <img
        src={flyerUrl}
        alt={`Personalised Youth Week 2026 flyer for ${name}`}
        className="mt-8 aspect-square w-full rounded-xl shadow-2xl shadow-primary/25"
      />

      <a
        href={flyerUrl}
        download={fileName}
        className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-lg font-bold text-white transition hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
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
        className="mt-4 min-h-12 px-4 font-bold text-primary underline-offset-4 hover:underline"
      >
        Edit my details
      </button>
    </div>
  );
}

export default FlyerResult;
