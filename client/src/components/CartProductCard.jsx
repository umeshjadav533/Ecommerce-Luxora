import { Link } from "react-router-dom";
import { getCartProductsAsyncThunk, getcartSummaryAsyncThunk, removeCartProductAsyncThunk, updateCartProductAsyncThunk } from "../features/cart/cartAPI";
import { IdCard, Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";

export default function CartProductCard({ product }) {
    const dispatch = useDispatch();
  return (
    <div className="w-full grid grid-cols-4 gap-4 p-4 border-b border-gray-200 transition duration-200">
      {/* Image */}
      <div className="flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
        <Link to={`/product/${product.productId}`}>
          <img
            src={product?.image}
            alt={product.title}
            className="w-24 h-24 object-contain p-2"
          />
        </Link>
      </div>

      <div className="col-span-2 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 truncate">
            {product.title}
          </h3>

          <p className="text-sm text-gray-500">{product?.variant}</p>

          <p className="text-sm text-gray-600">Size: {product?.size}</p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-black outfit-font">
            ${product.price}
          </span>
          <span className="text-lg line-through font-bold text-slate-400 outfit-font">
            ${product.mrpPrice}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col justify-between items-end">
        <button
          className="text-sm text-gray-500 hover:text-black transition cursor-pointer"
          onClick={() =>
            dispatch(
              removeCartProductAsyncThunk({
                id: product.productId,
                size: product?.size || null,
                variant: product?.variant || null,
              }),
            ).then(() => {
              dispatch(getcartSummaryAsyncThunk())
            })
          }
        >
          Remove
        </button>

        <div className="grid grid-cols-3 border border-gray-300 rounded-full overflow-hidden shadow-sm">
          <button
            className="px-2 hover:bg-gray-200 transition text-center"
            onClick={() =>
              dispatch(
                updateCartProductAsyncThunk({
                id: product.productId,
                size: product?.size || null,
                variant: product?.variant || null,
                type: "decrement",
              })
              ).then(() => {
                dispatch(getcartSummaryAsyncThunk())
              })
            }
          >
            <Minus size={14} className="m-auto" />
          </button>

          <div className="px-2 text-center text-sm font-medium outfit-font">
            {product.quantity}
          </div>

          <button
            className="px-2 hover:bg-gray-200 transition"
            onClick={() =>
              dispatch(
                updateCartProductAsyncThunk({
                id: product.productId,
                size: product?.size || null,
                variant: product?.variant || null,
                type: "increment",
              })
              ).then(() => {
                dispatch(getcartSummaryAsyncThunk())
              })
            }
          >
            <Plus size={14} className="m-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
