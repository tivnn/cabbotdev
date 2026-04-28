import { useEffect, useState } from "react";

function ShootingStar() {
  const [star, setStar] = useState(null);

  useEffect(() => {
    let spawnTimeout;
    let removeTimeout;

    function spawnStar() {
      const delay = 8000 + Math.random() * 12000;

      spawnTimeout = setTimeout(() => {
        const newStar = {
          id: Date.now(),
          top: 10 + Math.random() * 35,
          left: -12,
          distance: 85 + Math.random() * 25,
          drop: 3 + Math.random() * 7,
          duration: 900 + Math.random() * 400,
        };

        setStar(newStar);

        removeTimeout = setTimeout(() => {
          setStar(null);
          spawnStar();
        }, newStar.duration + 200);
      }, delay);
    }

    spawnStar();

    return () => {
      clearTimeout(spawnTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (!star) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div
        key={star.id}
        className="shooting-star"
        style={{
          top: `${star.top}%`,
          left: `${star.left}%`,
          "--distance": `${star.distance}vw`,
          "--drop": `${star.drop}vh`,
          "--duration": `${star.duration}ms`,
        }}
      >
        <span className="shooting-star-tail" />
        <span className="shooting-star-head" />
      </div>
    </div>
  );
}

export default ShootingStar;