import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dog from "./Dog";
import { Dog as DogType } from "../../types";
import "@testing-library/jest-dom";

const dog: DogType = {
  id: "1",
  name: "Rex",
  chipNumber: "123",
};

describe("Dog component", () => {
  test("renders dog name and chip number", () => {
    render(<Dog dog={dog} isEditing={false} />);
    expect(screen.getByText("Rex")).toBeInTheDocument();
    expect(screen.getByText("(chip: 123)")).toBeInTheDocument();
  });

  test("draggable is false when isEditing is false", () => {
    render(<Dog dog={dog} draggable={true} isEditing={false} />);
    const container = screen.getByText("Rex").parentElement!;
    expect(container).toHaveAttribute("draggable", "false");
  });

  test("draggable is true when isEditing is true and draggable prop is true", () => {
    render(<Dog dog={dog} draggable={true} isEditing={true} />);
    const container = screen.getByText("Rex").parentElement!;
    expect(container).toHaveAttribute("draggable", "true");
  });

  test("calls onDragStart handler when dragging and isEditing is true", () => {
    const onDragStart = jest.fn();
    render(
      <Dog
        dog={dog}
        draggable={true}
        isEditing={true}
        onDragStart={onDragStart}
      />
    );
    const container = screen.getByText("Rex").parentElement!;
    fireEvent.dragStart(container);
    expect(onDragStart).toHaveBeenCalledTimes(1);
    expect(onDragStart).toHaveBeenCalledWith(expect.any(Object), "1");
  });

  test("does not call onDragStart handler when isEditing is false", () => {
    const onDragStart = jest.fn();
    render(
      <Dog
        dog={dog}
        draggable={true}
        isEditing={false}
        onDragStart={onDragStart}
      />
    );
    const container = screen.getByText("Rex").parentElement!;
    fireEvent.dragStart(container);
    expect(onDragStart).not.toHaveBeenCalled();
  });

  test("has correct classes depending on isEditing", () => {
    const { rerender } = render(<Dog dog={dog} isEditing={false} />);
    let container = screen.getByText("Rex").parentElement!;
    expect(container).toHaveClass("opacity-60 cursor-not-allowed");

    rerender(<Dog dog={dog} isEditing={true} />);
    container = screen.getByText("Rex").parentElement!;
    expect(container).toHaveClass("cursor-grab");
  });
});
