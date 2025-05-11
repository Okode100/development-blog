import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";

export default function Post({ posts }) {
  // Separate featured and non-featured posts
  const featuredPosts = posts?.filter(post => post.featured) || [];
  const regularPosts = posts?.filter(post => !post.featured) || [];

  return (
    <>
      {posts && (
        <Container>
          {/* Featured Posts Section */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-8 text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                Featured Stories
              </h2>
              <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
                {featuredPosts.slice(0, 2).map(post => (
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

          {/* Recent Posts Grid */}
          <div className="mt-8">
            <h2 className="mb-8 text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
              Latest Stories
            </h2>
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
              {regularPosts.slice(0, 6).map(post => (
                <PostList 
                  key={post._id} 
                  post={post} 
                  aspect="square"
                />
              ))}
            </div>
          </div>

          {/* More Posts Link */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/articles"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
              <span>View all Posts</span>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
}
