import { getProjects } from '@/lib/sanity/queries';
import ProjectList from '../../components/ProjectsList';
import Pagination from '../../components/Pagination';

export const revalidate = 60;

export default async function Projects({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const lang = resolvedParams.locale ?? 'it';
  const page = Number(resolvedSearchParams?.page ?? 1);

  const dataProjects = await getProjects(page, 6, lang);
  const limit = 6;
  const totalPages = Math.ceil(dataProjects.total / limit);

  if (!dataProjects) {
    return (
      <p className="flex justify-center pb-10 text-xl font-bold pt-48 content-center">
        Errore nel caricamento dei progetti
      </p>
    );
  }

  return (
    <div className="bg-background">
      <div className="container md:w-[85%] mx-auto min-h-screen p-6">
        <ProjectList projects={dataProjects.items} lang={lang} />
      </div>
      <Pagination currentPage={page} totalPages={totalPages} lang={lang} />
    </div>
  );
}
