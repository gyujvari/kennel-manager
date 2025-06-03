import React, { useState } from "react";
import "./App.css";
import { KennelData } from "./types";
import Kennel from "./components/Kennel";
import Toolbar from "./components/Toolbar";
import FreeDogsList from "./components/FreeDogsList";
import initialData from "./data/initialData.json";
import { useDragDrop } from "./hooks/useDragDrop";

function App() {
  const [kennelData, setKennelData] = useState<KennelData>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [backupData, setBackupData] = useState<KennelData | null>(null);

  const { handleDragStart, handleDropToKennel, handleDropToFreeDogs } =
    useDragDrop(kennelData, setKennelData, isEditing);

  const startEdit = () => {
    setIsEditing(true);
    setBackupData(kennelData);
  };

  const saveEdit = () => {
    setIsEditing(false);
    setBackupData(null);
    console.log("Saved:", kennelData);
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
