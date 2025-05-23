import { useEffect, useState } from "react";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface UseFetchResult<T> {
  isLoading: boolean;
  response: T | null;
  error: string | null;
}

export function useFetch<T = any>(
  url: string,
  method: HttpMethod,
  condition: boolean,
  payload?: object
): UseFetchResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState(null);

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

        const data = await res.json();
        setResponse(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unknown error");
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

  return { isLoading, response, error };
}
