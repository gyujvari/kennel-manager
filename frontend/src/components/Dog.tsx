import React from "react";
import { Dog as DogType } from "../types";

interface Props {
  dog: DogType;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, dogId: string) => void;
}

const Dog: React.FC<Props> = ({ dog, draggable = false, onDragStart }) => {
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => onDragStart && onDragStart(e, dog.id)}
      className="bg-white border border-gray-300 rounded-md p-2 mb-2 cursor-grab select-none shadow-sm hover:shadow-md"
    >
      {dog.name} <span className="text-gray-500">(chip: {dog.chipNumber})</span>
    </div>
  );
};

export default Dog;
