//import { sanityClient } from '@/lib/sanity/client';

import Hero from '../components/Hero';
import LastArticleSection from '../components/LastArticleSection';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  /* const settings = await sanityClient.fetch(
    `*[_type == "siteSettings"][0]{ title, defaultLocale }`,
  ); */
  const resolvedParams = await params;
  const lang = resolvedParams.locale ?? 'it';
  return (
    <main>
      {/* <h1>{settings?.title ?? 'Rettoria SGT'}</h1> */}
      <Hero />
      <LastArticleSection lang={lang} />
    </main>
  );
}
