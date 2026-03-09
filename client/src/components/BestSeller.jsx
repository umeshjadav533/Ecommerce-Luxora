import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTagProductAsyncThunk } from "../features/products/productAPI";
import BestSellerProductCard from "./BestSellerProductCard";

export default function BestSeller() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTagProductAsyncThunk({ tag: "best-seller" }));
  }, [dispatch]);
  const { tagProducts } = useSelector((state) => state.product);
  const [active, setActive] = useState("men");
  return (
    <div className="my-10 flex flex-col gap-3">
      <div className="flex justify-between items-center px-5">
        <h3
          className="text-3xl font-bold underline underline-offset-4 text-center my-5 cursor-pointer premium-cursive"
          onClick={() =>
            dispatch(getTagProductAsyncThunk({ tag: "best-seller" }))
          }>
          Best Seller
        </h3>
        <ul className="flex justify-center items-center gap-3 bg-white/80 backdrop-blur-md shadow-md rounded-full py-2 px-2.5 border border-gray-200">
          {["MEN", "WOMEN", "KIDS"].map((item) => (
            <li
              key={item}
              className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition hover:bg-[#b8b5b542] ${item.toLowerCase() === active ? "bg-black text-white hover:bg-gray-800" : ""}`}
              onClick={() => {
                setActive(item.toLowerCase());
                dispatch(
                  getTagProductAsyncThunk({
                    tag: "best-seller",
                    category: `${item.toLowerCase()}`,
                  }),
                );
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-cols-2 gap-3">
          {tagProducts.length === 0 ? (
            <p className="col-span-4 text-gray-500 py-10 flex justify-center items-center">
              No Products found
            </p>
          ) : (
            tagProducts
              .slice(0, 4)
              .map((product) => (
                <BestSellerProductCard key={product._id} product={product} />
              ))
          )}
        </div>
        <div className="h-[80vh] grid grid-rows-2 gap-3 border rounded-2xl overflow-hidden">
          
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {tagProducts && tagProducts.length > 1 && tagProducts.slice(4, 8).map((product) => (
          <BestSellerProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
