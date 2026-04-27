import { useEffect, useState } from "react";

const finalText = "Software Developer";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>/{}[]";

function EncodedRole() {
  const [displayText, setDisplayText] = useState("S0F7W@R3_D3V_014");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    let interval;

    if (isRevealed) {
      let iteration = 0;

      interval = setInterval(() => {
        setDisplayText(
          finalText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return finalText[index];
              }

              if (letter === " ") {
                return " ";
              }

              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iteration >= finalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, 35);
    } else {
      interval = setInterval(() => {
        setDisplayText(
          finalText
            .split("")
            .map((letter) => {
              if (letter === " ") {
                return " ";
              }

              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );
      }, 90);
    }

    return () => clearInterval(interval);
  }, [isRevealed]);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      className="pointer-events-auto rounded-md border border-blue-300/20 bg-black/30 px-4 py-2 font-mono text-sm uppercase tracking-[0.25em] text-blue-200 backdrop-blur-sm transition hover:border-blue-300/60 hover:text-white"
    >
      {displayText}
    </button>
  );
}

export default EncodedRole;
