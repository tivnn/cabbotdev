import PlanetScene from "./PlanetScene";
import EncodedRole from "./EncodedRole";
import CursorLight from "./CursorLight";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <PlanetScene />
      <CursorLight />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black" />

      <nav className="absolute left-1/2 top-8 z-30 -translate-x-1/2">
        <div className="pointer-events-auto flex gap-6 rounded-full border border-white/10 bg-black/30 px-6 py-3 text-sm text-slate-300 backdrop-blur-md">
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

      <div className="relative z-20 flex min-h-screen items-center px-6">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-blue-200/80">
            Mission Control // Cabbotdev
          </p>

          <h1 className="max-w-3xl text-6xl font-black leading-none tracking-tight text-white md:text-8xl">
            Christian
            <br />
            <span className="text-blue-300">Abbot</span>
          </h1>

          <div className="mt-5">
            <EncodedRole />
          </div>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            Computer Science student building software, data tools, and
            game-inspired web experiences.
          </p>

          <div className="pointer-events-auto mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="rounded-full bg-blue-500 px-7 py-3 text-center font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
            >
              Start Mission
            </a>

            <a
              href="#contact"
              className="rounded-full border border-blue-300/40 px-7 py-3 text-center font-semibold text-blue-100 transition hover:bg-blue-400/10"
            >
              Send Signal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;