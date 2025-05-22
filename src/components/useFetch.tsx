import { useEffect, useState } from "react";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  url: string;
  method?: Method;
  payload?: any;
  skip?: boolean;
}

export default function useFetch({ url, method = "GET", payload, skip = false }: FetchOptions) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (skip) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const options: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        };

        if (payload && method !== "GET") {
          options.body = JSON.stringify(payload);
        }

        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Unknown error");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, payload, skip]);

  return { data, isLoading, error };
}
