import { groq } from "next-sanity";

// Get all posts with smart sorting
export const postquery = groq`
*[_type == "post" && defined(author) && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name,
    bio
  },
  categories[]->,
  "readingTime": round(length(pt::text(body)) / 5 / 180),
  "isPinned": featured,
  "isNew": dateTime(_createdAt) > dateTime(now()) - 60*60*24*7
}
`;

// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post" && defined(author) && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->,
  "readingTime": round(length(pt::text(body)) / 5 / 180),
  "isPinned": featured,
  "isNew": dateTime(_createdAt) > dateTime(now()) - 60*60*24*7
}
`;

// Get paginated posts with smart sorting
export const paginatedquery = groq`
{
  "posts": *[_type == "post" && defined(author) && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
    _id,
    _createdAt,
    publishedAt,
    mainImage {
      ...,
      "blurDataURL":asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
    },
    featured,
    excerpt,
    slug,
    title,
    author->,
    categories[]->,
    "readingTime": round(length(pt::text(body)) / 5 / 180),
    "isPinned": featured,
    "isNew": dateTime(_createdAt) > dateTime(now()) - 60*60*24*7
  },
  "total": count(*[_type == "post" && defined(author) && !(_id in path("drafts.**"))])
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

// Single Post
export const singlequery = groq`
*[_type == "post" && defined(author) && slug.current == $slug][0] {
  ...,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author->{
    _id,
    name,
    image,
    slug,
    bio
  },
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current) && defined(author)][].slug.current
`;

export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;

export const authorsquery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "author" && slug.current == $slug][0]{
  _id,
  name,
  image,
  bio,
  "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    _createdAt,
    excerpt,
    categories[]->,
    "readingTime": round(length(pt::text(body)) / 5 / 180)
  }
}`;

// Get Posts by Category
export const postsbycatquery = groq`
*[_type == "post" && defined(author) && $slug in categories[]->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get top 5 categories
export const catquery = groq`*[_type == "category"] {
  ...,
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = groq`*[_type == "post" && defined(author) && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
   title,
   slug
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author" && !(_id in path("drafts.**"))] {
  _id,
  name,
  image,
  slug,
  bio,
  "postCount": count(*[_type == "post" && references(^._id)])
}`;

// get everything from sanity
// to test connection
export const getAll = groq`*[]`;
