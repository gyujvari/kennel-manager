import React from "react";
import { Kennel as KennelType } from "../types";
import Dog from "./Dog";

interface Props {
  kennel: KennelType;
}

const Kennel: React.FC<Props> = ({ kennel }) => {
  return (
    <div className="bg-white border border-gray-400 rounded-lg p-4 flex flex-col shadow-sm">
      <h3 className="text-lg font-bold mb-4">{kennel.name}</h3>
      <div className="flex flex-col space-y-2 flex-grow overflow-auto min-h-[100px]">
        {kennel.dogs.length === 0 ? (
          <p className="text-gray-400 italic">No dogs.</p>
        ) : (
          kennel.dogs.map((dog) => <Dog key={dog.id} dog={dog} />)
        )}
      </div>
    </div>
  );
};

export default Kennel;
