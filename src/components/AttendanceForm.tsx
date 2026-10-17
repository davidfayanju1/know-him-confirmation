import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";

const MAX_PHOTO_BYTES = 15 * 1024 * 1024;

export type AttendanceDetails = {
  name: string;
  photoUrl: string;
};

type Props = {
  initialName?: string;
  initialPhotoUrl?: string;
  submitting: boolean;
  onSubmit: (details: AttendanceDetails) => void;
};

function AttendanceForm({ initialName = "", initialPhotoUrl = "", submitting, onSubmit }: Props) {
  const ids = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initialName);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);
  const [photoName, setPhotoName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [attending, setAttending] = useState(Boolean(initialName && initialPhotoUrl));
  const [touched, setTouched] = useState({ name: false, photo: false, attending: false });

  const missing = [
    !name.trim() && "enter your full name",
    !photoUrl && "upload your picture",
    !attending && "tick “I will be attending”",
  ].filter(Boolean) as string[];
  const isComplete = missing.length === 0;

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setTouched((t) => ({ ...t, photo: true }));
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file (JPG, PNG or HEIC).");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("That picture is too large. Please choose one under 15 MB.");
      return;
    }

    setPhotoError("");
    setPhotoName(file.name);
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, photo: true, attending: true });
    if (!isComplete || submitting) return;
    onSubmit({ name: name.trim(), photoUrl });
  };

  const nameError = touched.name && !name.trim();
  const photoMissing = touched.photo && !photoUrl;
  const attendingError = touched.attending && !attending;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"
    >
      <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Information</h2>
      <p className="mt-2 text-slate-600">
        Fill in your details to confirm attendance and get your personalised e-flyer.
      </p>

      <div className="mt-8 space-y-7">
        <div>
          <label htmlFor={`${ids}-name`} className="block text-sm font-bold text-slate-800">
            Name
          </label>
          <input
            id={`${ids}-name`}
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={nameError}
            aria-describedby={nameError ? `${ids}-name-error` : undefined}
            className={`mt-2 block min-h-12 w-full rounded-xl border bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:ring-4 ${
              nameError
                ? "border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-primary focus:ring-primary/10"
            }`}
          />
          {nameError && (
            <p id={`${ids}-name-error`} className="mt-2 text-sm font-medium text-red-600">
              Please enter your name.
            </p>
          )}
        </div>

        <div>
          <span className="block text-sm font-bold text-slate-800">Upload Picture</span>
          <input
            ref={fileInput}
            id={`${ids}-photo`}
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="sr-only"
            aria-describedby={`${ids}-photo-help`}
          />
          <label
            htmlFor={`${ids}-photo`}
            className={`mt-2 flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed p-4 transition hover:border-primary hover:bg-primary/5 ${
              photoMissing || photoError ? "border-red-400" : "border-slate-300"
            }`}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Preview of your uploaded picture"
                className="size-20 shrink-0 rounded-lg object-cover sm:size-24"
              />
            ) : (
              <span className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 sm:size-24">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75 7.5 10.5l4.5 4.5 3-3 6.75 6.75M3.75 20.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5ZM15.75 8.25h.008v.008h-.008V8.25Z" />
                </svg>
              </span>
            )}
            <span className="min-w-0">
              <span className="block font-bold text-primary">
                {photoUrl ? "Change picture" : "Choose a picture"}
              </span>
              <span id={`${ids}-photo-help`} className="mt-0.5 block truncate text-sm text-slate-500">
                {photoName || "A clear, front-facing photo works best"}
              </span>
            </span>
          </label>
          {(photoError || photoMissing) && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {photoError || "Please upload your picture."}
            </p>
          )}
        </div>

        <div>
          <span className="block text-sm font-bold text-slate-800">Attendance</span>
          <label
            className={`mt-2 flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
              attending
                ? "border-primary bg-primary/5"
                : attendingError
                  ? "border-red-400"
                  : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <input
              type="checkbox"
              checked={attending}
              onChange={(e) => {
                setAttending(e.target.checked);
                setTouched((t) => ({ ...t, attending: true }));
              }}
              className="size-5 shrink-0 accent-primary"
            />
            <span className="font-medium text-slate-800">I will be attending</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isComplete || submitting}
        className="mt-9 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-bold text-white transition hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      >
        {submitting && (
          <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
        )}
        {submitting ? "Creating your flyer…" : "Confirm Attendance"}
      </button>

      {!isComplete && (
        <p className="mt-4 text-center text-sm text-slate-500" aria-live="polite">
          To continue, please {formatList(missing)}.
        </p>
      )}
    </form>
  );
}

function formatList(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export default AttendanceForm;
