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
        background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(147, 197, 253, 0.16), transparent 45%)`,
      }}
    />
  );
}

export default CursorLight;