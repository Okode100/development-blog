'use client';

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cx } from "@/utils/all";
import { useEffect, useState, useTransition } from "react";

export default function CategoryNav({ categories, activeCategory = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset navigation state when pathname or search params change
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  const handleCategoryClick = (e, href) => {
    e.preventDefault();
    if (isNavigating || isPending) return;

    setIsNavigating(true);
    startTransition(() => {
      // Reset page parameter when changing categories
      const params = new URLSearchParams(searchParams);
      params.delete('page');
      const query = params.toString();
      const targetUrl = query ? `${href}?${query}` : href;
      router.push(targetUrl);
    });
  };

  // Don't render anything until after hydration
  if (!isMounted) {
    return null;
  }

  if (!categories) {
    return (
      <div className="mx-auto mb-8 w-full overflow-x-auto">
        <div className="flex animate-pulse flex-nowrap items-center gap-3 py-3">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="h-8 w-24 rounded-full bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-8 w-full overflow-x-auto">
      <div className="flex flex-nowrap items-center gap-3 py-3">
        <Link
          href="/articles"
          onClick={(e) => handleCategoryClick(e, '/articles')}
          className={cx(
            "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
            !activeCategory
              ? "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700",
            (isNavigating || isPending) && "pointer-events-none opacity-70"
          )}>
          {isNavigating && pathname === '/articles' ? (
            <span className="block h-4 w-16 animate-pulse rounded bg-current opacity-50" />
          ) : (
            "All Posts"
          )}
        </Link>
        {categories?.map((category, index) => (
          <Link
            key={category._id || index}
            href={`/category/${category.slug.current}`}
            onClick={(e) => handleCategoryClick(e, `/category/${category.slug.current}`)}
            className={cx(
              "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.slug.current
                ? "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700",
              (isNavigating || isPending) && "pointer-events-none opacity-70"
            )}>
            {isNavigating && pathname === `/category/${category.slug.current}` ? (
              <span className="block h-4 w-16 animate-pulse rounded bg-current opacity-50" />
            ) : (
              <>
                {category.title}
                {category.count && (
                  <span className="ml-1 text-xs">({category.count})</span>
                )}
              </>
            )}
          </Link>
        ))}
      </div>
      {(isNavigating || isPending) && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-black bg-opacity-10 backdrop-blur-[1px] dark:bg-opacity-20" />
      )}
    </div>
  );
}