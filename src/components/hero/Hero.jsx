import PlanetScene from "./PlanetScene";
import MoonForeground from "./MoonForeground";
import EncodedRole from "./EncodedRole";
import CursorLight from "./CursorLight";

function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <PlanetScene />
      <CursorLight />
      <MoonForeground />

      <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-b from-transparent via-black/5 to-black/90" />

      <nav className="absolute left-1/2 top-5 z-40 -translate-x-1/2 sm:top-8">
        <div className="pointer-events-auto flex gap-4 rounded-full border border-white/10 bg-black/35 px-5 py-3 text-xs text-slate-300 backdrop-blur-md sm:gap-6 sm:px-6 sm:text-sm">
          <a href="#profile" className="transition hover:text-white">
            Profile
          </a>
          <a href="#projects" className="transition hover:text-white">
            Missions
          </a>
          <a href="#contact" className="transition hover:text-white">
            Signal
          </a>
        </div>
      </nav>

      <div className="relative z-30 flex min-h-[100svh] items-center px-6 pt-20 sm:px-10 md:px-16 lg:px-24">
        <div className="w-full max-w-[720px]">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-200/80 sm:text-sm sm:tracking-[0.45em]">
            Mission Control // CABBOTDEV
          </p>

          <h1 className="max-w-3xl text-[clamp(3.4rem,8vw,6.5rem)] font-black leading-[0.9] tracking-tight text-white">
            Christian
            <br />
            <span className="text-blue-300">Abbot</span>
          </h1>

          <div className="mt-5">
            <EncodedRole />
          </div>

          <p className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Computer Science student building software, data tools, and
            game-inspired web experiences.
          </p>

          <div className="pointer-events-auto mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="#projects"
              className="rounded-full bg-blue-500 px-7 py-3 text-center font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
            >
              Explore Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-blue-300/40 px-7 py-3 text-center font-semibold text-blue-100 transition hover:bg-blue-400/10"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;