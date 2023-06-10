import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import ProductList from "./ProductList";
import "@testing-library/jest-dom";

jest.mock("axios"); // Mock axios module

const mockedProducts = [
  { id: 1, name: "Product 1", description: "Description 1" },
  { id: 2, name: "Product 2", description: "Description 2" },
];

beforeEach(() => {
  axios.get.mockResolvedValueOnce({ data: mockedProducts }); // Mock API response
});

test("renders ProductList component", async () => {
  render(
    <Router>
      <ProductList />
    </Router>
  );

  // Wait for API call to resolve and products to be rendered
  await waitFor(() => {
    const product1Element = screen.getByText("Product 1");
    expect(product1Element).toBeInTheDocument();
  });
});

test("displays correct result count", async () => {
  render(
    <Router>
      <ProductList />
    </Router>
  );

  // Wait for API call to resolve
  await waitFor(() => {
    const resultCountElement = screen.getByText("2 Resultados");
    expect(resultCountElement).toBeInTheDocument();
  });
});
