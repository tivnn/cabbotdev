import { useEffect, useState } from "react";

const finalText = "OPEN TO INTERNSHIPS";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function EncodedRole() {
  const [displayText, setDisplayText] = useState(finalText);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      // instantly reveal and stop animation
      setDisplayText(finalText);
      return;
    }

    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return finalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        pointer-events-auto
        bg-transparent
        px-0 py-1
        font-mono
        text-lg
        font-bold
        uppercase
        tracking-[0.3em]
        text-lime-400
        drop-shadow-[0_0_8px_rgba(163,255,0,0.6)]
        transition duration-200
        hover:text-lime-300
      "
    >
      {displayText}
    </button>
  );
}