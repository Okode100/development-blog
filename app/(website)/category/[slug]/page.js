import Container from "@/components/container";
import PostList from "@/components/postlist";
import { getPostsByCategory, getAllCategories } from "@/lib/sanity/client";

export async function generateMetadata({ params }) {
  const posts = await getPostsByCategory(params.slug);
  const category = posts[0]?.categories?.find(cat => cat.slug.current === params.slug);
  
  return {
    title: `${category?.title || "Category"} Posts`,
    description: `All posts in ${category?.title || "category"}`,
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map(({ category }) => ({
    slug: category
  }));
}

export default async function CategoryPage({ params }) {
  const posts = await getPostsByCategory(params.slug);
  const category = posts[0]?.categories?.find(cat => cat.slug.current === params.slug);
  
  return (
    <>
      <Container>
        <div className="mx-auto max-w-screen-lg">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl mb-8">
            Posts in {category?.title || "Category"}
          </h1>

          <div className="prose prose-neutral dark:prose-dark mb-8">
            <p className="text-neutral-600 dark:text-neutral-400">
              Showing all posts categorized under {category?.title || "this category"}
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10">
            {posts.map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                minimal={false}
              />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                No posts found in this category
              </p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}