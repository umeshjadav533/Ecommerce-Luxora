import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProductsAsyncThunk, getSingleProductAsyncThunk } from "../features/products/productAPI";
import { useParams } from "react-router-dom";
import capitalizeWords from "../utils/capitalizeWords.js";
import { Minus, Plus, Star } from "lucide-react";
import calculatePrice from "../utils/priceUtil.js";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.singleProduct);
  const relatedProducts = useSelector(state => state.product.relatedProducts);


  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getSingleProductAsyncThunk({ id }));
    dispatch(getRelatedProductsAsyncThunk({ id, limit: 4 }));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.variants?.length) {
      setImage(product.variants[0].images[0]);
      setSelectedColor(product.variants[0].color);
      setSelectedSize(product.variants[0].sizes[0].size);
    }
  }, [product]);

  const selectedVariant = product?.variants?.find(
    (v) => v.color === selectedColor,
  );

  console.log(relatedProducts);

  return (
    <div className="p-3 mt-20">
      <div className="grid grid-cols-10 gap-5">
        {/* images section */}
        <div className="col-span-6 h-157 overflow-hidden flex flex-col justify-center items-center gap-2">
          <div className="h-130 grid grid-cols-9 gap-2">
            {/* Left images */}
            <ul className="col-span-1 flex flex-col gap-2 overflow-hidden">
              {selectedVariant?.images?.slice(0, 5).map((img, i) => (
                <li key={i}>
                  <img
                    src={img}
                    className="w-full h-full object-contain bg-white rounded-xl cursor-pointer"
                    alt=""
                    onClick={() => setImage(img)}
                  />
                </li>
              ))}
            </ul>

            {/* main image */}
            <div className="col-span-8 overflow-hidden flex justify-center items-center">
              {image && (
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-contain bg-white rounded-xl"
                />
              )}
            </div>
          </div>

          {/* bottom images */}
          <ul className="h-25 w-full overflow-hidden grid grid-cols-9 gap-2">
            {selectedVariant?.images?.slice(0, 5).map((img, i) => (
              <li key={i}>
                <img
                  src={img}
                  className="w-full h-full object-contain bg-white rounded-xl cursor-pointer"
                  alt=""
                  onClick={() => setImage(img)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* product detail section */}
        <div className="col-span-4 bg-white rounded-2xl overflow-hidden p-4 flex flex-col gap-4">
          {/* title */}
          {product?.title && product?.brand && (
            <div>
              <span className="text-3xl font-bold">
                {capitalizeWords(product.title)}
              </span>
              <span> - </span>
              <span className="text-xl" style={{ fontWeight: 500 }}>
                ({capitalizeWords(product.brand)})
              </span>
            </div>
          )}

          {/* description */}
          {product?.description && (
            <p className="text-justify text-md">
              {capitalizeWords(product.description)}
            </p>
          )}

          {/* tags */}
          {product?.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {product.tags.map((tag, i) => (
                <li key={i}>
                  <span className="bg-red-400 px-3 py-1.5 rounded-lg text-white text-sm">
                    {capitalizeWords(tag)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* rating */}
          <ul className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <li key={index}>
                <Star className="text-black fill-black size-5" />
              </li>
            ))}
            <li>(450)</li>
            {selectedVariant?.discountPercentage && (
              <li className="text-xl text-slate-700/50">
                ({selectedVariant.discountPercentage}% OFF)
              </li>
            )}
          </ul>

          {/* price */}
          {selectedVariant?.mrpPrice && selectedVariant?.discountPercentage && (
            <div className="flex gap-2 items-end">
              <span className="text-black text-3xl font-medium">
                $
                {calculatePrice(
                  selectedVariant.mrpPrice,
                  selectedVariant.discountPercentage,
                )}
              </span>

              <span className="text-black text-xl line-through font-light">
                ${selectedVariant.mrpPrice}
              </span>
            </div>
          )}

          {/* color + stock */}
          <div className="flex gap-4">
            <p>
              <span className="text-xl font-medium">Color: </span>
              <span className="text-gray-700">
                {capitalizeWords(selectedColor)}
              </span>
            </p>

            {selectedVariant?.sizes[0].stock !== undefined && (
              <p>
                <span className="text-xl font-medium">Stock: </span>
                <span className="text-gray-700">
                  {selectedVariant?.sizes[0].stock}
                </span>
              </p>
            )}
          </div>

          {/* color variants */}
          {product?.variants?.length > 1 && (
            <ul className="grid grid-cols-6 gap-2">
              {product.variants.map((variant, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSelectedColor(variant.color);
                    setImage(variant.images[0]);
                  }}
                >
                  <img
                    src={variant.images[0]}
                    className="bg-white cursor-pointer rounded-lg"
                    alt=""
                  />
                </li>
              ))}
            </ul>
          )}

          {/* sizes */}
          <span className="text-xl underline underline-offset-3">Sizes</span>
          <ul className="grid grid-cols-7 gap-2">
            {selectedVariant?.sizes?.length > 0 &&
              selectedVariant.sizes.map((item, i) => (
                <li
                  key={item.size || i}
                  onClick={() => setSelectedSize(item.size)}
                  className={`text-center border border-slate-300 px-4 py-2 rounded-sm hover:bg-black hover:text-white cursor-pointer transition duration-300 ${selectedSize === item.size ? "bg-black text-white" : ""}`}
                >
                  {item.size.toUpperCase()}
                </li>
              ))}
          </ul>

          {/* <div className="grid grid-cols-10">
            <span className="border rounded-l-full hover:bg-gray-200 flex justify-center py-2">
              <Minus />
            </span>
            <span className="text-center">{quantity}</span>
            <span className="border rounded-r-md hover:bg-gray-200 flex justify-center">
              <Plus />
            </span>
          </div> */}

          {/* add to cart button */}
          <button className="bg-black py-3 rounded-full text-white flex justify-center items-center gap-2 text-sm cursor-pointer hover:opacity-90">
            <span>ADD TO CART</span>
            <span>-</span>
            <span>
              $
              {calculatePrice(
                selectedVariant?.mrpPrice,
                selectedVariant?.discountPercentage,
              )}
            </span>
          </button>
        </div>
      </div>


    </div>
  );
}
