import { getSingleProject } from '@/lib/sanity/queries';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import portableTextComponents from '../../../components/PortableTextComponent';
import { getFormatter, getTranslations } from 'next-intl/server';

export const revalidate = 60;

export default async function SingleArticle({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedParams = await params;

  const lang = resolvedParams.locale ?? 'it';
  const slug = resolvedParams.slug;

  const t = await getTranslations({
    locale: lang,
    namespace: 'projects',
  });

  const data = await getSingleProject(slug, lang);

  const format = await getFormatter({ locale: lang });

  if (!data) {
    return (
      <p className="flex justify-center pb-10 text-xl font-bold pt-48 content-center">
        Progetto non trovato
      </p>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto min-h-screen p-6 md:pt-40 pt-32 pb-10 ">
        <div className="flex justify-between items-center gap-2 mb-5">
          <Link href={`/${lang}/projects/`} className="flex items-center">
            <BsArrowLeftCircle
              size={24}
              className="text-stone-500 flex-row flex-nowrapitems-center"
            />
            <span className="text-stone-500 ml-2 block">{t('back')}</span>
          </Link>
          <p className="text-stone-500 text-md">
            {format.dateTime(new Date(data.publishedAt), {
              dateStyle: 'long',
            })}
          </p>
        </div>
        <h1 className="text-xl md:text-2xl xl:text-3xl font-bold my-5 text-center article-text">
          {data.title}
        </h1>
        {data.imageUrl && (
          <Image
            src={data.imageUrl}
            alt={data.imageAlt ?? data.title}
            width={300}
            height={300}
            className=" mx-auto mb-5 rounded-2xl"
          />
        )}
        <div className="px-5 pb-6 text-gray-600 leading-7 space-y-3">
          <PortableText value={data.description} components={portableTextComponents} />
        </div>
      </div>
    </div>
  );
}
