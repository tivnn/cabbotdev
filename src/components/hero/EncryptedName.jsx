import { useEffect, useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>?/{}[]";

function EncryptedName() {
  const finalText = "Christian\nAbbot";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let frame = 0;
    const revealSpeed = 3;

    const interval = setInterval(() => {
      const nextText = finalText
        .split("")
        .map((char, index) => {
          if (char === "\n") return "\n";
          if (char === " ") return " ";

          if (index < frame / revealSpeed) {
            return finalText[index];
          }

          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        })
        .join("");

      setDisplayText(nextText);

      if (frame / revealSpeed >= finalText.length) {
        clearInterval(interval);
        setDisplayText(finalText);
      }

      frame += 1;
    }, 35);

    return () => clearInterval(interval);
  }, []);

  const [firstName, lastName] = displayText.split("\n");

  return (
    <h1 className="max-w-3xl text-[clamp(4rem,8vw,6.5rem)] font-black leading-[0.9] tracking-tight text-white">
      <span>{firstName || "/////////"}</span>
      <br />
      <span className="text-blue-300">{lastName || "/////"}</span>
    </h1>
  );
}

export default EncryptedName;