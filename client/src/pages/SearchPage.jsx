import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getAllProductsAsyncThunk } from "../features/products/productAPI";
import { useEffect } from "react";

export default function SearchPage() {
  const { products } = useSelector((state) => state.product);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsyncThunk({query: ""}));
  }, [dispatch]); 

  const submitForm = async (data) => {
    try {
      await dispatch(getAllProductsAsyncThunk({ query: data.query }));
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
    </div>
  );
}