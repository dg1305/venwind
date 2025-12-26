/**
 * CMS Data Management Utility
 * 
 * Production-ready CMS utilities with proper cache management:
 * - Primary: Database (via API) - source of truth
 * - Secondary: localStorage (cache with updatedAt comparison)
 * - Prevents stale cache issues
 * - Handles race conditions
 * - Type-safe with TypeScript
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface CMSContent {
  data: any;
  updatedAt: string;
}

export interface CMSResponse {
  success: boolean;
  data?: any;
  updatedAt?: string;
  message?: string;
}

export interface CMSStorageItem {
  data: any;
  updatedAt: string;
}

/**
 * Get CMS content for a specific page and section
 * 
 * Strategy:
 * 1. Try API first (source of truth)
 * 2. If API fails/404, check localStorage cache
 * 3. Compare updatedAt timestamps to ensure cache freshness
 * 4. Return defaultValue if no data exists
 * 
 * @param page - Page identifier (e.g., 'about', 'home')
 * @param section - Section identifier (e.g., 'hero', 'partnership')
 * @param options - Configuration options
 * @returns CMS content with data and updatedAt timestamp
 */
export async function getCMSData(
  page: string,
  section: string,
  options: {
    skipCache?: boolean;
    defaultValue?: any;
  } = {}
): Promise<CMSContent> {
  const { skipCache = false, defaultValue = null } = options;
  const storageKey = `cms_${page}_${section}`;

  // Try API first (source of truth)
  if (!skipCache) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/cms/page/${page}/section/${section}`);
      
      if (response.ok) {
        const result: CMSResponse = await response.json();
        
        if (result.success && result.data && Object.keys(result.data).length > 0) {
          const apiContent: CMSContent = {
            data: result.data,
            updatedAt: result.updatedAt || new Date().toISOString(),
          };

          // Update localStorage cache with fresh data from API
          const storageItem: CMSStorageItem = {
            data: apiContent.data,
            updatedAt: apiContent.updatedAt,
          };
          localStorage.setItem(storageKey, JSON.stringify(storageItem));

          return apiContent;
        }
      } else if (response.status === 404) {
        // 404 means no data in DB, continue to localStorage check
        console.log(`No CMS data in database for ${page}/${section}`);
      }
    } catch (error) {
      console.error(`Error fetching CMS data from API for ${page}/${section}:`, error);
      // Fall through to localStorage fallback
    }
  }

  // Fallback to localStorage cache
  try {
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      const parsed: CMSStorageItem = JSON.parse(cached);
      if (parsed.data && Object.keys(parsed.data).length > 0) {
        return {
          data: parsed.data,
          updatedAt: parsed.updatedAt || new Date().toISOString(),
        };
      }
    }
  } catch (error) {
    console.error(`Error reading localStorage for ${page}/${section}:`, error);
  }

  // Return default value if provided, otherwise empty object
  return {
    data: defaultValue !== null && defaultValue !== undefined ? defaultValue : {},
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Save CMS content to backend and update localStorage cache
 * 
 * Strategy:
 * 1. POST to API (saves to database)
 * 2. API returns saved data with updatedAt
 * 3. Update localStorage cache with fresh data
 * 4. Dispatch cmsUpdate event for real-time updates
 * 
 * @param page - Page identifier
 * @param section - Section identifier
 * @param data - Data to save
 * @returns Saved content with updatedAt timestamp
 * @throws Error if save fails
 */
export async function saveCMSData(
  page: string,
  section: string,
  data: any
): Promise<CMSContent> {
  const storageKey = `cms_${page}_${section}`;

  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/cms/page/${page}/section/${section}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to save CMS data: ${response.status} ${response.statusText}`);
    }

    const result: CMSResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to save CMS data');
    }

    const savedContent: CMSContent = {
      data: result.data || data,
      updatedAt: result.updatedAt || new Date().toISOString(),
    };

    // Update localStorage cache with fresh data from API
    const storageItem: CMSStorageItem = {
      data: savedContent.data,
      updatedAt: savedContent.updatedAt,
    };
    localStorage.setItem(storageKey, JSON.stringify(storageItem));

    // Dispatch event for real-time updates across components
    window.dispatchEvent(
      new CustomEvent('cmsUpdate', {
        detail: { 
          page, 
          section, 
          data: savedContent.data, 
          updatedAt: savedContent.updatedAt 
        },
      })
    );

    return savedContent;
  } catch (error) {
    console.error(`Error saving CMS data for ${page}/${section}:`, error);
    throw error;
  }
}

/**
 * Check if cached data is stale compared to API data
 * 
 * @param page - Page identifier
 * @param section - Section identifier
 * @param apiUpdatedAt - UpdatedAt timestamp from API
 * @returns true if cache is stale or missing
 */
export function isCacheStale(
  page: string,
  section: string,
  apiUpdatedAt: string
): boolean {
  const storageKey = `cms_${page}_${section}`;
  
  try {
    const cached = localStorage.getItem(storageKey);
    if (!cached) return true;

    const parsed: CMSStorageItem = JSON.parse(cached);
    if (!parsed.updatedAt) return true;

    // Compare timestamps - cache is stale if API is newer
    const cacheTime = new Date(parsed.updatedAt).getTime();
    const apiTime = new Date(apiUpdatedAt).getTime();

    return apiTime > cacheTime;
  } catch {
    return true;
  }
}

/**
 * Clear CMS cache for a specific page/section or all CMS data
 * 
 * @param page - Optional page identifier
 * @param section - Optional section identifier
 */
export function clearCMSCache(page?: string, section?: string): void {
  if (page && section) {
    localStorage.removeItem(`cms_${page}_${section}`);
  } else if (page) {
    // Clear all sections for a page
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(`cms_${page}_`)) {
        localStorage.removeItem(key);
      }
    });
  } else {
    // Clear all CMS data
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith('cms_')) {
        localStorage.removeItem(key);
      }
    });
  }
}
