import React from "react";
import { Kennel as KennelType } from "../types";
import Dog from "./Dog";

interface Props {
  kennel: KennelType;
}

const Kennel: React.FC<Props> = ({ kennel }) => {
  return (
    <div className="kennel">
      <h3>{kennel.name}</h3>
      <div className="dogs">
        {kennel.dogs.length === 0 && <p>No dogs.</p>}
        {kennel.dogs.map((dog) => (
          <Dog key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
};

export default Kennel;
