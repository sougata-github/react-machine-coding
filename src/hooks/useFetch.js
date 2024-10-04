/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const useFetch = (query, transformData, promise, debounceWait, key) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const fetchName = useCallback(
    debounce(async (query, signal) => {
      setLoading(true);
      try {
        const response = await promise(query, signal);
        if (!response.ok) throw new Error(response.statusText);

        const result = await response.json();
        setData(transformData(result, key));
      } catch (error) {
        if (!signal.aborted && error?.message) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }, debounceWait),
    []
  );

  useEffect(() => {
    if (!query) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    fetchName(query, signal);

    return () => {
      controller.abort();
    };
  }, [fetchName, query, transformData]);

  return [data, setData, error, loading];
};
