import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import ProductTable from "./ProductTable";
import Header from "./Header";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products",
        {
          headers: {
            authorId: "12345",
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (!event.target.classList.contains("dots")) {
        setMenuOpenIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing products per page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageCount = () => {
    return Math.ceil(filteredProducts.length / productsPerPage);
  };

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleMenuClick = (index) => {
    setMenuOpenIndex(index);
  };

  const renderProductTable = () => {
    const paginatedProducts = getPaginatedProducts();
    return (
      <ProductTable
        products={paginatedProducts}
        menuOpenIndex={menuOpenIndex}
        handleMenuClick={handleMenuClick}
      />
    );
  };

  const renderPagination = () => {
    const pageCount = getPageCount();
    if (pageCount <= 1) {
      return null; // Hide pagination if there's only one page
    }

    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return <div className="pagination-container">{pages}</div>;
  };

  const renderResultCount = () => {
    const totalCount = products.length;
    return <div className="result-count">{totalCount} Resultados</div>;
  };

  return (
    <div data-testid="product-list">
      <Header />
      <div className="product-list-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <Link
            to={{ pathname: "/add" }}
            state={{ action: "add", productData: {} }}
            className="add-product-button"
          >
            Agregar producto
          </Link>
        </div>

        <div className="product-table-container">{renderProductTable()}</div>
        <div className="pages-container">
          <div>{renderPagination()}</div>
          <div className="pagination-options">
            <label htmlFor="productsPerPage">Productos por página:</label>
            <select
              id="productsPerPage"
              value={productsPerPage}
              onChange={handleSelectChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        {renderResultCount()}
      </div>
    </div>
  );
};

export default ProductList;
