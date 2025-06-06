import { KennelData, Dog } from "../types";
import { toast } from "react-hot-toast";

export const useDragDrop = (
  kennelData: KennelData,
  setKennelData: React.Dispatch<React.SetStateAction<KennelData>>,
  isEditing: boolean
) => {
  const handleDropToKennel = (dogId: string, kennelId: string) => {
    if (!isEditing) return;

    setKennelData((prevData) => {
      const dogToAdd =
        prevData.freeDogs.find((dog) => dog.id === dogId) ||
        prevData.kennels
          .flatMap((kennel) => kennel.dogs)
          .find((dog) => dog.id === dogId);

      if (!dogToAdd) return prevData;

      const targetKennel = prevData.kennels.find(
        (kennel) => kennel.id === kennelId
      );

      if (targetKennel && targetKennel.dogs.length >= 2) {
        toast.error("Kennel is full! Maximum 2 dogs allowed.", {
          id: "kennel-full",
        });

        return prevData;
      }

      const updatedKennels = prevData.kennels.map((kennel) => ({
        ...kennel,
        dogs: kennel.dogs.filter((dog) => dog.id !== dogId),
      }));

      const updatedFreeDogs = prevData.freeDogs.filter(
        (dog) => dog.id !== dogId
      );

      const finalKennels = updatedKennels.map((kennel) => {
        if (kennel.id === kennelId) {
          return {
            ...kennel,
            dogs: [...kennel.dogs, dogToAdd],
          };
        }
        return kennel;
      });

      return {
        ...prevData,
        kennels: finalKennels,
        freeDogs: updatedFreeDogs,
      };
    });
  };

  const handleDropToFreeDogs = (dogId: string) => {
    if (!isEditing) return;

    setKennelData((prevData) => {
      let dogToFree: Dog | null = null;

      const updatedKennels = prevData.kennels.map((kennel) => {
        const updatedDogs = kennel.dogs.filter((dog) => {
          if (dog.id === dogId) {
            dogToFree = dog;
            return false;
          }
          return true;
        });
        return {
          ...kennel,
          dogs: updatedDogs,
        };
      });

      if (dogToFree) {
        return {
          ...prevData,
          kennels: updatedKennels,
          freeDogs: [...prevData.freeDogs, dogToFree],
        };
      }

      return prevData;
    });
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    dogId: string
  ) => {
    e.dataTransfer.setData("text/plain", dogId);
  };

  return {
    handleDropToKennel,
    handleDropToFreeDogs,
    handleDragStart,
  };
};
