import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../components/HeroSection";
import { useEffect } from "react";
import { categoryListAsyncThunk } from "../features/category/categoryAPI";
import { Link } from "react-router-dom";
import NewArrival from "../components/NewArrival";
import BestSeller from "../components/BestSeller";

export default function HomePage() {
  const { categoryProductList } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoryListAsyncThunk());
  }, [dispatch]);
  return (
    <div className="p-3">
      <HeroSection />
      <ul className="grid grid-cols-4 gap-5 my-5">
        {categoryProductList?.slice(0, 8)?.map((item, index) => (
          <li
            key={index}
            className="group h-105 overflow-hidden rounded-2xl transition-all ease-in-out duration-700 hover:rounded-full relative bg-[#E8E8E1]"
          >
            <Link to={`/${item.slug}`} className="block w-full h-full">
              <img
                src={item.image}
                alt=""
                className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </Link>

            <button className="absolute left-1/2 bottom-5 -translate-x-1/2 px-6 py-1 hover:bg-white hover:text-black rounded-full text-white border-2 border-white font-bold transition-all duration-700 ease-in-out group-hover:bottom-1/2 group-hover:translate-y-1/2 text-sm">
              SHOP
            </button>
          </li>
        ))}
      </ul>

      <NewArrival />
      <BestSeller />
    </div>
  );
}
