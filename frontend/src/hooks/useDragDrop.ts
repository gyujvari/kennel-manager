import { KennelData, Dog } from "../types";

export const useDragDrop = (
  kennelData: KennelData,
  setKennelData: React.Dispatch<React.SetStateAction<KennelData>>,
  isEditing: boolean
) => {
  const handleDropToKennel = (dogId: string, kennelId: string) => {
    if (!isEditing) return;

    setKennelData((prevData) => {
      const updatedKennels = prevData.kennels.map((kennel) => {
        if (kennel.id === kennelId) {
          const dogExists = kennel.dogs.find((dog) => dog.id === dogId);
          if (!dogExists) {
            const dogToAdd = prevData.freeDogs.find((dog) => dog.id === dogId);
            if (dogToAdd) {
              return {
                ...kennel,
                dogs: [...kennel.dogs, dogToAdd],
              };
            }
          }
        }
        return kennel;
      });

      const updatedFreeDogs = prevData.freeDogs.filter(
        (dog) => dog.id !== dogId
      );

      const kennelsWithoutDog = updatedKennels.map((kennel) => ({
        ...kennel,
        dogs: kennel.dogs.filter(
          (dog) => dog.id !== dogId || kennel.id === kennelId
        ),
      }));

      return {
        ...prevData,
        kennels: kennelsWithoutDog,
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
