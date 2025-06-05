import React, { useState, useEffect } from "react";
import "./App.css";
import { KennelData, Dog, Kennel } from "./types";
import KennelComponent from "./components/Kennel/Kennel";
import Toolbar from "./components/Toolbar/Toolbar";
import FreeDogsList from "./components/FreeDogs/FreeDogsList";
import { useDragDrop } from "./hooks/useDragDrop";
import { Toaster } from "react-hot-toast";
import { fetchDogs, fetchKennels, updateDogKennel } from "./services/api";

function App() {
  const [kennelData, setKennelData] = useState<KennelData>({
    kennels: [],
    freeDogs: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [backupData, setBackupData] = useState<KennelData | null>(null);
  const [loading, setLoading] = useState(true);

  const { handleDragStart, handleDropToKennel, handleDropToFreeDogs } =
    useDragDrop(kennelData, setKennelData, isEditing);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const kennels = await fetchKennels();
        const dogs = await fetchDogs();

        const kennelsWithDogs: Kennel[] = kennels.map((k) => ({
          ...k,
          dogs: [] as Dog[],
        }));

        const freeDogs: Dog[] = [];

        dogs.forEach((dog) => {
          if (dog.kennelId) {
            const kennel = kennelsWithDogs.find((k) => k.id === dog.kennelId);
            if (kennel) kennel.dogs.push(dog);
            else freeDogs.push(dog);
          } else {
            freeDogs.push(dog);
          }
        });

        setKennelData({ kennels: kennelsWithDogs, freeDogs });
      } catch (err) {
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const startEdit = () => {
    setIsEditing(true);
    setBackupData(kennelData);
  };

  const saveEdit = async () => {
    setIsEditing(false);
    setBackupData(null);

    try {
      for (const kennel of kennelData.kennels) {
        for (const dog of kennel.dogs) {
          await updateDogKennel(dog.id, kennel.id);
        }
      }

      for (const dog of kennelData.freeDogs) {
        await updateDogKennel(dog.id, null);
      }

      console.log("Changes saved to the backend!");
    } catch (err) {
      console.error("Failed to save changes:", err);
    }
  };

  const cancelEdit = () => {
    if (backupData) {
      setKennelData(backupData);
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-center mb-8">
        Dog Kennel Manager
      </h1>

      <Toolbar
        onEdit={startEdit}
        onSave={saveEdit}
        onCancel={cancelEdit}
        isEditing={isEditing}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-gray-600">Loading...</span>
        </div>
      ) : (
        <>
          <div className="kennel-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {kennelData.kennels.map((kennel) => (
              <KennelComponent
                key={kennel.id}
                kennel={kennel}
                onDropDog={handleDropToKennel}
                onDragStartDog={handleDragStart}
                onDragOver={(e) => e.preventDefault()}
                isEditing={isEditing}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <FreeDogsList
              dogs={kennelData.freeDogs}
              onDropDog={handleDropToFreeDogs}
              onDragStartDog={handleDragStart}
              isEditing={isEditing}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
