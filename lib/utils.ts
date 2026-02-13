/**
 * Utility functions for the application
 */

/**
 * Generate a URL-friendly slug from a string
 * @param text The text to slugify
 * @returns The slugified string
 */
export function generateSlug(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

/**
 * Get the full URL for a media item
 * Handles both absolute and relative URLs
 */

export function getMediaUrl(url: string | undefined | null): string | undefined {
    if (!url) return undefined;

    // If it's already a full URL, ensure it uses 127.0.0.1 instead of localhost
    // This makes it more resilient to different local development setups
    if (url.startsWith('http')) {
        return url.replace(/^http:\/\/localhost:8000/, 'http://127.0.0.1:8000');
    }

    // If it's a relative path, prepend the backend host
    const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    const baseUrl = apiBase.replace(/\/api\/v1\/?$/, '');

    // Ensure we don't end up with double slashes but have the leading slash
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${path}`;
}
