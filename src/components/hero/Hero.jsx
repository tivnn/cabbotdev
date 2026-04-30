import { useState } from "react";

import PlanetScene from "./PlanetScene";
import MoonForeground from "./MoonForeground";
import EncodedRole from "./EncodedRole";
import CursorLight from "./CursorLight";
import TwinklingStars from "./TwinklingStars";
import ShootingStar from "./ShootingStar";
import SunOverlay from "./SunOverlay";
import EncryptedName from "./EncryptedName";

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <PlanetScene />
      <SunOverlay />
      <TwinklingStars />
      <ShootingStar />
      <CursorLight />
      <MoonForeground />

      <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-b from-transparent via-black/5 to-black/90" />

      {/* Desktop nav */}
      <nav className="absolute left-1/2 top-8 z-40 hidden -translate-x-1/2 md:block">
        <div className="pointer-events-auto flex gap-7 rounded-full border border-white/10 bg-black/40 px-7 py-3 text-sm text-slate-300 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <a href="#profile" className="transition hover:text-white">
            About
          </a>
          <a href="#projects" className="transition hover:text-white">
            Projects
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </nav>

      {/* Mobile hamburger */}
      <div className="fixed right-5 top-5 z-[999] md:hidden">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-xl transition hover:bg-white/10"
          aria-label="Toggle navigation menu"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-white transition ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-white transition ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-white transition ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        {isMenuOpen && (
          <div className="pointer-events-auto absolute right-0 mt-3 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-2 text-sm text-slate-200 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <a
              href="#profile"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-white"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-white"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-white"
            >
              Contact
            </a>
          </div>
        )}
      </div>

      <div className="relative z-30 flex min-h-[100svh] items-center px-6 pt-20 sm:px-10 md:px-16 lg:px-24">
        <div className="w-full max-w-[720px]">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-200/80 sm:text-sm sm:tracking-[0.45em]">
            Software Development // CABBOTDEV
          </p>

          <EncryptedName />

          <div className="mt-5">
            <EncodedRole />
          </div>

          <p className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            I build clean software, data tools, and interactive web experiences
            with a focus on usability, motion, and thoughtful design.
          </p>

          <div className="pointer-events-auto mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="#projects"
              className="rounded-full bg-blue-500 px-7 py-3 text-center font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-blue-400/40"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-blue-300/40 px-7 py-3 text-center font-semibold text-blue-100 transition hover:-translate-y-0.5 hover:border-blue-300/70 hover:bg-blue-400/10"
            >
              Contact Me
            </a>

            <p className="absolute bottom-6 right-6 z-20 text-xs text-white/40">
              © 2026 Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;