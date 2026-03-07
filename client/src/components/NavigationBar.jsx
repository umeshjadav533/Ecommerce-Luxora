import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import { navbarData } from "../assets/assets";
import { Heart, Search, ShoppingBag, SunMedium, User } from "lucide-react";

export default function NavigationBar() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScroll(currentScroll);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div className={`w-[96.5%] h-12 z-50 fixed top-6 left-1/2 -translate-x-1/2 bg-white px-5 flex justify-between items-center rounded-xl transition-transform duration-300 shadow ${show ? "translate-y-0" : "-translate-y-30"}`}>
      {/* Left logo */}
      <div>
        <Link to="/">
          <h1 className="roker-font text-2xl">Luxora</h1>
        </Link>
      </div>

      {/* center Links */}
      <ul className="flex gap-5 h-full">
        {navbarData.map((item, index) => (
          <li key={index} className="h-full flex items-center">
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `relative h-full text-sm flex items-center px-2 transition font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:bg-pink-600 after:transition-all after:duration-300 after:rounded-t-lg hover:after:w-full ${isActive ? "text-pink-600 after:w-full" : "text-gray-700"}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Side Links */}
      <ul className="flex justify-center items-center gap-5">
        <li className="cursor-pointer">
          <Search size={20} />
        </li>
        <li className="cursor-pointer">
          <SunMedium size={20} />
        </li>
        <li>
          <Link to="/register">
            <User size={20} />
          </Link>
        </li>
        <li>
          <Link to="/favourites">
            <Heart size={20} />
          </Link>
        </li>
        <li className="flex justify-center items-center">
          <button className="cursor-pointer relative">
            <span><ShoppingBag size={20} /></span>
            <span className="absolute -bottom-2 bg-black text-white rounded-full px-1 text-xs outfit-font">
              {/* {totalCartProducts.length} */}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
