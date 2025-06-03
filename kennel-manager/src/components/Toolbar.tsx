import React from "react";

interface Props {
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const Toolbar: React.FC<Props> = ({ onEdit, onSave, onCancel }) => {
  return (
    <div className="toolbar">
      <button onClick={onEdit}>Start Editing</button>
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default Toolbar;
