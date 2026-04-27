import { useEffect, useState } from "react";

function MoonForeground() {
  const [scrollY, setScrollY] = useState(0);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }

    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isPhone = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;
  const isWide = size.width >= 1280;

  const driftX = Math.sin(scrollY * 0.002) * 8;
  const driftY = Math.min(scrollY * 0.06, 70);
  const darkness = Math.min(scrollY / 850, 0.8);

  const moonStyle = {
    width: isPhone ? "185vw" : isTablet ? "120vw" : isWide ? "82vw" : "95vw",
    right: isPhone ? "-108vw" : isTablet ? "-48vw" : isWide ? "-15vw" : "-25vw",
    bottom: isPhone ? "-18vh" : isTablet ? "-22vh" : isWide ? "-26vh" : "-24vh",
    transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(1.02)`,
    filter: `brightness(${1 - darkness * 0.45}) contrast(1.08) saturate(0.9)`,
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <img
        src="/textures/moon-foreground.png"
        alt=""
        className="absolute max-w-none select-none"
        style={moonStyle}
      />

      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: darkness,
        }}
      />
    </div>
  );
}

export default MoonForeground;