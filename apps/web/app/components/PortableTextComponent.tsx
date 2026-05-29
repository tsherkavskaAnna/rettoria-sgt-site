import type { PortableTextComponents } from '@portabletext/react';

const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;

      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="underline text-amber-700"
        >
          {children}
        </a>
      );
    },
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,

    number: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,

    number: ({ children }) => <li className="mb-2">{children}</li>,
  },

  block: {
    normal: ({ children }) => <p className="text-base leading-7 mb-4">{children}</p>,

    h1: ({ children }) => <h1 className="text-3xl font-bold mb-6">{children}</h1>,

    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-4 mt-8">{children}</h2>,
  },
};

export default portableTextComponents;
