import { Link } from "react-router-dom";
import calculatePrice from "../utils/priceUtil.js";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addCartProductAsyncThunk } from "../features/cart/cartAPI.js";

export default function BestSellerProductCard({ product }) {
  const dispatch = useDispatch();
  
  return (
    <div className="rounded-2xl h-60 flex flex-col justify-between p-2 bg-white">
      <div className="relative">
        <Link
          to={`/product/${product._id}`}
          className="h-35 overflow-hidden flex flex-col justify-center items-center"
        >
          <img
            src={product?.variants[0]?.images[0]}
            className="w-full h-full object-contain"
          />
        </Link>
        <span className="absolute top-3 left-3 bg-[#E0DACF] px-3 py-1 rounded-full text-sm" style={{fontWeight: 600}}>
          BEST
        </span>
      </div>

      <div className="h-20 flex flex-col justify-end">
        <span className="truncate-title text-sm">{product.title}</span>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-xl">
              ${calculatePrice(product?.variants[0]?.mrpPrice, product?.variants[0]?.discountPercentage)}
            </span>
            <span className="text-xl line-through text-red-600">
              ${product?.variants[0]?.mrpPrice}
            </span>
          </div>
          <button className="flex justify-center items-center gap-2.5 hover:bg-black hover:text-white px-3 py-1 border-2 text-sm rounded-full cursor-pointer" onClick={() => dispatch(addCartProductAsyncThunk({
            id: product._id,
            size: product?.variants[0]?.sizes[0].size || null,
            variant: product?.variants[0]?.color || null,
            quantity: Number(1)
          }))}>
            <span>
              <ShoppingBag size={20} />
            </span>
            <span style={{ fontWeight: 600 }}>ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
}
