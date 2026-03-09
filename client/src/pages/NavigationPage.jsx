import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsAsyncThunk } from "../features/products/productAPI";
import ProductCard from "../components/ProductCard";

export default function NavigationPage() {
  const dispatch = useDispatch();
  const { pageName } = useParams();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(
      getAllProductsAsyncThunk({
        limit: 50,
        query: pageName.toLowerCase(),
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
    </div>
  );
}
