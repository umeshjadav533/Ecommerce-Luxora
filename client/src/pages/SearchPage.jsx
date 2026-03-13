import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllProductsAsyncThunk,
  getSearchProductAsyncThunk,
} from "../features/products/productAPI";
import ProductCard from "../components/ProductCard";
import FilteredSection from "../components/FilteredSection";

export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm();

  const { products: searchProducts, meta: searchMeta } = useSelector(
    (state) => state.product.searchProductsData
  );

  const { products: allProducts, meta: allMeta } = useSelector(
    (state) => state.product.productsData
  );

  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery && searchQuery.trim() !== "";
  const productsToShow = isSearching ? searchProducts : allProducts;
  const metaToUse = isSearching ? searchMeta : allMeta;

  const {
    totalPages = 0,
    currentPage = 1,
    hasPrevPage = false,
    hasNextPage = false,
    prevPage = null,
    nextPage = null,
  } = metaToUse || {};

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const query = params.get("query") || "";
    const page = Number(params.get("page")) || 1;
    const category = params.get("category");
    const subCategory = params.get("subCategory");
    const brand = params.get("brand");
    const tags = params.get("tags");

    setSearchQuery(query);

    if (query || category || subCategory || brand || tags) {
      dispatch(
        getSearchProductAsyncThunk({
          query,
          category,
          subCategory,
          brand,
          tags,
          page,
          limit: 9,
        })
      );
    } else {
      dispatch(
        getAllProductsAsyncThunk({
          page,
          limit: 12,
        })
      );
    }
  }, [location.search, dispatch]);

  // Search submit
  const submitForm = (data) => {
    const query = data.query.trim();

    navigate(
      query
        ? `/search?query=${encodeURIComponent(query)}&page=1`
        : `/search`
    );
  };

  // Pagination
  const changePage = (page) => {
    const params = new URLSearchParams(location.search);

    if (searchQuery) {
      params.set("query", searchQuery);
    }

    params.set("page", page);

    navigate(`/search?${params.toString()}`);
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

      {/* Products */}
      <div className="grid grid-cols-4 gap-3">
        {console.log(searchQuery)}
        {searchQuery && (
          <div className="col-span-1 h-full bg-white">
            <FilteredSection />
          </div>
        )}

        <div className={`${searchQuery ? "col-span-3 grid-cols-3 grid-rows-3" : "col-span-full grid-cols-4"} grid  gap-3`}>
          {productsToShow?.length > 0 ? (
            productsToShow.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
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

            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;

              return (
                <li key={page}>
                  <button
                    onClick={() => changePage(page)}
                    className={`cursor-pointer px-4 py-2 rounded-md ${
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