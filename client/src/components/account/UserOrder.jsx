import { Link } from "react-router-dom";
import OrderCard from "../OrderCard";

export default function UserOrder(){
    return (
        <div className="p-6">
            <div className="flex justify-between items-center bg-gray-100 rounded-l-lg overflow-hidden my-5">
                <input type="search" placeholder="Search Order" className="p-2 w-full outline-none"/>
                <button className="bg-blue-400 py-2 px-4 text-white">Submit</button>
            </div>

            <div className="">
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>
        </div>
    )
}