import { Stack } from '@mantine/core';
import { Faq } from '@/app/_components/Faq/Faq';
import { FeaturesGrid } from '@/app/_components/FeaturesGrid/FeaturesGrid';
import { Demo } from './_components/Demo/Demo';
import { Footer } from './_components/Footer/Footer';
import { Header } from './_components/Header/Header';
import { HeroHeader } from './_components/HeroHeader/HeroHeader';
import { Pricing } from './_components/Pricing/Pricing';

const Page = () => {
  return (
    <Stack gap={100}>
      <Header />
      <HeroHeader />
      <FeaturesGrid />
      <Demo />
      <Pricing />
      <Faq />
      <Footer />
    </Stack>
  );
};

export default Page;
