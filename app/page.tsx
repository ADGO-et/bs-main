import AboutUsSection from "@/components/landing-comp/aboutus-section";
import { BlogSection } from "@/components/landing-comp/blog-section";
import CareersSection from "@/components/landing-comp/careers-section";
import { FeedbackSection } from "@/components/landing-comp/feedback-section";
import FundingCategories from "@/components/landing-comp/funding-categories";
import FundingPromo from "@/components/landing-comp/funding-promo";
import HeroSection from "@/components/landing-comp/hero-section";
import HiwotFundCTA from "@/components/landing-comp/hiwot-fund-cta";
// import Newsletter from "@/components/landing-comp/newsletter";
import ProcessSteps from "@/components/landing-comp/process-steps";
import TestimonialSection from "@/components/landing-comp/testimonial-section";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <FundingCategories />
      <AboutUsSection />
      <ProcessSteps />
      <HiwotFundCTA />
      <CareersSection />
      <BlogSection />
      <FeedbackSection />
      <FundingPromo />
      <TestimonialSection />
      {/* <Newsletter /> */}
    </div>
  );
}
