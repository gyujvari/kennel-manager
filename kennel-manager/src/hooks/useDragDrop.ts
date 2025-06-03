import { useCallback } from "react";
import { Dog, KennelData } from "../types";

export const useDragDrop = (
  kennelData: KennelData,
  setKennelData: React.Dispatch<React.SetStateAction<KennelData>>,
  isEditing: boolean
) => {
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, dogId: number) => {
      if (!isEditing) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", dogId.toString());
      e.dataTransfer.effectAllowed = "move";
    },
    [isEditing]
  );

  const handleDropToKennel = useCallback(
    (dogId: number, kennelId: number) => {
      if (!isEditing) return;

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

        const targetKennel = newKennels.find((k) => k.id === kennelId);
        if (targetKennel && targetKennel.dogs.length >= 2) {
          alert("A kennel csak 2 kutyát tartalmazhat!");
          return prev;
        }

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
    },
    [isEditing, setKennelData]
  );

  const handleDropToFreeDogs = useCallback(
    (dogId: number) => {
      if (!isEditing) return;

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
    },
    [isEditing, setKennelData]
  );

  return {
    handleDragStart,
    handleDropToKennel,
    handleDropToFreeDogs,
  };
};

export default useDragDrop;
