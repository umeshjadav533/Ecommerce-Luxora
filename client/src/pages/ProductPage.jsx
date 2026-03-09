import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getSingleProductAsyncThunk } from "../features/products/productAPI";
import { useParams, useSearchParams } from "react-router-dom";

export default function ProductPage () {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.singleProduct);
  useEffect(() => {
    dispatch(getSingleProductAsyncThunk({ id }));
  },[])
  console.log(product);
  return (
    <div className="p-3 grid grid-cols-2 gap-5 mt-20">
      <div className="h-100 flex items-center gap-2 border rounded-2xl overflow-hidden p-2">
        <ul className="w-[10%] grid grid-rows-10 gap-2">
          {product?.variants[0]?.images.map((image) => (
            <img src={image} alt="" className="w-full h-full object-contain border bg-white" key={image} /> 
          ))}
        </ul>
        <div className="w-[90%] ">
          <img src={product?.variants[0]?.images[0]} alt="" className="w-full h-full object-contain border bg-white" /> 
        </div>
      </div>
      <div></div>
    </div>
  )
}
