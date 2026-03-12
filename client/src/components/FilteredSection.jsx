import { useState } from "react"
import { useDispatch } from "react-redux";
import { getAllProductsAsyncThunk } from "../features/products/productAPI.js";

export default function FilteredSection({ products }) {
    
  return (
    <div className="p-5 bg-white">
      {/* GENDERS */}
      <ul>
        <li>
            <h3 className="font-bold">GENDER</h3>
        </li>
        {["MEN", "WOMEN"].map((gender) => (
            <li className="">
                <label key={gender} className="flex gap-2" onChange={() => {
                    dispatch(getAllProductsAsyncThunk({
                        query: gender,
                        page: 1,
                        limit: 5
                    }))
                }}>
                    <input type="checkbox" className="" />
                    {gender}
                </label>
            </li>
        ))}
      </ul>

      {/* BRANDS */}
      <ul>
        <li>
            <h3 className="font-bold">BRANDS</h3>
        </li>
        <li></li>
      </ul>
    </div>
  )
}