const projects = [
  {
    number: "01",
    title: "Personalized Birthday Website",
    description:
      "A custom interactive website built as a personal gift, focused on animation, polished UI, and a smooth user experience. It was designed to feel thoughtful, playful, and visually clean while showing my front-end skills.",
    tags: ["React", "JavaScript", "Tailwind"],
  },
  {
    number: "02",
    title: "3D Developer Portfolio",
    description:
      "A cinematic portfolio site with a space-inspired landing page built using React, Three.js, and layered visual effects. It highlights my interest in interactive design, motion, and creating web experiences that feel immersive and memorable.",
    tags: ["React", "Three.js", "Tailwind"],
  },
  {
    number: "03",
    title: "C++ Blackjack Game",
    description:
      "A self-driven C++ project focused on object-oriented programming, game logic, and building a playable terminal-based Blackjack game. The project helped me strengthen problem solving, structure, and core programming fundamentals.",
    tags: ["C++", "OOP", "CLI"],
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 md:px-16 lg:px-24"
    >
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-[28rem] bg-[linear-gradient(90deg,rgba(59,130,246,0.10),transparent)] blur-3xl" />
        <div className="absolute right-0 top-0 h-full w-[22rem] bg-[linear-gradient(270deg,rgba(59,130,246,0.06),transparent)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-blue-300/80 sm:text-sm">
          Log // Projects
        </p>

        <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
          Selected Projects
        </h2>

        <p className="mb-12 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          A few projects that reflect my growth in front-end development,
          interactive design, and programming fundamentals.
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group flex min-h-[390px] flex-col rounded-[28px] border border-white/10 bg-black/40 p-7 transition duration-300 hover:border-blue-400/70 hover:shadow-[0_0_24px_rgba(59,130,246,0.18)]"
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="text-6xl font-black leading-none text-white/10">
                  {project.number}
                </span>

                <span className="rounded-full border border-white/10 px-4 py-1 text-[11px] uppercase tracking-[0.25em] text-blue-100/80">
                  Project
                </span>
              </div>

              <h3 className="mb-4 max-w-[12ch] text-3xl font-bold leading-tight text-white">
                {project.title}
              </h3>

              <p className="mb-6 text-base leading-8 text-slate-300">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;