import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "./ProductTable.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductTable = ({ products, menuOpenIndex, handleMenuClick }) => {
  const handleEdit = (product) => {};
  const handleDelete = (id) => {
    axios
      .delete(
        `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id=${id}`,
        {
          headers: {
            authorId: "12345",
          },
        }
      )
      .then((response) => {
        toast.success("Registro eliminado exitosamente");
      })
      .catch((error) => {
        toast.error("Error al eliminar el registro");
        console.error(error);
      });
  };

  return (
    <div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de liberacion</th>
            <th>Fecha de reestructuracion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const handleEditClick = () => handleEdit(product);
            const handleDeleteClick = () => handleDelete(product.id);
            return (
              <tr key={product.id}>
                <td className="logo-column">
                  <div
                    style={{ backgroundImage: `url(${product.logo})` }}
                    className="img"
                  ></div>
                  {/* <img src={product.logo} alt="Logo" /> */}
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.date_release}</td>
                <td>{product.date_revision}</td>
                <td>
                  <div className="menu-dropdown">
                    <div
                      className="dots"
                      onClick={(e) => {
                        e.stopPropagation(); // Detiene la propagación del evento
                        handleMenuClick(index);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        className="icono-ellipsis"
                      />
                    </div>
                    {menuOpenIndex === index && (
                      <div className="menu-content">
                        <Link
                          className="action-button"
                          //   onClick={handleEditClick}
                          to={{ pathname: "/add" }}
                          state={{ action: "edit", productData: product }}
                        >
                          Editar
                        </Link>
                        <span
                          className="action-button"
                          onClick={handleDeleteClick}
                        >
                          Eliminar
                        </span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ProductTable;
