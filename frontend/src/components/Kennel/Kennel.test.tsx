import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Kennel as KennelType, Dog } from "../../types";
import Kennel from "./Kennel";

const mockDogs: Dog[] = [
  { id: "1", name: "Rex", chipNumber: "123" },
  { id: "2", name: "Bundi", chipNumber: "456" },
];

const mockKennel: KennelType = {
  id: "kennel1",
  name: "Kennel A",
  dogs: mockDogs,
};

describe("Kennel component", () => {
  test("renders kennel name and dogs", () => {
    render(
      <Kennel
        kennel={mockKennel}
        onDropDog={jest.fn()}
        onDragStartDog={jest.fn()}
        isEditing={true}
      />
    );

    expect(screen.getByText("Kennel A")).toBeInTheDocument();
    expect(screen.getByText("Rex")).toBeInTheDocument();
    expect(screen.getByText("Bundi")).toBeInTheDocument();
  });

  test("shows no dogs message if kennel empty", () => {
    render(
      <Kennel
        kennel={{ ...mockKennel, dogs: [] }}
        onDropDog={jest.fn()}
        onDragStartDog={jest.fn()}
        isEditing={true}
      />
    );

    expect(screen.getByText(/No dogs./i)).toBeInTheDocument();
  });

  test("calls onDropDog with dogId and kennelId on drop when editing", () => {
    const onDropDog = jest.fn();

    render(
      <Kennel
        kennel={mockKennel}
        onDropDog={onDropDog}
        onDragStartDog={jest.fn()}
        isEditing={true}
      />
    );

    const dropArea = screen.getByText("Kennel A").parentElement!;
    fireEvent.dragOver(dropArea);
    fireEvent.drop(dropArea, {
      dataTransfer: {
        getData: () => "2",
        types: ["text/plain"],
      },
      preventDefault: jest.fn(),
    });

    expect(onDropDog).toHaveBeenCalledWith("2", "kennel1");
  });

  test("does not call onDropDog on drop when not editing", () => {
    const onDropDog = jest.fn();

    render(
      <Kennel
        kennel={mockKennel}
        onDropDog={onDropDog}
        onDragStartDog={jest.fn()}
        isEditing={false}
      />
    );

    const dropArea = screen.getByText("Kennel A").parentElement!;
    fireEvent.drop(dropArea, {
      dataTransfer: {
        getData: () => "2",
        types: ["text/plain"],
      },
      preventDefault: jest.fn(),
    });

    expect(onDropDog).not.toHaveBeenCalled();
  });

  test("calls onDragOver when editing and onDragOver prop is provided", () => {
    const onDragOver = jest.fn();

    render(
      <Kennel
        kennel={mockKennel}
        onDropDog={jest.fn()}
        onDragStartDog={jest.fn()}
        onDragOver={onDragOver}
        isEditing={true}
      />
    );

    const dropArea = screen.getByText("Kennel A").parentElement!;
    const event = {
      preventDefault: jest.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;
    fireEvent.dragOver(dropArea, event);

    expect(onDragOver).toHaveBeenCalled();
  });

  test("does not call onDragOver when not editing", () => {
    const onDragOver = jest.fn();

    render(
      <Kennel
        kennel={mockKennel}
        onDropDog={jest.fn()}
        onDragStartDog={jest.fn()}
        onDragOver={onDragOver}
        isEditing={false}
      />
    );

    const dropArea = screen.getByText("Kennel A").parentElement!;
    const event = {
      preventDefault: jest.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;
    fireEvent.dragOver(dropArea, event);

    expect(onDragOver).not.toHaveBeenCalled();
  });
});
