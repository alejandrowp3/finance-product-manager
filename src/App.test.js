import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";
import "@testing-library/jest-dom";

test('renders ProductList component when "/" path is accessed', () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Router>
  );

  expect(screen.getByTestId("product-list")).toBeInTheDocument();
});
