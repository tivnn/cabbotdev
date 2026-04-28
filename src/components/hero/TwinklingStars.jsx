import { useMemo } from "react";

function TwinklingStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, index) => {
      const size = Math.random() * 2.2 + 0.6;
      const duration = Math.random() * 3.5 + 2.5;
      const delay = Math.random() * 5;

      return {
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        duration,
        delay,
        opacity: Math.random() * 0.55 + 0.25,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.75)]"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default TwinklingStars;