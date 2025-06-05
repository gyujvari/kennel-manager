import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dog } from "../../types";
import FreeDogsList from "./FreeDogsList";

const mockDogs: Dog[] = [
  { id: "1", name: "Rex", chipNumber: "123" },
  { id: "2", name: "Bundi", chipNumber: "456" },
];

describe("FreeDogsList", () => {
  test("renders title and dog names", () => {
    render(
      <FreeDogsList
        dogs={mockDogs}
        onDropDog={jest.fn()}
        onDragStartDog={jest.fn()}
        isEditing={true}
      />
    );

    expect(screen.getByText(/Unassigned Dogs/i)).toBeInTheDocument();
    expect(screen.getByText("Rex")).toBeInTheDocument();
    expect(screen.getByText("Bundi")).toBeInTheDocument();
  });

  test("shows message when no dogs", () => {
    render(
      <FreeDogsList
        dogs={[]}
        onDropDog={jest.fn()}
        onDragStartDog={jest.fn()}
        isEditing={true}
      />
    );

    expect(screen.getByText(/No free dogs/i)).toBeInTheDocument();
  });

  test("calls onDropDog with dogId on drop when editing", () => {
    const onDropDog = jest.fn();

    render(
      <FreeDogsList
        dogs={mockDogs}
        onDropDog={onDropDog}
        onDragStartDog={jest.fn()}
        isEditing={true}
      />
    );

    const dropArea = screen.getByText(/Unassigned Dogs/i).parentElement!;
    fireEvent.dragOver(dropArea);
    fireEvent.drop(dropArea, {
      dataTransfer: {
        getData: () => "2",
        types: ["text/plain"],
      },
      preventDefault: jest.fn(),
    });

    expect(onDropDog).toHaveBeenCalledWith("2");
  });

  test("does not call onDropDog on drop when not editing", () => {
    const onDropDog = jest.fn();

    render(
      <FreeDogsList
        dogs={mockDogs}
        onDropDog={onDropDog}
        onDragStartDog={jest.fn()}
        isEditing={false}
      />
    );

    const dropArea = screen.getByText(/Unassigned Dogs/i).parentElement!;
    fireEvent.drop(dropArea, {
      dataTransfer: {
        getData: () => "2",
        types: ["text/plain"],
      },
      preventDefault: jest.fn(),
    });

    expect(onDropDog).not.toHaveBeenCalled();
  });
});
