import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export default function About({ authors, settings }) {
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        About Us
      </h1>
      <div className="text-center">
        <p className="text-lg">Meet our team of writers and content creators</p>
      </div>

      <div className="mb-16 mt-6 grid grid-cols-1 gap-5 md:mb-32 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {authors.map(author => {
          const imageProps = urlForImage(author?.image) || null;
          return (
            <div
              key={author._id}
              className="flex flex-col items-center">
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-md bg-slate-50">
                <Link href={`/author/${author?.slug?.current}`}>
                  {imageProps && (
                    <Image
                      src={imageProps?.src}
                      alt={author?.name || " "}
                      fill
                      sizes="(max-width: 320px) 100vw, 320px"
                      className="object-cover transition-transform hover:scale-105"
                    />
                  )}
                </Link>
              </div>
              <h2 className="text-brand-primary text-xl font-semibold dark:text-white">
                <Link href={`/author/${author?.slug?.current}`}>{author.name}</Link>
              </h2>
              {author.bio && (
                <div className="prose mt-3 text-center text-gray-600 dark:text-gray-400">
                  <PortableText value={author.bio} />
                </div>
              )}
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {author.postCount} {author.postCount === 1 ? 'Article' : 'Articles'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <p>
          We provide real-time connectivity to enable software
          providers and financial institutions to build integrated
          products for their small business customers.
        </p>
        <p>
          Our API infrastructure is leveraged by clients ranging from
          lenders to corporate card providers and business forecasting
          tools, with use cases including automatic reconciliation,
          business dashboarding, and loan decisioning.
        </p>
        <p>
          <Link href="/contact">Get in touch</Link>
        </p>
      </div>
    </Container>
  );
}
