import { motion } from "framer-motion";

const labelReveal = {
  hidden: {
    opacity: 0,
    x: -30,
    filter: "brightness(0.25)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "brightness(1)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const contentReveal = {
  hidden: {
    opacity: 0,
    y: 65,
    scale: 0.96,
    filter: "brightness(0.12) saturate(0.35) blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "brightness(1) saturate(1) blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Profile() {
  return (
    <section
      id="profile"
      className="relative -mt-28 min-h-screen overflow-hidden bg-black px-6 pt-36 pb-24 text-white sm:px-10 md:px-16 lg:px-24"
    >
      {/* Black blend from hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 bg-gradient-to-b from-black via-black/95 to-transparent" />

      {/* Dark base */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black" />

      {/* Soft color that feels like it appears as content reveals */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.32 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_25%,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(255,170,60,0.07),transparent_30%),linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl items-center">
        <div className="w-full">
          <motion.p
            variants={labelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.45 }}
            className="mb-10 text-xs uppercase tracking-[0.45em] text-blue-200/70"
          >
            Profile // About Me
          </motion.p>

          {/* Image and text reveal together */}
          <motion.div
            variants={contentReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.18 }}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          >
            {/* Image */}
            <div className="relative mx-auto w-full max-w-[390px] sm:max-w-[430px] lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/40 backdrop-blur-md">
                <img
                  src="/images/profile.jpeg"
                  alt="Christian Abbot"
                  className="h-[310px] w-full rounded-[1.5rem] object-cover object-center sm:h-[430px] lg:h-[520px]"
                />
              </div>
            </div>

            {/* Text */}
            <div className="max-w-3xl">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Hi, I&apos;m Christian Abbot
              </h2>

              <div className="mt-8 space-y-6 text-base leading-8 text-slate-300 sm:text-lg">
                <p>
                  I am a junior Computer Science student at Cal Poly Pomona,
                  class of 2028. I am an aspiring software developer who enjoys
                  building projects that are useful, clean, and personal.
                </p>

                <p>
                  My goal is to keep growing as a developer and make an impact
                  through the work I create, even if that impact starts with
                  something small. I care about learning, improving, and becoming
                  someone who can contribute to real projects with purpose.
                </p>

                <p>
                  One of my dream goals is to work for an aerospace company, and
                  I would love the opportunity to grow through an internship where
                  I can apply my skills, learn from experienced engineers, and
                  help build meaningful technology.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <span className="rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-100">
                  Computer Science
                </span>
                <span className="rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-100">
                  Software Development
                </span>
                <span className="rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-100">
                  Aerospace Interest
                </span>
                <span className="rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-100">
                  React / C++ / JavaScript
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Profile;