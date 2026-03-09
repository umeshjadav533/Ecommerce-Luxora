import { useEffect } from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { footerData } from "../assets/assets";

const Footer = () => {
  return (
    <div className="w-full bg-[#000000] p-5 text-white">
      <div className="w-full grid grid-cols-4 gap-5">
        {/* section 1 */}
        <div className="flex flex-col gap-10">
          <div>
            <Link to="/" className="roker-font text-3xl text-white select-none">
              Luxora
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <b>Subscribe to our emails</b>
            <div className="flex justify-between items-center bg-white px-4">
              <input type="text" className="outline-none pr-2 py-1.5 text-black" placeholder="Email Address"/>
              <button className="text-black">SIGN UP</button>
            </div>
          </div>

          {/* social media icon */}
          <div className="flex gap-2">
            <Link
              to="/"
              className="border border-white rounded-full p-2 hover:bg-white hover:text-black"
            >
              <Facebook size={30} />
            </Link>

            <Link
              to="/"
              className="border border-white rounded-full p-2 hover:bg-white hover:text-black"
            >
              <Instagram size={30} />
            </Link>

            <Link
              to="/"
              className="border border-white rounded-full p-2 hover:bg-white hover:text-black"
            >
              <Twitter size={30} />
            </Link>

            <Link
              to="/"
              className="border border-white rounded-full p-2 hover:bg-white hover:text-black"
            >
              <Youtube size={30} />
            </Link>
          </div>
        </div>

        {/* section 2 */}
        <div className="flex flex-col gap-4">
          <b className="mb-4">{footerData?.[0]?.title || ""}</b>

          {footerData?.[0]?.links_data?.map((data, index) => (
            <Link
              to={data.link_url || "/"}
              key={index}
              className="text-sm hover:underline underline-offset-4"
            >
              {data.link_name}
            </Link>
          ))}
        </div>

        {/* section 3 */}
        <div className="flex flex-col gap-4">
          <b className="mb-4">{footerData?.[1]?.title || ""}</b>

          {footerData?.[1]?.links_data?.map((data, index) => (
            <Link
              to={data.link_url || "/"}
              key={index}
              className="text-sm hover:underline underline-offset-4"
            >
              {data.link_name}
            </Link>
          ))}
        </div>

        {/* section 4 */}
        <div className="flex flex-col gap-4">
          <b className="mb-4">{footerData?.[2]?.title || ""}</b>

          {footerData?.[2]?.links_data?.map((data, index) => (
            <Link
              to={data.link_url || "/"}
              key={index}
              className="text-sm hover:underline underline-offset-4"
            >
              {data.link_name}
            </Link>
          ))}
        </div>
      </div>

      <hr className="my-5" />

      {/* bottom links */}
      <div className="flex justify-evenly flex-wrap gap-3">
        {footerData?.[3]?.links_data?.map((data, index) => (
          <Link
            to={data.link_url || "/"}
            key={index}
            className="text-sm hover:underline underline-offset-4"
          >
            {data.link_name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;