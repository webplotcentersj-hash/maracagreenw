import { Header } from "@/components/header";
import { Brand3DWrapper } from "@/components/sections/brand-3d-wrapper";
import { HeroSection } from "@/components/sections/hero-section";
import { ValuePropositionSection } from "@/components/sections/value-proposition-section";
import { ServicesSection } from "@/components/sections/services-section";
import { DatacenterSection } from "@/components/sections/datacenter-section";
import { EnergySecuritySection } from "@/components/sections/energy-security-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ProjectsVideoSection } from "@/components/sections/projects-video-section";
import { AboutSection } from "@/components/sections/about-section";
import { CoverageSection } from "@/components/sections/coverage-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#061014] text-white selection:bg-emerald-500 selection:text-white overflow-hidden">
      <Header />
      <Brand3DWrapper />
      <HeroSection />
      <ValuePropositionSection />
      <ServicesSection />
      <DatacenterSection />
      <EnergySecuritySection />
      <IndustriesSection />
      <ProjectsSection />
      <ProjectsVideoSection />
      <AboutSection />
      <CoverageSection />
      <BlogSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
