import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTagProductAsyncThunk } from "../features/products/productAPI";
import BestSellerProductCard from "./BestSellerProductCard";

export default function BestSeller() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTagProductAsyncThunk({ tag: "best-seller" }));
  }, [dispatch]);
  const { tagProducts } = useSelector((state) => state.product);
  //   console.log(tagProducts[0]?.variants)
  return (
    <div className="my-10 flex flex-col gap-3">
      <h3 className="text-3xl font-bold underline underline-offset-4 text-center my-5 cursor-pointer" onClick={() => dispatch(getTagProductAsyncThunk({ tag: "best-seller" }))}>
        Best Seller
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-rows-2 gap-3 border rounded-2xl overflow-hidden"></div>
        <div className="grid grid-cols-2 gap-3">
          {tagProducts.slice(0, 4).map((product) => (
            <BestSellerProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {tagProducts.slice(4, 8).map((product) => (
          <BestSellerProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
