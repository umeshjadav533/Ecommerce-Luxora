export default function ProfilePage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle save logic here
  };
  return (
    <div className="mt-[85px] w-[50%] bg-white mx-auto p-5 mb-5">
      <form
        onSubmit={handleSubmit}
        className="md:col-span-2 space-y-6 rounded-lg p-6"
      >
        {/* Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="text-sm text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="w-full mt-1 bg-[#F9FAFB] p-3 rounded-lg outline-none"
            />
          </div>

          <div className="w-full">
            <label className="text-sm text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="w-full mt-1 bg-[#F9FAFB] p-3 rounded-lg outline-none"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Gender</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                className="accent-black"
              />
              Male
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                className="accent-black"
              />
              Female
            </label>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className="w-full mt-1 bg-[#F9FAFB] p-3 rounded-lg outline-none"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm text-gray-600">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="+91 XXXXX XXXXX"
            className="w-full mt-1 bg-[#F9FAFB] p-3 rounded-lg outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="text-red-600 border border-red-500 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}
