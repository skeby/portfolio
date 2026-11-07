import Contact from "@/components/layout/contact";
import Footer from "@/components/layout/footer";
import GitHubActivity from "@/components/layout/github-activity";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Projects from "@/components/layout/projects";
import Marquee from "@/components/ui/marquee";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <Marquee />
      <Projects />
      <GitHubActivity />
      <Contact />
      <Footer />
    </main>
  );
}
