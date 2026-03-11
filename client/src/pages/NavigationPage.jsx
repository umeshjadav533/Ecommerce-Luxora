import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsAsyncThunk } from "../features/products/productAPI";
import ProductCard from "../components/ProductCard";

export default function NavigationPage() {
  const dispatch = useDispatch();
  const { pageName } = useParams();
  const { products, meta } = useSelector((state) => state.product.productsData);
  const {
    totalPages = 0,
    currentPage = 1,
    hasPrevPage = false,
    hasNextPage = false,
    prevPage = null,
    nextPage = null,
  } = meta || {};

  useEffect(() => {
    dispatch(
      getAllProductsAsyncThunk({
        query: pageName.toLowerCase(),
        limit: 8,
      }),
    );
  }, [dispatch, pageName]);

  return (
    <div className="mt-15 mb-5">
      <div className="text-center py-10">
        <h1 className="text-5xl font-extrabold capitalize">
          {pageName} Collection
        </h1>

        <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our latest {pageName} products with premium quality, modern
          style, and best deals specially picked for you.
        </p>
      </div>

      <div className="p-4 grid grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <ul className="flex items-center gap-2">
            {/* PREV */}
            <li>
              <button
                disabled={!hasPrevPage}
                onClick={() =>
                  dispatch(
                    getAllProductsAsyncThunk({
                      query: pageName.toLowerCase(),
                      page: prevPage,
                      limit: 8,
                    }),
                  )
                }
                className={`px-4 py-2 bg-black text-white rounded-md transition ${hasPrevPage ? "hover:opacity-25" : "opacity-40 cursor-not-allowed"}`}
              >
                Prev
              </button>
            </li>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;

              return (
                <li key={page}>
                  <button
                    onClick={() =>
                      dispatch(
                        getAllProductsAsyncThunk({
                          query: pageName.toLowerCase(),
                          page,
                          limit: 5,
                        }),
                      )
                    }
                    className={`px-4 py-2 bg-[#E0DACF] rounded-md cursor-pointer transition ${currentPage === page ? "bg-black text-white border-none" : "hover:opacity-60"}`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            {/* NEXT */}
            <li>
              <button
                disabled={!hasNextPage}
                onClick={() =>
                  dispatch(
                    getAllProductsAsyncThunk({
                      query: pageName.toLowerCase(),
                      page: nextPage,
                      limit: 8,
                    }),
                  )
                }
                className={`px-4 py-2 bg-black  text-white rounded-md transition ${hasNextPage ? "hover:opacity-25" : "opacity-40 cursor-not-allowed"}`}
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
