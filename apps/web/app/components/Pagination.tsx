import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
  lang: string;
};

export default function Pagination({ currentPage, totalPages, lang }: Props) {
  return (
    <div className="flex justify-center items-center gap-3 mt-10 flex-wrap pb-10">
      {/* PREV */}
      {currentPage > 1 && (
        <Link
          href={`/${lang}/projects?page=${currentPage - 1}`}
          className="px-4 py-2 border text-stone-400 rounded-xl"
        >
          Prev
        </Link>
      )}

      {/* NUMBERS */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <Link
            key={page}
            href={`/${lang}/projects?page=${page}`}
            className={`
              px-4 py-2 rounded-xl border text-stone-400
              ${currentPage === page ? 'bg-stone-400 text-white' : 'bg-white'}
            `}
          >
            {page}
          </Link>
        );
      })}

      {/* NEXT */}
      {currentPage < totalPages && (
        <Link
          href={`/${lang}/projects?page=${currentPage + 1}`}
          className="px-4 py-2 border text-stone-400 rounded-xl"
        >
          Next
        </Link>
      )}
    </div>
  );
}
