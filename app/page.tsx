import HeroSection from "@/components/sections/HeroSection";
import ProjectCard from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative bg-black">
      <HeroSection />
      {/* Project Grid Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-white text-5xl font-black mb-12 tracking-tighter">
            FEATURED <span className="text-electric-blue">WORKS</span>
          </h2>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-11">
            <ProjectCard
              tag="Web Design"
              title="NEON PULSE"
              image="/neonpulse-fire.jpg"
              description="A high-performance e-commerce experience for premium audio gear."
            />
            <ProjectCard
              tag="3D Interaction"
              title="ETHERIAL"
              image="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1964&auto=format&fit=crop"
              description="Exploring the boundaries of fluid typography and motion."
            />
            <ProjectCard
              tag="Branding"
              title="VIBE CHECK"
              image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
              description="Visual identity system for a modern creative agency."
            />
          </div>
        </Reveal>
      </section>
      <AboutSection />
      <ContactSection /> {/*The final piece*/}
    </main>
  );
}
