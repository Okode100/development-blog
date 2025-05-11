import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";
import { getPaginatedPosts } from "@/lib/sanity/client";

export default async function Post({ searchParams }) {
  const page = searchParams.page;
  const pageIndex = parseInt(page, 10) || 1;
  const POSTS_PER_PAGE = 9; // Increased from 6 to show more posts per page

  const params = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE
  };

  const posts = await getPaginatedPosts(params);
  const isFirstPage = pageIndex < 2;
  const isLastPage = posts.length < POSTS_PER_PAGE;

  // Separate featured posts on the first page
  const featuredPosts = pageIndex === 1 ? posts.filter(post => post.featured) : [];
  const regularPosts = pageIndex === 1 ? posts.filter(post => !post.featured) : posts;

  return (
    <>
      {posts && posts?.length === 0 ? (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500 dark:text-gray-400">
            End of the result!
          </span>
        </div>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}
