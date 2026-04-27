import Hero from "./components/hero/Hero";

function App() {
  return (
    <main className="bg-black text-white">
      <Hero />

      <section className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-300">
            Mission Logs
          </p>
          <h2 className="mb-6 text-4xl font-bold">Projects</h2>
          <p className="max-w-2xl text-slate-400">
            Project sections will go here after the hero scene is finished.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;