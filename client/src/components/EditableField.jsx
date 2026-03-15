import { SquarePen } from "lucide-react";

export default function EditableField({
  label,
  name,
  register,
  editField,
  setEditField,
  textarea = false,
}) {
  const isEditing = editField === name;

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">{label}</label>

      <div
        className={`flex items-center justify-between px-3 rounded-lg
        ${
          editField === name
            ? "bg-blue-50 outline-2 outline-offset-4 outline-blue-400"
            : "bg-gray-50 border border-gray-200"
        }`}
      >
        {textarea ? (
          <textarea
            {...register(name)}
            readOnly={!isEditing}
            className="w-full p-2 bg-transparent outline-none resize-none"
          />
        ) : (
          <input
            {...register(name)}
            readOnly={!isEditing}
            type="text"
            className="w-full p-2 bg-transparent outline-none"
          />
        )}

        {!isEditing && (
          <button
            type="button"
            onClick={() => setEditField(name)}
            className="text-gray-500 hover:text-blue-500 cursor-pointer"
          >
            <SquarePen size={18} />
          </button>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-3 mt-1">
          <button
            type="button"
            onClick={() => setEditField("")}
            className="cursor-pointer px-4 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer px-4 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
