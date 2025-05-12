import PostList from "@/components/postlist";
import CategoryNav from "@/components/blog/CategoryNav";
import Pagination from "@/components/blog/pagination";
import Container from "@/components/container";
import { getPaginatedPosts, getTopCategories } from "@/lib/sanity/client";

export default async function Post({ searchParams }) {
  const pageIndex = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "6");

  try {
    const { posts = [], total = 0 } = await getPaginatedPosts({
      limit,
      pageIndex: (pageIndex - 1) * limit
    });
    const topCategories = await getTopCategories();

    if (!posts || posts.length === 0) {
      return (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500 dark:text-gray-400">
            No posts found. Check back later!
          </span>
        </div>
      );
    }

    const featuredPosts = posts.filter(post => post.featured);
    const regularPosts = posts.filter(post => !post.featured);
    
    const isFirstPage = pageIndex === 1;
    const isLastPage = (pageIndex - 1) * limit + posts.length >= total;

    return (
      <Container>
        <div className="mx-auto max-w-screen-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl mb-8">
            Articles
          </h1>

          <CategoryNav categories={topCategories} />

          {pageIndex === 1 && featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-8 text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                Featured Articles
              </h2>
              <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
                {featuredPosts.map(post => (
                  <PostList
                    key={post._id}
                    post={post}
                    aspect="landscape"
                    preloadImage={true}
                    fontSize="large"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {regularPosts.map(post => (
              <PostList 
                key={post._id} 
                post={post} 
                aspect="square"
              />
            ))}
          </div>

          <Pagination
            pageIndex={pageIndex}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Error loading articles:", error);
    return (
      <div className="flex h-40 items-center justify-center">
        <span className="text-lg text-gray-500 dark:text-gray-400">
          Something went wrong. Please try again later.
        </span>
      </div>
    );
  }
}
