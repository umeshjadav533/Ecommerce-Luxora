import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllProductsAsyncThunk,
  getFilteredProductAsyncThunk,
} from "../features/products/productAPI";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm();

  const { products: filteredProducts, meta: filteredMeta } = useSelector(
    (state) => state.product.filteredProductsData,
  );
  const { products: allProducts, meta: allMeta } = useSelector(
    (state) => state.product.productsData,
  );

  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery && searchQuery.trim() !== "";
  const productsToShow = isSearching ? filteredProducts : allProducts;
  const metaToUse = isSearching ? filteredMeta : allMeta;

  const {
    totalPages = 0,
    currentPage = 1,
    hasPrevPage = false,
    hasNextPage = false,
    prevPage = null,
    nextPage = null,
  } = metaToUse || {};

  // On mount, read query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";

    setSearchQuery(query);

    if (query.trim() !== "") {
      dispatch(
        getFilteredProductAsyncThunk({
          query,
          page: 1,
          limit: 8,
        }),
      );
    } else {
      dispatch(
        getAllProductsAsyncThunk({
          page: 1,
          limit: 8,
        }),
      );
    }
  }, [location.search, dispatch]);

  // Form submit
  const submitForm = (data) => {
    const query = data.query.trim();
    setSearchQuery(query);

    navigate(query ? `/search?query=${encodeURIComponent(query)}` : `/search`);

    if (query) {
      dispatch(
        getFilteredProductAsyncThunk({
          query,
          page: 1,
          limit: 8,
        }),
      );
    } else {
      dispatch(
        getAllProductsAsyncThunk({
          page: 1,
          limit: 8,
        }),
      );
    }
  };

  // Pagination handler
  const changePage = (page) => {
    if (isSearching) {
      dispatch(
        getFilteredProductAsyncThunk({
          query: searchQuery,
          page,
          limit: 8,
        }),
      );
    } else {
      dispatch(
        getAllProductsAsyncThunk({
          page,
          limit: 8,
        }),
      );
    }
  };

  return (
    <div className="p-3">
      {/* Search bar */}
      <div className="h-[30vh] flex justify-center items-end p-5">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex justify-between items-center border-b-2"
        >
          <input
            type="search"
            placeholder="What are you looking for?"
            className="outline-none w-100 py-2 px-2"
            {...register("query")}
          />
          <button type="submit" className="cursor-pointer">
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-4 gap-6">
        {productsToShow.length > 0 ? (
          productsToShow.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <ul className="flex items-center gap-2">
            {/* Prev */}
            <li>
              <button
                disabled={!hasPrevPage}
                onClick={() => changePage(prevPage)}
                className={`px-4 py-2 rounded-md text-white ${
                  hasPrevPage
                    ? "bg-black hover:opacity-70"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Prev
              </button>
            </li>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              return (
                <li key={page}>
                  <button
                    onClick={() => changePage(page)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "bg-[#E0DACF] hover:opacity-60"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            {/* Next */}
            <li>
              <button
                disabled={!hasNextPage}
                onClick={() => changePage(nextPage)}
                className={`px-4 py-2 rounded-md text-white ${
                  hasNextPage
                    ? "bg-black hover:opacity-70"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
