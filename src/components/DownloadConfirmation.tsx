import { useEffect } from "react";
import AnimatedCheck from "./AnimatedCheck";

export const CONFIRMATION_DURATION_MS = 4000;

type Props = {
  name: string;
  onDone: () => void;
};

function DownloadConfirmation({ name, onDone }: Props) {
  const firstName = name.split(/\s+/)[0];

  useEffect(() => {
    const timer = window.setTimeout(onDone, CONFIRMATION_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 px-4 backdrop-blur-md"
    >
      <div className="w-full max-w-sm animate-pop-in overflow-hidden rounded-3xl bg-white text-center shadow-2xl">
        <div className="px-8 pb-8 pt-10">
          <AnimatedCheck
            className="size-20 bg-primary text-accent"
            ringClassName="bg-primary/40"
          />
          <h2
            className="mt-6 animate-fade-up text-2xl font-black tracking-tight text-primary"
            style={{ animationDelay: "250ms" }}
          >
            Flyer saved!
          </h2>
          <p
            className="mt-2 animate-fade-up text-slate-600"
            style={{ animationDelay: "350ms" }}
          >
            Thanks, {firstName}. Share it with your friends and bring someone along.
            See you at Youth Week 2026!
          </p>
          <button
            type="button"
            onClick={onDone}
            className="mt-6 min-h-12 w-full animate-fade-up rounded-xl bg-primary font-bold text-white transition hover:bg-primary-light"
            style={{ animationDelay: "450ms" }}
          >
            Done
          </button>
        </div>
        <div className="h-1.5 bg-slate-100">
          <div
            className="h-full origin-left animate-countdown bg-accent"
            style={{ animationDuration: `${CONFIRMATION_DURATION_MS}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

export default DownloadConfirmation;
