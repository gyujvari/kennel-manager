import React from "react";
import { Dog } from "../../types";
import DogComponent from "../Dog/Dog";

interface Props {
  dogs: Dog[];
  onDropDog: (dogId: string) => void;
  onDragStartDog: (e: React.DragEvent<HTMLDivElement>, dogId: string) => void;
}

const FreeDogsList: React.FC<Props & { isEditing: boolean }> = ({
  dogs,
  onDropDog,
  onDragStartDog,
  isEditing,
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-4 w-full max-w-md shadow-md transition
      ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
      onDrop={(e) => {
        if (!isEditing) return;
        e.preventDefault();
        const dogId = e.dataTransfer.getData("text/plain");
        onDropDog(dogId);
      }}
      onDragOver={(e) => isEditing && e.preventDefault()}
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-3">
        Dogs without kennels.
      </h3>
      {dogs.length === 0 ? (
        <p className="text-gray-400 italic">No dogs.</p>
      ) : (
        <div className="max-h-64 overflow-y-auto space-y-2">
          {dogs.map((dog) => (
            <DogComponent
              isEditing={isEditing}
              key={dog.id}
              dog={dog}
              draggable={isEditing}
              onDragStart={onDragStartDog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FreeDogsList;
