import React from "react";

interface Props {
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const Toolbar: React.FC<Props> = ({ onEdit, onSave, onCancel }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Start Editing
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Cancel
      </button>
    </div>
  );
};
export default Toolbar;
