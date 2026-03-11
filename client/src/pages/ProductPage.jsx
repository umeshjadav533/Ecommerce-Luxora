import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAsyncThunk,
  getSingleProductAsyncThunk,
} from "../features/products/productAPI";
import { useParams } from "react-router-dom";
import capitalizeWords from "../utils/capitalizeWords.js";
import { Minus, Plus, Star } from "lucide-react";
import calculatePrice from "../utils/priceUtil.js";
import ProductCard from "../components/ProductCard.jsx";
import Rating from "../components/Rating.jsx";
import { addCartProductAsyncThunk } from "../features/cart/cartAPI.js";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.singleProduct);
  const relatedProducts = useSelector((state) => state.product.products);

  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    dispatch(getSingleProductAsyncThunk({ id }));
    if (product) {
      dispatch(getAllProductsAsyncThunk({ query: product.subCategory }));
    }
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

  const images = selectedVariant?.images || [];
  const leftImages = images.slice(0, 5);
  const bottomImages = images.length > 5 ? images.slice(5) : [];

  return (
    <div className="p-3 mt-20">
      <div className="grid grid-cols-10 gap-5">
        {/* images section */}
        <div className="col-span-6 h-162.5 flex flex-col gap-2 sticky top-5">
          {/* Top Section */}
          <div className="flex flex-1 gap-2 overflow-hidden">
            {/* Left thumbnails */}
            <ul className="w-22.5 flex flex-col gap-2 overflow-hidden">
              {leftImages.map((img, i) => (
                <li key={i} className="h-20">
                  <img
                    src={img}
                    onClick={() => setImage(img)}
                    className={`w-full h-full object-contain bg-[#E0DACF] rounded-lg cursor-pointer ${image === img ? "bg-transparent border-2" : ""}`}
                  />
                </li>
              ))}
            </ul>

            {/* Main image */}
            <div className="flex-1 bg-[#E0DACF] rounded-xl flex items-center justify-center overflow-hidden">
              {image && (
                <img src={image} className="w-full h-full object-contain" />
              )}
            </div>
          </div>

          {/* Bottom thumbnails */}
          {bottomImages.length > 0 && (
            <ul className="grid grid-cols-6 gap-2 h-25">
              {bottomImages.map((img, i) => (
                <li key={i}>
                  <img
                    src={img}
                    onClick={() => setImage(img)}
                    className="w-full h-full object-contain bg-[#E0DACF] rounded-lg cursor-pointer"
                  />
                </li>
              ))}
            </ul>
          )}
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

          {/* rating and discount */}
          <ul className="flex items-center gap-2">
            <li>
              <Rating rating={product?.rating} />
            </li>
            {selectedVariant?.discountPercentage && (
              <li className="text-xl text-[#ece90e]">
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
                    // className="bg-[#E0DACF] cursor-pointer rounded-lg"
                    className={`bg-[#E0DACF] cursor-pointer rounded-lg ${selectedColor === variant.color ? "border-2" : ""}`}
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

          {/* add to cart button */}
          <button
            className="bg-black py-3 rounded-full text-white flex justify-center items-center gap-2 text-sm cursor-pointer hover:opacity-90"
            onClick={() => {
              dispatch(
                addCartProductAsyncThunk({
                  id: product._id,
                  size: selectedSize || null,
                  variant: selectedColor || null,
                  quantity: Number(1),
                }),
              );
            }}
          >
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

      <div className="my-15">
        <h1 className="text-3xl premium-cursive my-10">Related Products</h1>
        <ul className="grid grid-cols-4 gap-3">
          {relatedProducts.map((product, index) => (
            <li>
              <ProductCard product={product} key={index} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="premium-cursive text-3xl my-10 text-center">
          Image Gallery
        </h1>
        <ul className="grid grid-cols-2 gap-3">
          {selectedVariant?.images.map((img) => (
            <li key={img}>
              <img
                src={img}
                className="bg-[#E0DACF] w-full h-screen object-contain rounded-2xl"
                alt=""
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
