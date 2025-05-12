import { Suspense } from "react";
import Container from "@/components/container";
import Articles from "./articles";
import Loading from "@/components/loading";
import ErrorBoundary from "@/components/error-boundary";

export const metadata = {
  title: 'Articles | Stablo',
  description: 'Browse all articles sorted by category',
  openGraph: {
    title: 'Articles | Stablo',
    description: 'Browse all articles sorted by category',
    type: 'website',
  },
};

export const dynamic = "force-dynamic";

export const runtime = "edge";

export default async function ArchivePage({ searchParams }) {
  return (
    <ErrorBoundary>
      <Container className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Articles
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Browse articles by category or view all posts
          </p>
        </div>
        <Suspense
          key={searchParams.page || "1"}
          fallback={<Loading />}>
          <Articles searchParams={searchParams} />
        </Suspense>
      </Container>
    </ErrorBoundary>
  );
}
