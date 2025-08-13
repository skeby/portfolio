import About from "@/components/layout/about";
import Contact from "@/components/layout/contact";
import Footer from "@/components/layout/footer";
import Hero from "@/components/layout/hero";
import Projects from "@/components/layout/projects";
import Reviews from "@/components/layout/reviews";

export default function Home() {
  return (
    <main className="font-sans flex flex-col gap-24 lg:gap-28">
      <Hero />
      <Projects />
      <Reviews />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
