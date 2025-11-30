import HeroSectionOne from "@/components/hero-section-demo-1";

import MedicalFeatureSection from './_comonent/hero/page';
import HowItWorksSection from "./_comonent/howwork";
import AIHealthAssistantSection from './_comonent/hero/AIHealthAssistantSection';
import TestimonialsSection from "./_comonent/hero/tastimonial";
import DoctorsHospitalsSection from "./_comonent/doctor";
import BlogTipsSection from "./_comonent/blog";
import CTASection from "./_comonent/call";
import Footer from "./_comonent/hero/fottar";





export default function Home() {
  return (
    <div>


    
      <HeroSectionOne></HeroSectionOne>
   
      <MedicalFeatureSection></MedicalFeatureSection>

      <HowItWorksSection></HowItWorksSection>
      <AIHealthAssistantSection></AIHealthAssistantSection>
      <TestimonialsSection></TestimonialsSection>
      <DoctorsHospitalsSection></DoctorsHospitalsSection>
      <BlogTipsSection></BlogTipsSection>
      <CTASection></CTASection>
      <Footer></Footer>
  
      
    </div>
  );
}
