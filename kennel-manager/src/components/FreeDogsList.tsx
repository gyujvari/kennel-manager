import React from "react";
import { Dog } from "../types";
import DogComponent from "./Dog";

interface Props {
  dogs: Dog[];
}

const FreeDogsList: React.FC<Props> = ({ dogs }) => {
  return (
    <div className="free-dogs">
      <h3>Unassigned Dogs</h3>
      {dogs.length === 0 ? (
        <p>No free dogs.</p>
      ) : (
        dogs.map((dog) => <DogComponent key={dog.id} dog={dog} />)
      )}
    </div>
  );
};

export default FreeDogsList;
