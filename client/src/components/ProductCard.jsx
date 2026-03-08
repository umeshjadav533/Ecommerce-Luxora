import { Link } from "react-router-dom";
import calculatePrice from "../utils/priceUtil.js";
import LikedButton from "./LikedButton.jsx";

export default function ProductCard({ product }) {
  return (
    <div className="h-100 bg-white rounded-2xl flex flex-col justify-between items-center gap-2 p-2 overflow-hidden">
      <div className="w-full h-80 overflow-hidden">
        <Link to={`/product/${product._id}`}>
            <img src={product?.variants[0]?.images[0]} className="w-full h-full object-contain transition duration-300 hover:scale-110"/>
        </Link>
        <LikedButton id={product._id} size={product?.variants[0]?.sizes[0]?.size} variant={product?.variants[0]?.color?.name}/>
      </div>
      <div className="w-full h-20 overflow-hidden">
        <p className="truncate-title text-sm text-gray-900">{product.title}</p>
        <div className="flex gap-2">
          <span className="text-2xl">
            ${calculatePrice(product.mrpPrice, product.discountPercentage)}
          </span>
          <span className="text-2xl line-through text-red-600">
            ${product.mrpPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
