import React from "react";
import { Dog as DogType } from "../types";

interface Props {
  dog: DogType;
}

const Dog: React.FC<Props> = ({ dog }) => {
  return (
    <div className="dog">
      {dog.name} (chip: {dog.chipNumber})
    </div>
  );
};

export default Dog;
