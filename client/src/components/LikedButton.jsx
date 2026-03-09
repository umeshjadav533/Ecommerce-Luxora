import { Heart } from "lucide-react";

export default function LikedButton({id, size = null, variant = null}){
    return (
        <button className="bg-[#ECE9E2] p-1.5 rounded-full overflow-hidden cursor-pointer group">
            <Heart className="w-5 h-5 text-blue-950 group-hover:fill-black" />
        </button>
    )
}