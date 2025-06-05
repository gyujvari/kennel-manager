import { Dog, Kennel } from "../types";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export async function fetchKennels(): Promise<Kennel[]> {
  const res = await fetch(`${API_BASE}/api/kennels`);
  if (!res.ok) throw new Error("Failed to fetch kennels");
  const kennelsFromApi: { _id: string; name: string }[] = await res.json();

  return kennelsFromApi.map((k) => ({
    id: k._id,
    name: k.name,
    dogs: [],
  }));
}

export async function fetchDogs(): Promise<Dog[]> {
  const res = await fetch(`${API_BASE}/api/dogs`);
  if (!res.ok) throw new Error("Failed to fetch dogs");
  const dogsFromApi: {
    _id: string;
    name: string;
    chipNumber: string;
    kennelId?: string;
  }[] = await res.json();

  return dogsFromApi.map((dog) => ({
    id: dog._id,
    name: dog.name,
    chipNumber: dog.chipNumber,
    kennelId: dog.kennelId,
  }));
}

export async function updateDogKennel(dogId: string, kennelId: string | null) {
  const res = await fetch(`${API_BASE}/api/dogs/${dogId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ kennelId }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update dog ${dogId}`);
  }

  return await res.json();
}
