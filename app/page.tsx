import { HeroSection } from '@/components/HeroSection/HeroSection';
import { Header } from '@/components/Header/Header';
import { FeaturesGrid } from '@/components/FeaturesGrid/FeaturesGrid';
import { Faq } from '@/components/Faq/Faq';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesGrid />
      <Faq />
    </>
  );
}
