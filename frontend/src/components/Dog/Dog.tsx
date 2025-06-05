import React from "react";
import { Dog as DogType } from "../../types";

interface Props {
  dog: DogType;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, dogId: string) => void;
  isEditing: boolean;
}

const Dog: React.FC<Props> = ({
  dog,
  draggable = false,
  onDragStart,
  isEditing,
}) => {
  return (
    <div
      draggable={isEditing ? draggable : false}
      onDragStart={(e) => isEditing && onDragStart && onDragStart(e, dog.id)}
      className={`
      bg-white border border-gray-300 rounded-lg p-2 flex items-center justify-between
      shadow-sm hover:shadow-md transition
      ${!isEditing ? "opacity-60 cursor-not-allowed" : "cursor-grab"}
    `}
    >
      <span className="font-medium">{dog.name}</span>
      <span className="text-gray-400 text-sm">(chip: {dog.chipNumber})</span>
    </div>
  );
};

export default Dog;
