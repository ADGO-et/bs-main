import HomeCard from "@/components/startup-comp/Home-card";
import FeaturedStartups from "@/components/startup-comp/FeaturedStartups";
// import ProcessSteps from "@/components/landing-comp/process-steps";
import HiwotFundCTA from "@/components/landing-comp/hiwot-fund-cta";
// import AboutUsSection from "@/components/landing-comp/aboutus-section";
import CareersSection from "@/components/landing-comp/careers-section";
import { FeedbackSection } from "@/components/landing-comp/feedback-section";
import FundingPromo from "@/components/landing-comp/funding-promo";
import TestimonialSection from "@/components/landing-comp/testimonial-section";
import { OtherFeatures } from "@/components/landing-comp/other-features";
import { BlogSection } from "@/components/landing-comp/BlogSection";
// import AboutUsSection from "@/components/landing-comp/aboutus-section";

export default function Home() {
  return (
    <div className="">
      <HomeCard />
      <FeaturedStartups />
      {/* <ProcessSteps /> */}
      <OtherFeatures />
      <HiwotFundCTA />
      {/* <AboutUsSection /> */}
      <CareersSection />
      <BlogSection />
      <FeedbackSection />
      <FundingPromo />
      <TestimonialSection />
    </div>
  );
}
