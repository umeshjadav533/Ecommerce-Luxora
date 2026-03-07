import { Link } from "react-router-dom";
import calculatePrice from "../utils/priceUtil.js";
import { ShoppingBag } from "lucide-react";

export default function BestSellerProductCard({ product }) {
  return (
    <div className="rounded-2xl h-70 flex flex-col justify-between gap-2 p-2 bg-white">
      <div className="relative">
        <Link
          to={`/product/${product._id}`}
          className="h-40 overflow-hidden flex flex-col justify-center items-center"
        >
          <img
            src={product?.variants[0]?.images[0]}
            className="w-full h-full object-contain"
          />
        </Link>
        <span className="absolute top-3 left-3 bg-[#E0DACF] px-3 py-1 rounded-full text-sm">
          NEW
        </span>
      </div>

      <div className="h-30 flex flex-col gap-2 justify-end">
        <span className="truncate-title">{product.title}</span>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-xl">
              ${calculatePrice(product.mrpPrice, product.discountPercentage)}
            </span>
            <span className="text-xl line-through text-red-600">
              ${product.mrpPrice}
            </span>
          </div>
          <button className="flex justify-center items-center gap-4 hover:bg-black hover:text-white px-4 py-1.5 border-2 text-sm rounded-full cursor-pointer">
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
