import { motion } from "framer-motion";

const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -40,
    filter: "brightness(0.35)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "brightness(1)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 45,
    filter: "brightness(0.35) saturate(0.55)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "brightness(1) saturate(1)",
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 55,
    filter: "brightness(0.28) saturate(0.35) blur(2px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "brightness(1) saturate(1.08) blur(0px)",
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
      className="relative -mt-28 flex min-h-screen items-center overflow-hidden bg-black px-6 pt-40 pb-24 text-white sm:px-10 md:px-16 lg:px-24"
    >
      {/* Smooth blend from hero into profile */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black via-black/95 to-transparent" />

      {/* Soft sunlight / space tint, no grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_38%,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_78%_36%,rgba(255,170,60,0.07),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.p
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.75 }}
          className="mb-10 text-xs uppercase tracking-[0.45em] text-blue-200/70"
        >
          Profile // About Me
        </motion.p>

        <div className="grid min-h-[68vh] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.55 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/40 backdrop-blur-md">
              <img
                src="/images/profile.jpeg"
                alt="Christian Abbot"
                className="h-[520px] w-full rounded-[1.5rem] object-cover object-center"
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.55 }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Hi, I'm Christian Abbot
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Profile;