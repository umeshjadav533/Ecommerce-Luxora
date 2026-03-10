import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAsyncThunk } from "../features/products/productAPI";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.singleProduct);

  useEffect(() => {
    dispatch(getSingleProductAsyncThunk({ id }));
  }, [dispatch, id]);

  return (
    <div className="p-3 mt-20">
      <div className="grid grid-cols-10 gap-5">
        {/* images section */}
        <div className="col-span-6 h-165 p-2 overflow-hidden flex flex-col gap-2">
          <div className="h-135.5 flex gap-2">
            {/* Left images */}
            <ul className="w-[10%] flex flex-col gap-2 overflow-hidden">
              {product?.variants?.[0]?.images.slice(0, 5).map((img) => (
                <li>
                  <img
                    src={img}
                    className="w-full h-full object-contain bg-white rounded-xl"
                    alt=""
                  />
                </li>
              ))}
            </ul>

            {/* main image */}
            <div className="w-[90%] overflow-hidden flex justify-center items-center">
              <img
                src={product?.variants?.[0]?.images[0]}
                alt=""
                className="w-full h-full object-contain bg-white rounded-xl"
              />
            </div>
          </div>

          {/* right images */}
          <ul className="h-25.5 w-full overflow-hidden flex border gap-2">
            {product?.variants?.[0]?.images.slice(0, 5).map((img) => (
              <li>
                <img
                  src={img}
                  className="w-full h-full object-contain bg-white rounded-xl "
                  alt=""
                />
              </li>
            ))}
            {product?.variants?.[0]?.images.slice(0, 5).map((img) => (
                <li>
                  <img
                    src={img}
                    className="w-full h-full object-contain bg-white rounded-xl"
                    alt=""
                  />
                </li>
              ))}
              
          </ul>
        </div>

        {/* product detail section */}
        <div className="col-span-4 bg-white rounded-2xl overflow-hidden"></div>
      </div>
    </div>
  );
}
