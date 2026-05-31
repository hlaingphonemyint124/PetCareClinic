import Navbar from '../../components/layout/Navbar'
import Hero from '../../components/public/Hero'
import {
  ServicesSection, VetsSection, FacilitiesSection,
  TestimonialsSection, BlogSection, FAQSection,
  LocationSection, CTASection, Footer,
} from '../../components/public/page-sections'

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#080f1c]">
      <Navbar />
      <Hero />
      <ServicesSection />
      <VetsSection />
      <FacilitiesSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <LocationSection />
      <CTASection />
      <Footer />
    </div>
  )
}
