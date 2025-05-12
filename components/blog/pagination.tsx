"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useCallback, useTransition } from "react";

export default function Pagination({
  pageIndex,
  isFirstPage,
  isLastPage
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleNavigation = useCallback(async (newPage: number) => {
    if (isNavigating || isPending) return;
    
    try {
      setIsNavigating(true);
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      const query = params.toString();

      startTransition(() => {
        router.push(`/articles?${query}`);
      });
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      // Reset after a short delay to prevent rapid clicks
      setTimeout(() => setIsNavigating(false), 500);
    }
  }, [router, searchParams, isNavigating, isPending]);

  return (
    <div className="mt-10 flex items-center justify-center">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination">
        <button
          onClick={() => handleNavigation(pageIndex - 1)}
          disabled={isFirstPage || isNavigating || isPending}
          className={`relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 ${
            (isNavigating || isPending) ? 'cursor-not-allowed' : ''
          }`}>
          <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
          <span>Previous</span>
        </button>
        <button
          onClick={() => handleNavigation(pageIndex + 1)}
          disabled={isLastPage || isNavigating || isPending}
          className={`relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 ${
            (isNavigating || isPending) ? 'cursor-not-allowed' : ''
          }`}>
          <span>Next</span>
          <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
        </button>
      </nav>
      {(isNavigating || isPending) && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-20 transition-opacity" />
      )}
    </div>
  );
}
