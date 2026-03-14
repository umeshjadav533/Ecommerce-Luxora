import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { kidsPageMenu, menPageMenu, womenPageMenu } from "../assets/assets";
import { Handbag, Heart, Search, SunMedium, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../features/cart/cartSlice.js";

export default function NavigationBar() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [hoverLink, setHoverLink] = useState(false);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      id="navbar"
      className={`w-[96.5%] h-12 z-50 fixed top-6 left-1/2 -translate-x-1/2 bg-white px-5 flex justify-between items-center transition-transform duration-300 shadow ${show ? "translate-y-0" : "-translate-y-30"} ${hoverLink ? "rounded-t-xl rounded-b-none" : "rounded-xl"}`}
    >
      {/* Left logo */}
      <div>
        <Link to="/">
          <h1 className="text-2xl molle-regular-italic">Luxora</h1>
        </Link>
      </div>

      {/* center Links */}
      <ul
        className="flex gap-5 h-full"
        id="navbar-links"
        onMouseEnter={() => setHoverLink(true)}
        onMouseLeave={() => setHoverLink(false)}
      >
        {/* MEN */}
        <li className="men-nav-item h-full flex items-center">
          <NavLink
            to="/men"
            className={({ isActive }) =>
              `relative h-full text-sm flex items-center px-2 transition after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:bg-pink-600 after:transition-all after:duration-300 after:rounded-t-lg hover:after:w-full ${isActive ? "text-pink-600 after:w-full" : "text-gray-700"}`
            }
            style={{ fontWeight: 700 }}
          >
            MEN
          </NavLink>

          <div
            className="men-menu-section p-6 absolute top-12 left-0 w-full grid grid-cols-5 gap-11 bg-linear-to-b from-[#F5F3EE] to-[#ECE9E2] rounded-b-xl border border-[#d6d3cb] shadow-lg">
            {menPageMenu.map((menu, index) => (
              <div key={index}>
                <span
                  className={`text-xl ${index === 0 ? "text-[#C3975F]" : "block w-full border-b-3 border-black pb-2"}`}
                >
                  {menu.title}
                </span>
                <ul className={`flex flex-col gap-2 my-3`}>
                  {menu.items.map((item, i) => (
                    <li
                      key={i}
                      className={
                        index === 0 ? "text-lg font-medium" : "font-light"
                      }
                    >
                      <Link
                        to={item.link}
                        className="hover:underline underline-offset-5 text-gray-600 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </li>

        {/* WOMEN */}
        <li className="women-nav-item">
          <NavLink
            to="/women"
            className={({ isActive }) =>
              `relative h-full text-sm flex items-center px-2 transition after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:bg-pink-600 after:transition-all after:duration-300 after:rounded-t-lg hover:after:w-full ${isActive ? "text-pink-600 after:w-full" : "text-gray-700"}`
            }
            style={{ fontWeight: 700 }}
          >
            WOMEN
          </NavLink>

          <div
            className="women-menu-section p-6 absolute top-12 left-0 w-full grid grid-cols-5 gap-11 bg-linear-to-b from-[#F5F3EE] to-[#ECE9E2] rounded-b-xl border border-[#d6d3cb] shadow-lg">
            {womenPageMenu.map((menu, index) => (
              <div key={index}>
                <span
                  className={`text-xl ${index === 0 ? "text-[#C3975F]" : "block w-full border-b-3 border-black pb-2"}`}
                >
                  {menu.title}
                </span>
                <ul className={`flex flex-col gap-2 my-3`}>
                  {menu.items.map((item, i) => (
                    <li
                      key={i}
                      className={
                        index === 0 ? "text-lg font-medium" : "font-light"
                      }
                    >
                      <Link
                        to={item.link}
                        className="hover:underline underline-offset-5 text-gray-600 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </li>

        {/* KIDS */}
        <li className="kids-nav-item">
          <NavLink
            to="/kids"
            className={({ isActive }) =>
              `relative h-full text-sm flex items-center px-2 transition after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:bg-pink-600 after:transition-all after:duration-300 after:rounded-t-lg hover:after:w-full ${isActive ? "text-pink-600 after:w-full" : "text-gray-700"}`
            }
            style={{ fontWeight: 700 }}
          >
            KIDS
          </NavLink>

          <div
            className="kids-menu-section p-6 absolute top-12 left-0 w-full grid grid-cols-5 gap-11 bg-linear-to-b from-[#F5F3EE] to-[#ECE9E2] rounded-b-xl border border-[#d6d3cb] shadow-lg">
            {kidsPageMenu.map((menu, index) => (
              <div key={index}>
                <span
                  className={`text-xl ${index === 0 ? "text-[#C3975F]" : "block w-full border-b-3 border-black pb-2"}`}
                >
                  {menu.title}
                </span>
                <ul className={`flex flex-col gap-2 my-3`}>
                  {menu.items.map((item, i) => (
                    <li
                      key={i}
                      className={
                        index === 0 ? "text-lg font-medium" : "font-light"
                      }
                    >
                      <Link
                        to={item.link}
                        className="hover:underline underline-offset-5 text-gray-600 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </li>
      </ul>

      {/* Right Side Links */}
      <ul className="flex justify-center items-center gap-5">
        <li className="cursor-pointer">
          <Link to="/search">
            <Search size={20} />
          </Link>
        </li>
        <li className="cursor-pointer">
          <SunMedium size={20} />
        </li>
        <li>
          <Link to="/account">
            <User size={20} />
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <Heart size={20} />
          </Link>
        </li>
        <li className="flex justify-center items-center">
          <button
            onClick={() => dispatch(toggleCart())}
            className="cursor-pointer relative"
          >
            <span>
              <Handbag  size={20} />
            </span>
            <span className="absolute -bottom-2 bg-black text-white rounded-full px-1 text-xs outfit-font">
              {cartProducts.length}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
