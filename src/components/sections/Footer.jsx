import { motion } from "framer-motion";

function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 md:px-16 lg:px-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(239,68,68,0.12),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.10),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:120px_120px]" />

      <motion.div
        initial={{ opacity: 0, y: 45, filter: "brightness(0.4)" }}
        whileInView={{ opacity: 1, y: 0, filter: "brightness(1)" }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-blue-200/70">
          Let&apos;s Connect
        </p>

        <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Open to internships, projects, and new opportunities.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          Feel free to reach out if you want to connect, collaborate, or learn
          more about my work.
        </p>

        {/* Resume button */}
        <div className="mt-10">
          <a
            href="/resume-cabbot.pdf"
            download
            className="inline-flex rounded-full bg-red-600 px-10 py-4 text-sm font-black uppercase tracking-[0.25em] text-white shadow-lg shadow-red-600/30 transition hover:-translate-y-1 hover:bg-red-500 hover:shadow-red-500/40"
          >
            Download Resume
          </a>
        </div>

        {/* Contact info */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Phone
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              +1 (562) 551-4719
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Email
            </p>
            <a
              href="mailto:coabbot@cpp.edu"
              className="mt-2 inline-block text-lg font-semibold text-blue-300 transition hover:text-blue-200"
            >
              coabbot@cpp.edu
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              LinkedIn
            </p>
            <a
              href="https://www.linkedin.com/in/tivvn"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-lg font-semibold text-blue-300 transition hover:text-blue-200"
            >
              tivvn
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              GitHub
            </p>
            <a
              href="https://github.com/tivnn"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-lg font-semibold text-blue-300 transition hover:text-blue-200"
            >
              tivnn
            </a>
          </div>
        </div>

        <p className="mt-14 text-sm text-slate-600">
          Built by Christian O. Abbot.
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;