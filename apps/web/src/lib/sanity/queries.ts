import { sanityClient } from './client';

export async function getProjects(page = 1, limit = 6, lang = 'it') {
  const start = (page - 1) * limit;

  const end = start + limit;

  const query = `
  {
    "items": *[_type == "project"]
      | order(publishedAt desc)
      [${start}...${end}]{
        _id,
        "title": title[$lang],
        "description": pt::text(description[$lang]),
        "slug": slug.current,
        "imageUrl": image.asset->url,
        imageAlt,
        publishedAt
      },
    "total": count(*[_type == "project"])
  }
  `;

  return await sanityClient.fetch(query, {
    lang,
  });
}

export async function getSingleProject(slug: string, lang = 'it') {
  const query = `
    *[_type == "project" && slug.current == $slug][0]{
      _id,
      "title": title[$lang],
      "description": description[$lang],
      createdAt,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      imageAlt,
      publishedAt
    }
  `;

  return await sanityClient.fetch(query, {
    slug,
    lang,
  });
}

export async function getLastProject(lang = 'it') {
  const query = `
    *[_type == "project"]
    | order(publishedAt desc)[0]{
      _id,
      "title": title[$lang],
      "description": pt::text(description[$lang]),
      "slug": slug.current,
      "imageUrl": image.asset->url,
      imageAlt,
      publishedAt
    }
  `;

  return await sanityClient.fetch(query, { lang });
}
