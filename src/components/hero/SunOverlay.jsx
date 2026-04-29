import { motion, useScroll, useTransform } from "framer-motion";

function SunOverlay() {
  const { scrollYProgress } = useScroll();

  // Scroll movement
  const y = useTransform(scrollYProgress, [0, 0.18, 0.35], [0, 80, 180]);
  const x = useTransform(scrollYProgress, [0, 0.35], [0, -35]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.38], [1, 0.75, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.94]);

  return (
    <motion.div
      style={{ x, y, opacity, scale }}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {/* 
        MOBILE SUN POSITION CONTROLS:
        Change translate-x / translate-y below to move the whole sun on mobile.
        
        Examples:
        translate-x-[-2rem] = move left
        translate-x-[2rem] = move right
        translate-y-[3rem] = move down
        translate-y-[-2rem] = move up

        The sm:translate-x-0 sm:translate-y-0 keeps desktop unchanged.
      */}
      <div className="absolute inset-0 translate-x-[0rem] translate-y-[0rem] sm:translate-x-0 sm:translate-y-0">
        {/* Large warm solar wash */}
        <div className="absolute left-[-18rem] top-[-18rem] h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(255,221,120,0.34)_0%,rgba(255,180,60,0.18)_28%,rgba(255,132,24,0.08)_48%,transparent_72%)] blur-2xl" />

        {/* Directional sunlight beam */}
        <div className="absolute left-[-2rem] top-[-4rem] h-[110vh] w-[42rem] rotate-[-5deg] bg-[linear-gradient(90deg,rgba(255,190,80,0.30)_0%,rgba(255,205,120,0.16)_22%,rgba(255,225,170,0.06)_42%,transparent_72%)] blur-2xl" />

        {/* Thin warm ray streaks */}
        <div className="absolute left-[6rem] top-[5.6rem] h-[2px] w-[28rem] rotate-[8deg] bg-gradient-to-r from-yellow-100/35 via-orange-200/12 to-transparent blur-sm" />
        <div className="absolute left-[5rem] top-[7.4rem] h-[1px] w-[24rem] rotate-[14deg] bg-gradient-to-r from-yellow-100/25 via-orange-200/10 to-transparent blur-sm" />
        <div className="absolute left-[5.8rem] top-[4.2rem] h-[1px] w-[18rem] rotate-[-3deg] bg-gradient-to-r from-yellow-100/20 via-orange-200/8 to-transparent blur-sm" />

        {/* Sun halo layers */}
        <div className="absolute left-[3.1rem] top-[3.1rem] h-48 w-48 rounded-full bg-yellow-200/10 blur-md" />
        <div className="absolute left-[4.1rem] top-[4.1rem] h-32 w-32 rounded-full bg-yellow-300/20 blur-sm" />

        {/* Hot sun core */}
        <div className="absolute left-[5.25rem] top-[5.25rem] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,235,1)_0%,rgba(255,246,180,1)_38%,rgba(255,215,95,0.95)_68%,rgba(255,172,55,0.4)_100%)] shadow-[0_0_34px_rgba(255,235,150,0.65),0_0_80px_rgba(255,180,55,0.35),0_0_150px_rgba(255,132,24,0.18)] animate-[solarPulse_7s_ease-in-out_infinite]" />

        {/* Cleaner lens flare line */}
        <div className="absolute left-[17rem] top-[7.2rem] h-2 w-2 rounded-full bg-yellow-100/25 blur-[1px]" />
        <div className="absolute left-[23rem] top-[8.15rem] h-4 w-4 rounded-full bg-yellow-100/18 blur-[2px]" />
        <div className="absolute left-[29rem] top-[9rem] h-2.5 w-2.5 rounded-full bg-white/20 blur-[1px]" />
      </div>
    </motion.div>
  );
}

export default SunOverlay;