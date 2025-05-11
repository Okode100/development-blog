import { getAuthorPostsBySlug, getAllAuthorsSlugs } from "@/lib/sanity/client";
import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import PostList from "@/components/postlist";

export async function generateStaticParams() {
  const authors = await getAllAuthorsSlugs();
  return authors;
}

export async function generateMetadata({ params }) {
  const author = await getAuthorPostsBySlug(params.slug);
  return {
    title: `Posts by ${author.name}`,
    description: `All posts written by ${author.name}`
  };
}

export default async function AuthorPage({ params }) {
  const author = await getAuthorPostsBySlug(params.slug);
  const imageProps = author?.image ? urlForImage(author.image) : null;

  return (
    <Container>
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-16 mt-8 flex flex-col items-center justify-center text-center">
          {imageProps && (
            <div className="relative mb-6 h-32 w-32">
              <Image
                src={imageProps.src}
                alt={author.name}
                className="rounded-full object-cover"
                fill
                sizes="(max-width: 320px) 100vw, 320px"
                priority
              />
            </div>
          )}
          <h1 className="text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            {author.name}
          </h1>
          <div className="mx-auto mt-6 max-w-xl text-gray-600 dark:text-gray-400">
            {author.bio && <PortableText value={author.bio} />}
          </div>
        </div>

        {author.posts && author.posts.length > 0 ? (
          <>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight dark:text-white">
              Latest Posts by {author.name}
            </h2>
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
              {author.posts.map(post => (
                <PostList key={post._id} post={post} aspect="landscape" />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No posts found by this author
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}