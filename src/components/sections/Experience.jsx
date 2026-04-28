import { motion } from "framer-motion";

const experiences = [
  {
    period: "Sep 2024 – Jan 2025",
    role: "STEM Intern & Team Lead",
    company: "Northrop Grumman STEM Internship",
    location: "Rio Hondo College, CA",
    type: "AI Research / Team Leadership",
    description:
      "Led a 5-person intern team exploring AI-driven workflow solutions, testing real-world applications, and presenting technical ideas to engineers.",
    bullets: [
      "Led a team of interns through AI-focused research and prototyping.",
      "Explored practical AI applications through testing and iteration.",
      "Presented technical solutions and proposed a Python-based AI integration concept.",
    ],
  },
  {
    period: "Jan 2026 – Present",
    role: "Election Data Integrity Analyst",
    company: "FPM Petition Management",
    location: "West Covina, CA",
    type: "Data Accuracy / Verification",
    description:
      "Work with high-volume voter datasets where accuracy, consistency, and careful handling of sensitive information are essential.",
    bullets: [
      "Verified structured voter datasets for accuracy and compliance.",
      "Identified and resolved inconsistencies in sensitive data.",
      "Maintained precision while working under strict standards.",
    ],
  },
  {
    period: "Sep 2023 – Jan 2026",
    role: "Geek Squad Agent & Sales Advisor",
    company: "Best Buy",
    location: "CA",
    type: "Technical Support / Customer Communication",
    description:
      "Diagnosed hardware and software issues, explained technical solutions clearly, and handled multiple customer-facing tasks in a fast-paced environment.",
    bullets: [
      "Diagnosed hardware and software issues using structured troubleshooting.",
      "Explained technical problems to non-technical users in clear language.",
      "Balanced repair, support, and sales responsibilities in a busy environment.",
    ],
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 70,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 md:px-16 lg:px-24"
    >
      {/* Dark space background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,black_0%,rgba(2,6,23,0.98)_45%,black_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.11),transparent_28%),radial-gradient(circle_at_82%_70%,rgba(255,184,77,0.07),transparent_30%)]" />

      {/* Subtle grid/stars */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:130px_130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-blue-200/70">
            Career Log // Experience
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Relevant Experience
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            A focused look at the roles that shaped my problem-solving,
            technical communication, data accuracy, and interest in software
            and AI.
          </p>
        </motion.div>

        <div className="mt-14 space-y-6">
          {experiences.map((item, index) => (
            <motion.article
              key={item.role}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              transition={{ delay: index * 0.12 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-md transition hover:border-blue-300/30 hover:bg-white/[0.055] sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.14),transparent_34%)]" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[0.28fr_1fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-200/60">
                    {item.period}
                  </p>

                  <div className="mt-5 inline-flex rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                    {item.type}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {item.role}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-blue-200/80">
                    {item.company} · {item.location}
                  </p>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
                    {item.description}
                  </p>

                  <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-3">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-2xl border border-white/10 bg-black/25 p-4"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;