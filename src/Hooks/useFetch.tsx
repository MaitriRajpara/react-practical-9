import { useEffect, useState } from "react";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface UseFetchResult<T> {
  isLoading: boolean;
  data: T | null;
  error: string | null;
}

export function useFetch<T>(
  url: string,
  method: HttpMethod,
  condition: boolean,
  payload?: object
): UseFetchResult<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!condition) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const options: RequestInit = {
        method: method.toUpperCase(),
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      };

      if (method !== "get" && method !== "delete" && payload) {
        options.body = JSON.stringify(payload);
      }

      try {
        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const result: T = await res.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, method, condition, payload]);

  return { isLoading, data, error };
}
