import { useEffect, useState } from "react";

function CursorLight() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    function handleMouseMove(event) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
      style={{
        background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, rgba(255, 184, 77, 0.18), rgba(255, 138, 0, 0.08) 28%, transparent 55%)`,
      }}
    />
  );
}

export default CursorLight;