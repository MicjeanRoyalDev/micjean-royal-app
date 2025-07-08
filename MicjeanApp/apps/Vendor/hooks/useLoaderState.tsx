import { useState, useEffect, useCallback } from 'react';

export function useLoaderState<T>(active: boolean, loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const result = await loader();
    setData(result);
    setIsLoading(false);
  }, [loader]);

  useEffect(() => {
    if (active) {
      fetchData();
    }
  }, [active]);

  return { data, isLoading, refetch: fetchData };
}