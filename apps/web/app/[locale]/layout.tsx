import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale ?? 'it';
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch {
    notFound();
  }
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
