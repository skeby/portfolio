import Contact from "@/components/layout/contact";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Projects from "@/components/layout/projects";

export default function Home() {
  return (
    <main>
      {/* <PreLoader /> */}
      <Header />
      <Hero />
      <Projects />
      {/* <Testimonials />
      <About /> */}
      <Contact />
      <Footer />
    </main>
  );
}
