import { Link } from "react-router-dom";
import calculatePrice from "../utils/priceUtil.js";
import LikedButton from "./LikedButton.jsx";

export default function ProductCard({ product }) {
  return (
    <div className="h-120 bg-white rounded-2xl flex flex-col justify-between items-center gap-2 p-2 overflow-hidden">
      <div className="w-full h-100 overflow-hidden relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product?.variants[0]?.images[0]}
            className="w-full h-full object-contain transition duration-300 hover:scale-110"
          />
        </Link>
        {product.tags.includes("best-seller") ? (
          <span
            className="absolute top-3 left-3 bg-[#ECE9E2] px-3 py-1 rounded-full text-sm"
            style={{ fontWeight: 700 }}
          >
            BEST SELLER
          </span>
        ) : null}
        <span className="absolute top-3 right-3">
          <LikedButton
            id={product._id}
            size={product?.variants[0]?.sizes[0]?.size}
            variant={product?.variants[0]?.color?.name}
          />
        </span>
      </div>
      <div className="w-full h-25 overflow-hidden flex flex-col justify-end gap-1">
        <p className="truncate-title text-sm text-gray-900">{product.title}</p>
        <div className="flex gap-2">
          <span className="text-2xl">
            $
            {calculatePrice(
              product?.variants[0]?.mrpPrice,
              product?.variants[0]?.discountPercentage,
            )}
          </span>
          <span className="text-2xl line-through text-red-600">
            ${product?.variants[0]?.mrpPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
