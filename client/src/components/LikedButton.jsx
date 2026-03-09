import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWishlistProductAsyncThunk,
  removeWishlistProductAsyncThunk,
} from "../features/wishlist/wishlistAPI.js";

export default function LikedButton({ id, size = null, variant = null }) {
  const dispatch = useDispatch();

  const wishlistProducts = useSelector(
    (state) => state.wishlist.wishlistProducts
  );

  const isWishlisted = wishlistProducts.some(
    (item) =>
      item.productId === id &&
      (item.size || null) === size &&
      (item.variant || null) === variant
  );

  const handleClick = () => {
    if (isWishlisted) {
      dispatch(
        removeWishlistProductAsyncThunk({
          id,
          size,
          variant,
        })
      );
    } else {
      dispatch(
        addWishlistProductAsyncThunk({
          id,
          size,
          variant,
        })
      );
    }
  };

  return (
    <button
      className="bg-[#ECE9E2] p-1.5 rounded-full overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      <Heart
        className={`w-5 h-5 transition ${
          isWishlisted
            ? "fill-black text-black"
            : "text-blue-950 group-hover:fill-black"
        }`}
      />
    </button>
  );
}