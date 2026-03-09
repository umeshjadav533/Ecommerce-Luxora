import { Search } from "lucide-react";
import ProductSlider from "../components/ProductSlider";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

export default function SearchPage() {
    const { products } = useSelector(state => state.product);
    return (
        <div className="w-full p-3">
            <div className="h-[30vh] flex justify-center items-end p-5">
                <form className="flex justify-between items-center border-b">
                    <input type="text" placeholder="What are you looking for?" className="outline-none  w-100 py-2 px-2" />
                    <span className="cursor-pointer"><Search size={20} /></span>
                </form>
            </div>

            <div className="grid grid-cols-4 gap-3">
                {products.map((product) => (
                    <ProductCard product={product} key={product._id}/>
                ))}  
            </div>
        </div>
    )
}