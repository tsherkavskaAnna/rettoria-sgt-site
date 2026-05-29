'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  return (
    <div className="relative h-100 md:h-125 lg:h-180 w-full">
      <Image src="/hero.png" alt="Hero" fill priority className="object-cover object-top" />
      <div className="absolute inset-0 bg-white/20 z-10">
        <div className="container mx-auto h-full grid place-items-center lg:place-items-start lg:pb-14 pb-6 px-6 lg:px-0:">
          <div className="text-white content-end h-full font-heading font-semibold tracking-wide md:text-xl lg:text-2xl 2xl:text-3xl">
            <div className="flex justify-center mb-4">
              <Image src="/quote.png" alt="Quote" width={30} height={30} className="" />
            </div>
            <p className="">{t('title')}</p>
            <div className="flex justify-center mt-3">
              <span className="md:text-lg lg:text-xl 2xl:text-2xl">{t('subtitle')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
