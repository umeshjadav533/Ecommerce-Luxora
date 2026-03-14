import {
  Handbag,
  Heart,
  LogOut,
  RefreshCcw,
  User,
  WalletCards,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUserAsyncThunk } from "../features/auth/authAPI.js";
import { useState } from "react";

export default function AccountPage() {
  const dispatch = useDispatch();
  const [tab, setTabs] = useState("profile");
  return (
    <div className="p-3 grid grid-cols-12 gap-3 mt-20 min-h-screen">
      {/* Left SideBar */}
      <div className="col-span-3 bg-white rounded-lg overflow-hidden">
        {/* Profile */}
        <div className="p-4 flex items-center gap-4 bg-slate-100">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
            <User />
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Hello</span>
            <span className="font-semibold">Jadav Umesh</span>
          </div>
        </div>

        {/* Menu */}
        <ul className="p-2 flex flex-col gap-3">
          <li
            className={`flex items-center gap-3 p-3 ${tab === "profile" ? "bg-slate-100" : "hover:bg-slate-100"} hover:bg-slate-100 rounded cursor-pointer`}
            onClick={() => setTabs("profile")}
          >
            <User size={18} />
            <span className="font-medium">My Account</span>
          </li>

          <li
            className={`flex items-center gap-3 p-3 ${tab === "orders" ? "bg-slate-100" : "hover:bg-slate-100"} hover:bg-slate-100 rounded cursor-pointer`}
            onClick={() => setTabs("orders")}
          >
            <Handbag size={18} />
            <span className="font-medium">My Orders</span>
          </li>

          <li
            className={`flex items-center gap-3 p-3 ${tab === "returns" ? "bg-slate-100" : "hover:bg-slate-100"} hover:bg-slate-100 rounded cursor-pointer`}
            onClick={() => setTabs("returns")}
          >
            <RefreshCcw size={18} />
            <span className="font-medium">Returns & Cancel</span>
          </li>

          {/* <li
            className={`flex items-center gap-3 p-3 ${tab === "wishlist" ? "bg-slate-100" : "hover:bg-slate-100"} hover:bg-slate-100 rounded cursor-pointer`}
            onClick={() => setTabs("wishlist")}
          >
            <Heart size={18} />
            <span className="font-medium">My Wishlist</span>
          </li> */}

          <li
            className={`flex items-center gap-3 p-3 ${tab === "payment" ? "bg-slate-100" : "hover:bg-slate-100"} hover:bg-slate-100 rounded cursor-pointer`}
            onClick={() => setTabs("payment")}
          >
            <WalletCards size={18} />
            <span className="font-medium">Payment</span>
          </li>

          <li className="p-3 bg-[#ff0000b4]/70 rounded cursor-pointer">
            <button
              className="flex items-center gap-3"
              onClick={() => dispatch(logoutUserAsyncThunk())}
            >
              <LogOut size={18} color="white" />
              <span className="font-medium text-white">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="col-span-9 bg-white rounded-lg overflow-hidden">
        {tab === "profile" && <div className="border">
          
        </div>}
      </div>
    </div>
  );
}
