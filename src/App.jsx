import Hero from "./components/hero/Hero";
import Profile from "./components/sections/Profile";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Footer from "./components/sections/Footer";

function App() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Profile />
      <Projects />
      <Experience />
      <Footer />
    </main>
  );
}

export default App;