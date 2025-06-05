import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toolbar from "./Toolbar";

describe("Toolbar component", () => {
  test("renders buttons", () => {
    render(
      <Toolbar
        onEdit={jest.fn()}
        onSave={jest.fn()}
        onCancel={jest.fn()}
        isEditing={false}
      />
    );

    expect(screen.getByText("Start Editing")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("Save and Cancel buttons are disabled when not editing", () => {
    render(
      <Toolbar
        onEdit={jest.fn()}
        onSave={jest.fn()}
        onCancel={jest.fn()}
        isEditing={false}
      />
    );

    const saveButton = screen.getByText("Save");
    const cancelButton = screen.getByText("Cancel");

    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  test("Save and Cancel buttons are enabled when editing", () => {
    render(
      <Toolbar
        onEdit={jest.fn()}
        onSave={jest.fn()}
        onCancel={jest.fn()}
        isEditing={true}
      />
    );

    const saveButton = screen.getByText("Save");
    const cancelButton = screen.getByText("Cancel");

    expect(saveButton).toBeEnabled();
    expect(cancelButton).toBeEnabled();
  });

  test("calls onEdit when Start Editing button is clicked", () => {
    const onEdit = jest.fn();

    render(
      <Toolbar
        onEdit={onEdit}
        onSave={jest.fn()}
        onCancel={jest.fn()}
        isEditing={false}
      />
    );

    fireEvent.click(screen.getByText("Start Editing"));
    expect(onEdit).toHaveBeenCalled();
  });

  test("calls onSave when Save button is clicked", () => {
    const onSave = jest.fn();

    render(
      <Toolbar
        onEdit={jest.fn()}
        onSave={onSave}
        onCancel={jest.fn()}
        isEditing={true}
      />
    );

    fireEvent.click(screen.getByText("Save"));
    expect(onSave).toHaveBeenCalled();
  });

  test("calls onCancel when Cancel button is clicked", () => {
    const onCancel = jest.fn();

    render(
      <Toolbar
        onEdit={jest.fn()}
        onSave={jest.fn()}
        onCancel={onCancel}
        isEditing={true}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });

  test("Save and Cancel buttons do not call callbacks when disabled", () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();

    render(
      <Toolbar
        onEdit={jest.fn()}
        onSave={onSave}
        onCancel={onCancel}
        isEditing={false}
      />
    );

    const saveButton = screen.getByText("Save");
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(saveButton);
    fireEvent.click(cancelButton);

    expect(onSave).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });
});
