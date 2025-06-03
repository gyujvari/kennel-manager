import React, { useState } from "react";
import "./App.css";
import { KennelData } from "./types";
import Kennel from "./components/Kennel";
import Toolbar from "./components/Toolbar";
import FreeDogsList from "./components/FreeDogsList";
import initialData from "./data/initialData.json";

function App() {
  const [kennelData, setKennelData] = useState<KennelData>(initialData);

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
    <div className="App">
      <h1>Dog Kennel Manager</h1>
      <Toolbar onEdit={startEdit} onSave={saveEdit} onCancel={cancelEdit} />
      <div className="kennel-container">
        {kennelData.kennels.map((kennel) => (
          <Kennel key={kennel.id} kennel={kennel} />
        ))}
      </div>
      <FreeDogsList dogs={kennelData.freeDogs} />
    </div>
  );
}

export default App;
