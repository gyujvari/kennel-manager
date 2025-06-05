import React, { useState, useEffect } from "react";
import "./App.css";
import { KennelData, Dog, Kennel } from "./types";
import KennelComponent from "./components/Kennel";
import Toolbar from "./components/Toolbar";
import FreeDogsList from "./components/FreeDogsList";
import { useDragDrop } from "./hooks/useDragDrop";

function App() {
  const [kennelData, setKennelData] = useState<KennelData>({
    kennels: [],
    freeDogs: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [backupData, setBackupData] = useState<KennelData | null>(null);

  const API_BASE = "http://localhost:5000";

  const { handleDragStart, handleDropToKennel, handleDropToFreeDogs } =
    useDragDrop(kennelData, setKennelData, isEditing);

  useEffect(() => {
    async function fetchData() {
      try {
        // Lekérjük a kennels-t és a dogs-t az API-ból
        const kennelsRes = await fetch(`${API_BASE}/api/kennels`);
        const dogsRes = await fetch(`${API_BASE}/api/dogs`);

        const kennelsFromApi: { _id: string; name: string }[] =
          await kennelsRes.json();
        const dogsFromApi: {
          _id: string;
          name: string;
          chipNumber: string;
          kennelId?: string;
        }[] = await dogsRes.json();

        // Átalakítjuk a kennels adatot Kennel[]-re (minden kennelhez üres dogs tömb)
        const kennels: Kennel[] = kennelsFromApi.map((k) => ({
          id: k._id as unknown as string,
          name: k.name,
          dogs: [],
        }));

        const freeDogs: Dog[] = [];

        // Minden kutyát beosztunk kennelhez vagy szabad kutyákhoz
        dogsFromApi.forEach((dog) => {
          const dogObj: Dog = {
            id: dog._id,
            name: dog.name,
            chipNumber: dog.chipNumber,
          };

          if (dog.kennelId) {
            // string === string összehasonlítás
            const kennel = kennels.find((k) => k.id === dog.kennelId);
            if (kennel) kennel.dogs.push(dogObj);
            else freeDogs.push(dogObj);
          } else {
            freeDogs.push(dogObj);
          }
        });

        setKennelData({ kennels, freeDogs });
      } catch (err) {
        console.error("API fetch error:", err);
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
      // Végigmegyünk az összes kennel kutyáin
      for (const kennel of kennelData.kennels) {
        for (const dog of kennel.dogs) {
          await fetch(`${API_BASE}/api/dogs/${dog.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ kennelId: kennel.id }),
          });
        }
      }

      // Szabad kutyák kennelId-jét töröljük
      for (const dog of kennelData.freeDogs) {
        await fetch(`${API_BASE}/api/dogs/${dog.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ kennelId: null }),
        });
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
      <h1 className="text-3xl font-bold text-center mb-8">
        Dog Kennel Manager
      </h1>

      <Toolbar
        onEdit={startEdit}
        onSave={saveEdit}
        onCancel={cancelEdit}
        isEditing={isEditing}
      />

      <div className="kennel-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {kennelData.kennels.map((kennel: any) => (
          <KennelComponent
            key={kennel.id}
            kennel={kennel}
            onDropDog={handleDropToKennel}
            onDragStartDog={handleDragStart}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
              e.preventDefault()
            }
            isEditing={isEditing}
          />
        ))}
      </div>

      <FreeDogsList
        dogs={kennelData.freeDogs}
        onDropDog={handleDropToFreeDogs}
        onDragStartDog={handleDragStart}
        isEditing={isEditing}
      />
    </div>
  );
}

export default App;
