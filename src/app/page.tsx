import { FeaturesGrid } from '@/src/app/_components/FeaturesGrid/FeaturesGrid';
import { Faq } from '@/src/app/_components/Faq/Faq';
import { Header } from './_components/Header/Header';
import { StatsBanner } from './_components/StatsBanner/StatsBanner';
import { HeroHeader } from './_components/HeroHeader/HeroHeader';
import { Stack } from '@mantine/core';
import { Demo } from './_components/Demo/Demo';
import { Pricing } from './_components/Pricing/Pricing';
import { Footer } from './_components/Footer/Footer';

export default function HomePage() {
  return (
    <Stack gap="xl">
      <Header />
      <StatsBanner />
      <HeroHeader />
      <FeaturesGrid />
      <Demo />
      <Pricing />
      <Faq />
      <Footer />
    </Stack>
  );
}
