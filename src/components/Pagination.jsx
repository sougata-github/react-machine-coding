/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;

const Pagination = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || 1);
  const skipAmount = (currentPage - 1) * PAGE_SIZE;

  console.log(currentPage, skipAmount);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skipAmount}`
      );

      const result = await response.json();

      setData(result.products);
      setTotalProducts(result.total);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [skipAmount]);

  useEffect(() => {
    if (!skipAmount) {
      setData([]);
      setError(null);
      setLoading(false);
    }

    if (skipAmount >= 0) {
      fetchProducts();
    }
  }, [skipAmount, fetchProducts]);

  const handleNavigation = (direction) => {
    const nextPage = direction === "prev" ? currentPage - 1 : currentPage + 1;

    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  };

  if (error) return "Failed to fetch";
  if (data === null || data === undefined || data.length === 0) return;

  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  return (
    <div>
      <div className="w-72 flex flex-col h-[280px] overflow-y-auto mx-auto">
        {loading && (
          <Loader className="size-4 text-gray-600 animate-spin transition-all" />
        )}
        {!loading &&
          data.map((product) => (
            <div key={product.id}>
              <p>{product.title}</p>
            </div>
          ))}
      </div>

      <div className="mt-6 flex justify-between w-full">
        <button
          className="font-medium px-4 py-1 bg-gray-200 rounded text-gray-600 outline outline-2 outline-black/10 text-sm disabled:text-gray-400 disabled:bg-gray-50"
          disabled={currentPage === 1}
          onClick={() => handleNavigation("prev")}
        >
          Prev
        </button>
        <button
          className="font-medium px-4 py-1 bg-gray-200 rounded text-gray-600 outline outline-2 outline-black/10 text-sm disabled:text-gray-400 disabled:bg-gray-50"
          onClick={() => handleNavigation("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
