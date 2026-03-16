import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcartSummaryAsyncThunk } from "../features/cart/cartAPI.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../validations/checkoutValidation.js";

export default function CheckoutPage() {
  const [method, setMethod] = useState("COD");

  const dispatch = useDispatch();

  const { shipping, subTotal, tax, total } = useSelector(
    (state) => state.cart.cartSummary,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  useEffect(() => {
    dispatch(getcartSummaryAsyncThunk());
  }, [dispatch]);

  const submitForm = async (data) => {
    console.log("Form Data:", data);
    console.log("Payment Method:", method);
  };

  return (
    <div className="bg-white p-6">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mt-20 grid grid-cols-4"
      >
        {/* Delivery Information */}
        <div className="flex flex-col gap-4 col-span-2 px-25 py-10">
          <h1 className="text-3xl my-5">DELIVERY INFORMATION</h1>
          {/* First name and Last name */}
          <div className="flex gap-4">
            <div className="w-full">
              <input
                className="border border-slate-200 rounded py-1.5 px-3.5 w-full"
                placeholder="First name"
                {...register("firstName")}
              />
              <p className="text-red-500 text-sm">
                {errors.firstName?.message}
              </p>
            </div>

            <div className="w-full">
              <input
                className="border border-slate-200 rounded py-1.5 px-3.5 w-full"
                placeholder="Last name"
                {...register("lastName")}
              />
              <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            </div>
          </div>

          {/* Phone number */}
          <div>
            <input
              className="border border-slate-200 rounded py-1.5 px-3.5 w-full"
              placeholder="Phone number"
              {...register("phone")}
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>{" "}
          </div>

          {/* Street */}
          <div>
            <input
              className="border border-slate-200 rounded py-1.5 px-3.5 w-full"
              placeholder="Street"
              {...register("street")}
            />
            <p className="text-red-500 text-sm">{errors.street?.message}</p>
          </div>

          {/* City */}
          <div className="flex gap-4">
            <div className="w-full">
              <input
                className="border border-slate-200 rounded py-1.5 px-3.5 w-full"
                placeholder="City"
                {...register("city")}
              />
              <p className="text-red-500 text-sm">{errors.city?.message}</p>
            </div>

            {/* State */}
            <div className="w-full">
              <input
                className="border border-slate-200 rounded py-1.5 px-3.5 w-full"
                placeholder="State"
                {...register("state")}
              />
              <p className="text-red-500 text-sm">{errors.state?.message}</p>
            </div>
          </div>

          {/* Pincode  */}
          <div>
            <input
              className="border border-slate-200 rounded py-1.5 px-3.5 w-full"
              placeholder="pincode"
              {...register("pincode")}
            />
            <p className="text-red-500 text-sm">{errors.pincode?.message}</p>
          </div>
        </div>

        {/* Cart Totals */}
        <div className="py-10 px-25 col-span-2">
          <h1 className="text-3xl my-5">CART TOTALS</h1>
          <div className="text-sm flex justify-between border-b py-2">
            <span>SubTotal</span>
            <span>$ {subTotal?.toFixed(2)}</span>
          </div>

          <div className="text-sm flex justify-between border-b py-2">
            <span>Tax</span>
            <span>$ {tax?.toFixed(2)}</span>
          </div>

          <div className="text-sm flex justify-between border-b py-2">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `$ ${shipping}`}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-bold">Total</span>
            <span className="font-bold">$ {total?.toFixed(2)}</span>
          </div>

          {/* Payment Methods */}
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-5">
              <label className="flex items-center gap-3 border p-2 rounded cursor-pointer">
                <input
                  type="radio"
                  value="RAZORPAY"
                  checked={method === "RAZORPAY"}
                  onChange={() => setMethod("RAZORPAY")}
                />
                <img
                  src="https://razorpay.com/assets/razorpay-logo.svg"
                  alt="razorpay"
                  className="w-24"
                />
              </label>

              <label className="flex items-center gap-3 border p-2 rounded cursor-pointer">
                <input
                  type="radio"
                  value="COD"
                  checked={method === "COD"}
                  onChange={() => setMethod("COD")}
                />
                <span>Cash On Delivery</span>
              </label>
            </div>

            <button
              type="submit"
              className="bg-black text-white px-6 py-2 mt-6 w-full cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
