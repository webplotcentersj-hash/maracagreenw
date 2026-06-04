import { Header } from "@/components/header";
import { Brand3DWrapper } from "@/components/sections/brand-3d-wrapper";
import { HeroSection } from "@/components/sections/hero-section";
import { ValuePropositionSection } from "@/components/sections/value-proposition-section";
import { ServicesSection } from "@/components/sections/services-section";
import { DatacenterSection } from "@/components/sections/datacenter-section";
import { EnergySecuritySection } from "@/components/sections/energy-security-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ElectricityEnergySection } from "@/components/sections/electricity-energy-section";
import { EnergyGeneralProjectsSection } from "@/components/sections/energy-general-projects-section";
import { RefrigerationHvacSection } from "@/components/sections/refrigeration-hvac-section";
import { FleetSection } from "@/components/sections/fleet-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ProjectsVideoSection } from "@/components/sections/projects-video-section";
import { AboutSection } from "@/components/sections/about-section";
import { PartnersClientsSection } from "@/components/sections/partners-clients-section";
import { CommunitySection } from "@/components/sections/community-section";
import { CoverageSection } from "@/components/sections/coverage-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#061014] text-white selection:bg-brand-primary selection:text-white overflow-hidden">
      <Header />
      <Brand3DWrapper />
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal>
        <ValuePropositionSection />
      </ScrollReveal>
      <ScrollReveal>
        <ServicesSection />
      </ScrollReveal>
      <ScrollReveal>
        <DatacenterSection />
      </ScrollReveal>
      <ScrollReveal>
        <EnergySecuritySection />
      </ScrollReveal>
      <ScrollReveal>
        <IndustriesSection />
      </ScrollReveal>
      <ScrollReveal>
        <ElectricityEnergySection />
      </ScrollReveal>
      <ScrollReveal>
        <EnergyGeneralProjectsSection />
      </ScrollReveal>
      <ScrollReveal>
        <RefrigerationHvacSection />
      </ScrollReveal>
      <ScrollReveal>
        <FleetSection />
      </ScrollReveal>
      <ScrollReveal>
        <ProjectsVideoSection />
      </ScrollReveal>
      <ScrollReveal>
        <ProjectsSection />
      </ScrollReveal>
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal>
        <PartnersClientsSection />
      </ScrollReveal>
      <ScrollReveal>
        <CommunitySection />
      </ScrollReveal>
      <ScrollReveal>
        <CoverageSection />
      </ScrollReveal>
      <ScrollReveal>
        <BlogSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
      <ScrollReveal>
        <FooterSection />
      </ScrollReveal>
    </main>
  );
}
