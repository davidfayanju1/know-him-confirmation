type Props = {
  className?: string;
  ringClassName?: string;
};

// Circular badge whose tick draws itself in, with a soft pulsing ring behind.
function AnimatedCheck({ className = "", ringClassName = "" }: Props) {
  return (
    <span className={`relative inline-flex animate-pop-in items-center justify-center rounded-full ${className}`}>
      <span
        aria-hidden="true"
        className={`absolute inset-0 animate-ring rounded-full ${ringClassName}`}
      />
      <svg viewBox="0 0 24 24" fill="none" className="relative size-1/2" aria-hidden="true">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          className="animate-draw"
        />
      </svg>
    </span>
  );
}

export default AnimatedCheck;
