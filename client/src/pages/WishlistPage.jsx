import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWishlistProductsAsyncThunk,
  removeWishlistProductAsyncThunk,
} from "../features/wishlist/wishlistAPI";
import { Link } from "react-router-dom";
import LikedButton from "../components/LikedButton";
import calculatePrice from "../utils/priceUtil.js";
import { Trash } from "lucide-react";

export default function WishlistPage() {
  const wishlistProducts = useSelector(
    (state) => state.wishlist.wishlistProducts,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWishlistProductsAsyncThunk());
  }, [dispatch]);

  return (
    <div className="p-3">
      {/* Empty Wishlist */}
      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6 h-screen">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 text-center max-w-sm">
            Looks like you haven't added anything to your wishlist yet. Start
            exploring products you love.
          </p>

          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Heading */}
          <div className="py-20">
            <h1 className="text-center text-4xl font-bold tracking-wide">
              Your Wishlist ❤️
            </h1>
            <p className="text-center text-gray-500 mt-2">
              Products you loved the most
            </p>
          </div>

          {/* wishlist products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.productId}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 grid grid-cols-3 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative bg-gray-50 flex items-center justify-center p-3">
                  <div className="h-40 w-full">
                    <Link to={`/product/${product.productId}`}>
                      <img
                        src={product.image}
                        className="w-full h-full object-contain"
                      />
                    </Link>

                    <div className="absolute top-3 right-3">
                      <LikedButton
                        id={product.productId}
                        size={product?.size || null}
                        variant={product?.variant || null}
                      />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="col-span-2 flex flex-col justify-between relative p-5">
                  <div className="flex flex-col gap-3 pr-10">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {product.title}
                    </p>

                    {product?.size && (
                      <span className="text-sm text-gray-500">
                        Size: {product.size}
                      </span>
                    )}

                    {product?.variant && (
                      <span className="text-sm text-gray-500">
                        Color: {product.variant.toLowerCase()}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xl font-bold text-black">
                      $
                      {calculatePrice(
                        product?.mrpPrice,
                        product?.discountPercentage,
                      )}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ${product?.mrpPrice}
                    </span>

                    <span className="text-green-600 text-sm font-semibold">
                      {product?.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div
                    className="text-gray-700 hover:text-black absolute top-5 right-5 cursor-pointer"
                    onClick={() => {
                      dispatch(
                        removeWishlistProductAsyncThunk({
                          id: product.productId,
                          size: product?.size || null,
                          variant: product?.variant || null,
                        }),
                      );
                    }}
                  >
                    <Trash size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
