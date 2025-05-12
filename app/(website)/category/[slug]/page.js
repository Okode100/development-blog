import { Suspense } from "react";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import CategoryNav from "@/components/blog/CategoryNav";
import ErrorBoundary from "@/components/error-boundary";
import { getPostsByCategory, getAllCategories, getTopCategories } from "@/lib/sanity/client";

export async function generateMetadata({ params }) {
  try {
    const posts = await getPostsByCategory(params.slug);
    const category = posts[0]?.categories?.find(cat => cat.slug.current === params.slug);
    
    return {
      title: `${category?.title || "Category"} | Stablo`,
      description: category?.description || `All posts in ${category?.title || "this category"}`
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Category | Stablo",
      description: "View posts by category"
    };
  }
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <Container>
          <div className="mx-auto max-w-screen-xl animate-pulse">
            <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-gray-700 mb-8" />
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-8" />
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square rounded-md bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      }>
        <CategoryContent params={params} />
      </Suspense>
    </ErrorBoundary>
  );
}

async function CategoryContent({ params }) {
  try {
    const [posts, topCategories] = await Promise.all([
      getPostsByCategory(params.slug),
      getTopCategories()
    ]);

    const category = posts[0]?.categories?.find(cat => cat.slug.current === params.slug);
    
    return (
      <Container>
        <div className="mx-auto max-w-screen-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl mb-8">
            Posts in {category?.title || "Category"}
          </h1>

          <CategoryNav categories={topCategories} activeCategory={params.slug} />

          <div className="prose prose-neutral dark:prose-dark mb-8">
            {category?.description && (
              <p className="text-neutral-600 dark:text-neutral-400">
                {category.description}
              </p>
            )}
          </div>

          {posts && posts.length > 0 ? (
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
              {posts.map(post => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect="square"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                No posts found in this category
              </p>
            </div>
          )}
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Error in category page:", error);
    return (
      <Container>
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500 dark:text-gray-400">
            Something went wrong. Please try again later.
          </span>
        </div>
      </Container>
    );
  }
}