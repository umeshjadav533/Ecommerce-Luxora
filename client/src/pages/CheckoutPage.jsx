import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcartSummaryAsyncThunk } from "../features/cart/cartAPI.js";

export default function CheckoutPage() {
  const [method, setMethod] = useState("COD");
  const dispatch = useDispatch();
  const { shipping, subTotal, tax, total } = useSelector((state) => state.cart.cartSummary);
  useEffect(() => {
    dispatch(getcartSummaryAsyncThunk());
  }, [dispatch]);
  
  return (
    <div className="bg-white p-6">
      <form className="mt-20 grid grid-cols-4">
        <div className="flex flex-col gap-4 col-span-2 px-25 py-10">
          <h1 className="text-3xl my-5">DElIVERY INFORMATION</h1>

          {/* Frist nameand Last name */}
          <div className="flex gap-4">
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First name"
              required
            />
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last name"
              required
            />
          </div>

          {/* Phone number */}
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Phone number"
            required
          />

          {/* Street */}
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
            required
          />

          <div className="flex gap-4">
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
              required
            />
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="State"
              required
            />
          </div>

          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zipcode"
            required
          />
        </div>

        <div className="py-10 px-25 col-span-2">
          <h1 className="text-3xl my-5">CART TOTALS</h1>
          <div className="text-sm flex justify-between border-b border-slate-200 py-2">
            <span>SubTotal</span>
            <span>$ {subTotal.toFixed(2)}</span>
          </div>
          <div className="text-sm flex justify-between border-b border-slate-200 py-2">
            <span>Tax</span>
            <span>$ {tax.toFixed(2)}</span>
          </div>
          <div className="text-sm flex justify-between border-b border-slate-200 py-2">
            <span>Shipping</span>
            <span>$ {shipping === 0 ? "FREE" : shipping}</span>
          </div>
          <div className="flex justify-between py-2">
            <span style={{ fontWeight: 700 }}>Total</span>
            <span style={{ fontWeight: 700 }}>$ {total.toFixed(2)}</span>
          </div>
        </div>
      </form>
    </div>
  );
}
