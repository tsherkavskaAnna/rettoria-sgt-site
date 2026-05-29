'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PiArrowCircleRight } from 'react-icons/pi';

type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

type Props = {
  lang: string;
  data: Project;
  truncate?: number;
};

export default function LastArticle({ lang, data, truncate = 350 }: Props) {
  const t = useTranslations('hero');
  return (
    <div className="container mx-auto h-full grid grid-cols-1 lg:grid-cols-2 px-6  items-center justify-items-center">
      <div>
        {data.imageUrl && (
          <Image
            src={data.imageUrl}
            alt={data.imageAlt ?? data.title}
            width={450}
            height={500}
            className=" object-contain"
          />
        )}
      </div>
      <div>
        <h2 className="text-xl lg:text-2xl article-text font-semibold my-4 text-start hover:text-amber-600 mb-4">
          {data.title}
        </h2>
        <p className="text-gray-600 mb-6">{data.description.slice(0, truncate)}...</p>
        <Link
          href={`/${lang}/projects/${data.slug ?? ''}`}
          className="px-6 py-3 btn-primary text-white rounded-xl mt-4 flex items-center gap-4 justify-between w-fit mx-auto md:mx-0"
        >
          {t('button')}
          <p className="text-xl">
            <PiArrowCircleRight />
          </p>
        </Link>
      </div>
    </div>
  );
}
