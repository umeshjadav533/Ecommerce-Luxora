import { Link } from "react-router-dom";

export default function OrderCard() {
  return (
    <div className="grid grid-cols-12 border border-gray-200 rounded-md my-2">
      <div className="col-span-1">
        <Link to={`/product`}>
          <img src="https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197853/menShirt_2_1_iqkgpn.png" />
        </Link>
      </div>
      <div className="col-span-5 p-2">
        <p className="text-justify">REGULAR FIT PLAIN SHIRT</p>
        <p>color: black</p>
      </div>
      <div className="col-span-1 text-center p-2">
        <span>$</span>
        <span>399</span>
      </div>
      <div className="col-span-5 p-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-full bg-green-400"></span>
          <p>Deliveredn on Mar 16</p>
        </div>
        <small>Your order was cancelled as per your request</small>
      </div>
    </div>
  );
}
