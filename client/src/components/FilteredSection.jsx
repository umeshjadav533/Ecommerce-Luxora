import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchProductsFilterAsyncThunk } from "../features/products/productAPI";
import capitalizeWords from "../utils/capitalizeWords";

export default function FilteredSection() {
  const { brands, categories, subCategories, tags } = useSelector(
    (state) => state.product.searchProductsFilter
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSearchProductsFilterAsyncThunk());
  }, []);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(location.search);

    let values = params.get(key)?.split(",") || [];

    if (values.includes(value)) {
      values = values.filter((v) => v !== value);
    } else {
      values.push(value);
    }

    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }

    params.set("page", 1);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {/* CATEGORY */}
      <ul className="flex flex-col">
        <li>
          <h1 className="text-xl font-medium">CATEGORY</h1>
        </li>

        {categories.map((category) => (
          <li key={category} className="px-5">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={() =>
                  updateFilter("category", encodeURIComponent(category))
                }
              />

              {capitalizeWords(category)}
            </label>
          </li>
        ))}
      </ul>

      {/* BRAND */}
      <ul className="flex flex-col">
        <li>
          <h1 className="text-xl font-medium">BRANDS</h1>
        </li>

        {brands.map((brand) => (
          <li key={brand} className="px-5">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={() =>
                  updateFilter("brand", encodeURIComponent(brand))
                }
              />

              {capitalizeWords(brand)}
            </label>
          </li>
        ))}
      </ul>

      {/* SUB CATEGORY */}
      <ul className="flex flex-col">
        <li>
          <h1 className="text-xl font-medium">SUB CATEGORY</h1>
        </li>

        {subCategories.map((subCategory) => (
          <li key={subCategory} className="px-5">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={() =>
                  updateFilter(
                    "subCategory",
                    encodeURIComponent(subCategory)
                  )
                }
              />

              {capitalizeWords(subCategory)}
            </label>
          </li>
        ))}
      </ul>

      {/* TAG */}
      <ul className="flex flex-col">
        <li>
          <h1 className="text-xl font-medium">TAG</h1>
        </li>

        {tags.map((tag) => (
          <li key={tag} className="px-5">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={() =>
                  updateFilter("tags", encodeURIComponent(tag))
                }
              />

              {capitalizeWords(tag)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}