import React from "react";

interface Props {
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const Toolbar: React.FC<Props> = ({ onEdit, onSave, onCancel, isEditing }) => {
  return (
    <div
      className="
        flex flex-col space-y-4 mb-8
        sm:flex-row sm:space-y-0 sm:space-x-4
        justify-center items-center
      "
    >
      <button
        onClick={onEdit}
        className="px-4 py-2 w-full sm:w-auto bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
      >
        Start Editing
      </button>
      <button
        onClick={onSave}
        disabled={!isEditing}
        className="px-4 py-2 w-full sm:w-auto bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-md
          disabled:bg-green-300 disabled:cursor-not-allowed"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        disabled={!isEditing}
        className="px-4 py-2 w-full sm:w-auto bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md
          disabled:bg-red-300 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
    </div>
  );
};

export default Toolbar;
