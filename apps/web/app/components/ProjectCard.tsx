'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';
import { BsArrowUpRightCircle } from 'react-icons/bs';

export type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

type Props = {
  project: Project;
  lang: string;
  truncate?: number;
};

export default function ProjectCard({ project, lang, truncate = 150 }: Props) {
  const t = useTranslations('hero');
  const format = useFormatter();
  const dateTime = new Date(`${project.publishedAt}`);

  return (
    <li className="flex flex-col rounded-3xl bg-white shadow-xl hover:shadow-2xl px-2 pt-2 pb-5 hover:scale-105 transition duration-500">
      <Link href={`/${lang}/projects/${project.slug ?? ''}`}>
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.imageAlt ?? project.title}
            width={500}
            height={500}
            className="object-cover w-full rounded-t-3xl md:h-64"
          />
        )}
      </Link>
      <p className="text-xs uppercase -tracking-normal text-gray-400 px-5 py-4 text-start">
        {format.dateTime(dateTime, { dateStyle: 'long' })}
      </p>
      <h2 className="md:text-xl article-text px-2 font-semibold mb-2 text-center hover:text-amber-600 transition">
        {project.title}
      </h2>
      <p className="px-5 pb-3 text-gray-600 leading-7 text-base line-clamp-4">
        {project.description.slice(0, truncate)}...
      </p>
      <Link
        href={`/${lang}/projects/${project.slug ?? ''}`}
        className="px-5 text-gray-400 lg:border-none border-2 border-gray-300 py-2 rounded-lg mt-2 mx-auto font-semibold bg-transparent flex flex-1 items-center gap-4 justify-between w-fit transition hover:text-amber-600"
      >
        {t('button')}
        <BsArrowUpRightCircle />
      </Link>
    </li>
  );
}
