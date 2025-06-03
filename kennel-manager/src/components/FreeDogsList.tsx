import React from "react";
import { Dog } from "../types";
import DogComponent from "./Dog";

interface Props {
  dogs: Dog[];
}

const FreeDogsList: React.FC<Props> = ({ dogs }) => {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-md p-4 w-full max-w-md">
      <h3 className="text-xl font-semibold mb-3">Unassigned Dogs</h3>
      {dogs.length === 0 ? (
        <p className="text-gray-500 italic">No free dogs.</p>
      ) : (
        <div className="max-h-64 overflow-y-auto">
          {dogs.map((dog) => (
            <DogComponent key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FreeDogsList;
