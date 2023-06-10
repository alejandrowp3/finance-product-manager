import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddProductForm from "./AddProductForm";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("AddProductForm", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AddProductForm />
      </BrowserRouter>
    );
  });

  it("should display the form title", () => {
    const formTitle = screen.getByText("Formulario de Registro");
    expect(formTitle).toBeInTheDocument();
  });

  it("should update the form input values", () => {
    const idInput = screen.getByLabelText("ID:");
    const nameInput = screen.getByLabelText("Nombre:");
    const descriptionInput = screen.getByLabelText("Descripción:");

    fireEvent.change(idInput, { target: { value: "123" } });
    fireEvent.change(nameInput, { target: { value: "Product A" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Product description" },
    });

    expect(idInput.value).toBe("123");
    expect(nameInput.value).toBe("Product A");
    expect(descriptionInput.value).toBe("Product description");
  });

  it("should show an error message when submitting the form with invalid data", () => {
    const addButton = screen.getByText("Agregar");

    fireEvent.click(addButton);

    const errorMessage = screen.getByText("El campo ID es requerido");
    expect(errorMessage).toBeInTheDocument();
  });
});
