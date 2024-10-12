/* eslint-disable react-hooks/exhaustive-deps */
import List from "./List";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const pageNumber = useRef(1);
  const containerRef = useRef(null);

  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    pageNumber.current = 1;
    setData([]);
  };

  const fetchData = useCallback(
    debounce(async (query, signal) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?${new URLSearchParams({
            q: query,
            page: pageNumber.current,
          })}`,
          {
            signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const result = await response.json();
        setData((prevData) =>
          prevData ? [...prevData, ...result.docs] : result.docs
        );
      } catch (error) {
        if (!signal.aborted && error?.message) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }, 400),
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

    fetchData(query, signal);

    return () => controller.abort();
  }, [fetchData, query]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (loading || error || !container) return;

    // if the user has scrolled to the bottom of the container element
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      pageNumber.current += 1;
      fetchData(query, new AbortController().signal);
    }
  }, [loading, error, fetchData, query]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div>
      <input
        type="text"
        className="border border-black/20 p-4 rounded-lg w-[200px] focus:outline-none"
        placeholder="Search..."
        onChange={handleChange}
      />
      <div ref={containerRef} className="h-[400px] overflow-y-auto mt-8">
        <List data={data} error={error} loading={loading} />
      </div>
    </div>
  );
};

export default InfiniteScroll;
