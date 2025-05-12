import { apiVersion, dataset, projectId, useCdn } from "./config";
import {
  postquery,
  limitquery,
  paginatedquery,
  configQuery,
  singlequery,
  pathquery,
  allauthorsquery,
  authorsquery,
  postsbyauthorquery,
  postsbycatquery,
  catpathquery,
  catquery,
  getAll,
  searchquery
} from "./groq";
import { createClient } from "next-sanity";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ 
      projectId, 
      dataset, 
      apiVersion, 
      useCdn,
      // Add timeout to prevent hanging requests
      timeout: 30000,
    })
  : null;

async function withRetry(operation: () => Promise<any>, retries = MAX_RETRIES): Promise<any> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return withRetry(operation, retries - 1);
    }
    throw error;
  }
}

export const fetcher = async ([query, params]) => {
  if (!client) return [];
  
  try {
    return await withRetry(() => client.fetch(query, params));
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

// Initialize connection test
(async () => {
  if (client) {
    try {
      const data = await withRetry(() => client.fetch(getAll));
      if (!data || !data.length) {
        console.error(
          "Sanity returns empty array. Are you sure the dataset is public?"
        );
      }
    } catch (error) {
      console.error("Failed to connect to Sanity:", error);
    }
  }
})();

export async function getAllPosts() {
  if (!client) return [];
  
  try {
    return await withRetry(() => client.fetch(postquery)) || [];
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

export async function getSettings() {
  if (!client) return [];
  
  try {
    return await withRetry(() => client.fetch(configQuery)) || [];
  } catch (error) {
    console.error('Error fetching settings:', error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  if (!client) return {};
  
  try {
    return await withRetry(() => client.fetch(singlequery, { slug })) || {};
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return {};
  }
}

export async function getAllPostsSlugs() {
  if (!client) return [];
  
  try {
    const slugs = await withRetry(() => client.fetch(pathquery)) || [];
    return slugs.map(slug => ({ slug }));
  } catch (error) {
    console.error('Error fetching all posts slugs:', error);
    return [];
  }
}

// Author
export async function getAllAuthorsSlugs() {
  if (!client) return [];
  
  try {
    const slugs = await withRetry(() => client.fetch(authorsquery)) || [];
    return slugs.map(slug => ({ author: slug }));
  } catch (error) {
    console.error('Error fetching all authors slugs:', error);
    return [];
  }
}

export async function getAuthorPostsBySlug(slug) {
  if (!client) return {};
  
  try {
    return await withRetry(() => client.fetch(postsbyauthorquery, { slug })) || {};
  } catch (error) {
    console.error('Error fetching author posts by slug:', error);
    return {};
  }
}

export async function getAllAuthors() {
  if (!client) return [];
  
  try {
    return await withRetry(() => client.fetch(allauthorsquery)) || [];
  } catch (error) {
    console.error('Error fetching all authors:', error);
    return [];
  }
}

// Category

export async function getAllCategories() {
  if (!client) return [];
  
  try {
    const slugs = await withRetry(() => client.fetch(catpathquery)) || [];
    return slugs.map(slug => ({ category: slug }));
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

export async function getPostsByCategory(slug) {
  if (!client) return [];
  
  try {
    return await withRetry(() => client.fetch(postsbycatquery, { slug })) || [];
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getTopCategories() {
  if (!client) return [];
  
  try {
    return await withRetry(() => client.fetch(catquery)) || [];
  } catch (error) {
    console.error('Error fetching top categories:', error);
    return [];
  }
}

export async function getPaginatedPosts({ limit, pageIndex = 0 }) {
  if (!client) return { posts: [], total: 0 };
  
  try {
    const result = await withRetry(() => 
      client.fetch(paginatedquery, {
        pageIndex: pageIndex,
        limit: limit
      })
    );
    
    if (!result) {
      return { posts: [], total: 0 };
    }

    return {
      posts: result.posts || [],
      total: result.total || 0
    };
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    return { posts: [], total: 0 };
  }
}
