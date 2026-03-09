'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch data with a hardcoded fallback
 * @param fetchFn The function that performs the API call
 * @param fallbackData The hardcoded data that will be used if the fetch fails
 * @param params Optional parameters for the fetch function
 */
export function useDataWithFallback<T>(
    fetchFn: (...args: any[]) => Promise<T>,
    fallbackData: T,
    ...params: any[]
) {
    const [data, setData] = useState<T>(fallbackData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                setIsLoading(true);
                const result = await fetchFn(...params);
                if (isMounted) {
                    // Only update if result is valid and not empty
                    if (result && (!Array.isArray(result) || result.length > 0)) {
                        setData(result);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    console.info('Backend fetching failed or unavailable, using provided fallback data.');
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [...params]); // Recalculate if params change

    return { data, isLoading, error };
}
