import confetti from "canvas-confetti";

const COLORS = ["#f1c30c", "#ffffff", "#3b6cf6", "#ffd84d"];

// Two side cannons followed by a short trailing stream.
export function celebrate() {
  const defaults = { colors: COLORS, disableForReducedMotion: true, zIndex: 60 };

  confetti({ ...defaults, particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.75 } });
  confetti({ ...defaults, particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.75 } });

  const end = Date.now() + 1400;
  const frame = () => {
    confetti({ ...defaults, particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
    confetti({ ...defaults, particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

// A smaller burst from the centre, used after download.
export function burst() {
  confetti({
    colors: COLORS,
    disableForReducedMotion: true,
    zIndex: 60,
    particleCount: 120,
    spread: 100,
    startVelocity: 35,
    origin: { x: 0.5, y: 0.45 },
  });
}
