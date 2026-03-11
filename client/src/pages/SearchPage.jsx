import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getAllProductsAsyncThunk } from "../features/products/productAPI";
import { useEffect } from "react";

export default function SearchPage() {
  const { products, meta } = useSelector((state) => state.product.productsData);
  const {
    totalPages = 0,
    currentPage = 1,
    hasPrevPage = false,
    hasNextPage = false,
    prevPage = null,
    nextPage = null,
  } = meta || {};
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  // Page load par 5 products
  useEffect(() => {
    dispatch(
      getAllProductsAsyncThunk({
        query: "",
        page: 1,
        limit: 8,
      }),
    );
  }, [dispatch]);

  // Search submit
  const submitForm = async (data) => {
    try {
      dispatch(
        getAllProductsAsyncThunk({
          query: data.query,
          page: 1,
          limit: 8,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-3">
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

      <div className="grid grid-cols-4 gap-3">
        {products?.map((product) => (
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
