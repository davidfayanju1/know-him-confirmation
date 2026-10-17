import { useEffect, useRef, useState } from "react";
import AttendanceForm, { type AttendanceDetails } from "../components/AttendanceForm";
import FlyerResult from "../components/FlyerResult";
import Hero from "../components/Hero";
import { flyerFileName, generateFlyer } from "../lib/flyer";

type Flyer = AttendanceDetails & { flyerUrl: string };

function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const [details, setDetails] = useState<AttendanceDetails | null>(null);
  const [flyer, setFlyer] = useState<Flyer | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (flyer) URL.revokeObjectURL(flyer.flyerUrl);
    };
  }, [flyer]);

  const scrollToSection = () =>
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  const handleSubmit = async (next: AttendanceDetails) => {
    setSubmitting(true);
    setError("");
    try {
      const blob = await generateFlyer(next.name, next.photoUrl);
      setDetails(next);
      setFlyer({ ...next, flyerUrl: URL.createObjectURL(blob) });
      scrollToSection();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = () => {
    setFlyer(null);
    scrollToSection();
  };

  return (
    <>
      <Hero />

      <main>
        <section
          id="information"
          ref={sectionRef}
          className="scroll-mt-4 bg-white px-4 py-16 sm:px-8 sm:py-24"
        >
          {flyer ? (
            <FlyerResult
              name={flyer.name}
              flyerUrl={flyer.flyerUrl}
              fileName={flyerFileName(flyer.name)}
              onEdit={handleEdit}
            />
          ) : (
            <>
              <AttendanceForm
                initialName={details?.name}
                initialPhotoUrl={details?.photoUrl}
                submitting={submitting}
                onSubmit={handleSubmit}
              />
              {error && (
                <p role="alert" className="mx-auto mt-4 max-w-xl text-center text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
            </>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-100 px-4 py-8 text-center text-sm text-slate-500">
        Youth Week 2026 · Faith Sanctuary
      </footer>
    </>
  );
}

export default Home;
