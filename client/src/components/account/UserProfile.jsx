import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditableField from "../EditableField";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAsyncThunk,
  userProfileAsyncThunk,
} from "../../features/auth/authAPI.js";
import { toast } from "react-toastify";

export default function UserProfile() {
  const profile = useSelector((state) => state.auth.user);
  console.log(profile);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      phone: profile.phoneNumber,
      address: profile.address[0],
    },
  });
  const dispatch = useDispatch();

  const [editField, setEditField] = useState("");

  const submitForm = async (data) => {
    try {
      await dispatch(updateUserAsyncThunk(data));
      setEditField("");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <label htmlFor="profilePic">
            <img
              src="./logo.png"
              alt="profile"
              className="w-24 h-24 rounded-full object-cover cursor-pointer bg-gray-100"
            />
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="flex gap-5">
          <EditableField
            label="First Name"
            name="first_name"
            register={register}
            editField={editField}
            setEditField={setEditField}
          />

          <EditableField
            label="Last Name"
            name="last_name"
            register={register}
            editField={editField}
            setEditField={setEditField}
          />
        </div>

        <EditableField
          label="Email"
          name="email"
          register={register}
          editField={editField}
          setEditField={setEditField}
        />

        <EditableField
          label="Phone"
          name="phone"
          register={register}
          editField={editField}
          setEditField={setEditField}
        />

        <EditableField
          label="Address"
          name="address"
          register={register}
          editField={editField}
          setEditField={setEditField}
          textarea
        />
      </form>
    </div>
  );
}
