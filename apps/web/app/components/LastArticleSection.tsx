import { getLastProject } from '@/lib/sanity/queries';
import LastArticle from './LastArticle';

type Props = {
  lang: string;
  truncate?: number;
};

export default async function LastArticleSection({ lang, truncate }: Props) {
  const data = await getLastProject(lang);

  return (
    <div className="bg-background w-full py-10">
      <LastArticle data={data} truncate={truncate} lang={lang} />
    </div>
  );
}
