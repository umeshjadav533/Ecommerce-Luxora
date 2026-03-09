import { useDispatch, useSelector } from "react-redux";
import Slider from "./Slider";
import { useEffect } from "react";
import {
  getAllProductsAsyncThunk,
  getTagProductAsyncThunk,
} from "../features/products/productAPI";
import calculatePrice from "../utils/priceUtil.js";
import { Link } from "react-router-dom";

export default function NewArrival() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTagProductAsyncThunk({ tag: "new-arrival" }));
  }, [dispatch]);
  const { tagProducts } = useSelector((state) => state.product);

  return (
    <div className="my-10">
      <h3
        className="text-3xl text-center mb-10 cursor-pointer premium-cursive"
        onClick={() =>
          dispatch(getTagProductAsyncThunk({ tag: "new-arrival" }))
        }
      >
        New Arrival
      </h3>
      {tagProducts && tagProducts.length > 1 && (
        <Slider
          data={tagProducts}
          renderItem={(product) => (
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col justify-center items-center w-100 h-100">
                <img
                  src={product?.variants[0]?.images[0]}
                  className="w-full h-full object-contain"
                />
              </div>
              <b className="text-3xl">{product.title}</b>
              <div className="flex gap-2">
                <span className="text-2xl">
                  $
                  {calculatePrice(product?.variants[0]?.mrpPrice, product?.variants[0]?.discountPercentage)}
                </span>
                <span className="text-2xl line-through text-red-600">
                  ${product?.variants[0]?.mrpPrice}
                </span>
              </div>
              <Link
                to={`/product/${product._id}`}
                className="border-2 border-black rounded-full p-1.5 px-11 text-sm hover:bg-black hover:text-white transition-colors duration-300"
                style={{ fontWeight: 700 }}
              >
                SHOP
              </Link>
            </div>
          )}
        />
      )}
    </div>
  );
}
