import React, { useState } from "react";
import "./App.css";
import { KennelData, Dog } from "./types";
import Kennel from "./components/Kennel";
import Toolbar from "./components/Toolbar";
import FreeDogsList from "./components/FreeDogsList";
import initialData from "./data/initialData.json";

function App() {
  const [kennelData, setKennelData] = useState<KennelData>(initialData);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    dogId: number
  ) => {
    e.dataTransfer.setData("text/plain", dogId.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDropToKennel = (dogId: number, kennelId: number) => {
    setKennelData((prev) => {
      let movedDog: Dog | undefined;

      const newKennels = prev.kennels.map((kennel) => {
        const filteredDogs = kennel.dogs.filter((dog) => {
          if (dog.id === dogId) {
            movedDog = dog;
            return false;
          }
          return true;
        });
        return { ...kennel, dogs: filteredDogs };
      });

      let newFreeDogs = prev.freeDogs.filter((dog) => {
        if (dog.id === dogId) {
          movedDog = dog;
          return false;
        }
        return true;
      });

      if (!movedDog) return prev;

      const kennelsUpdated = newKennels.map((kennel) => {
        if (kennel.id === kennelId) {
          return { ...kennel, dogs: [...kennel.dogs, movedDog!] };
        }
        return kennel;
      });

      return {
        ...prev,
        kennels: kennelsUpdated,
        freeDogs: newFreeDogs,
      };
    });
  };

  const handleDropToFreeDogs = (dogId: number) => {
    setKennelData((prev) => {
      let movedDog: Dog | undefined;

      const newKennels = prev.kennels.map((kennel) => {
        const filteredDogs = kennel.dogs.filter((dog) => {
          if (dog.id === dogId) {
            movedDog = dog;
            return false;
          }
          return true;
        });
        return { ...kennel, dogs: filteredDogs };
      });

      if (!movedDog) return prev;

      return {
        ...prev,
        kennels: newKennels,
        freeDogs: [...prev.freeDogs, movedDog],
      };
    });
  };

  const startEdit = () => {
    console.log("Editing started");
  };

  const saveEdit = () => {
    console.log("Saved");
  };

  const cancelEdit = () => {
    console.log("Cancelled");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dog Kennel Manager
      </h1>

      <Toolbar onEdit={startEdit} onSave={saveEdit} onCancel={cancelEdit} />

      <div className="kennel-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {kennelData.kennels.map((kennel) => (
          <Kennel
            key={kennel.id}
            kennel={kennel}
            onDropDog={handleDropToKennel}
            onDragStartDog={handleDragStart}
            onDragOver={(e) => e.preventDefault()}
          />
        ))}
      </div>

      <FreeDogsList
        dogs={kennelData.freeDogs}
        onDropDog={handleDropToFreeDogs}
        onDragStartDog={handleDragStart}
      />
    </div>
  );
}

export default App;
