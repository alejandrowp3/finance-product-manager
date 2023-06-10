import React, { useState } from "react";
import Header from "./Header";
import "./AddProductForm.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, isAfter, isToday, parseISO } from "date-fns";

const AddProductForm = () => {
  const location = useLocation();
  const action = location.state?.action;
  const productData = location.state?.productData;

  const { id, name, logo, description, date_release, date_revision } =
    productData;
  const [formData, setFormData] = useState({
    id: id || "",
    name: name || "",
    logo: logo || "",
    description: description || "",
    date_release: date_release
      ? format(new Date(date_release), "yyyy-MM-dd")
      : "",
    date_revision: date_revision
      ? format(new Date(date_revision), "yyyy-MM-dd")
      : "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [revisionDate, setRevisionDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date_release") {
      const selectedDate = new Date(value);
      const oneYearLater = new Date(
        selectedDate.getFullYear() + 1,
        selectedDate.getMonth(),
        selectedDate.getDate()
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        date_revision: oneYearLater.toISOString().slice(0, 10),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      id: "",
      name: "",
      logo: "",
      description: "",
      date_release: "",
      date_revision: "",
    });
    setFormErrors({});
    setRevisionDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Send form data to API
      try {
        if (action === "add") {
          const response = await axios.post(
            "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products",
            formData,
            {
              headers: {
                authorId: "12345",
              },
            }
          );
          toast.success("Producto agregado exitosamente");
        } else if (action === "edit") {
          const response = await axios.put(
            `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products`,
            formData,
            {
              headers: {
                authorId: "12345",
              },
            }
          );
          toast.success("Producto editado exitosamente");
        }

        // Limpiar el formulario después de enviarlo correctamente
        setFormData({
          id: "",
          name: "",
          logo: "",
          description: "",
          date_release: "",
          date_revision: "",
        });
      } catch (error) {
        console.error("Error al agregar el producto:", error);
        toast.error("Error al agregar o editar el producto");
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.id) {
      errors.id = "El campo ID es requerido";
    } else if (formData.id.length < 3 || formData.id.length > 10) {
      errors.id = "El campo ID debe tener entre 3 y 10 caracteres";
    }
    if (!formData.name) {
      errors.name = "El campo Nombre es requerido";
    } else if (formData.name.length < 5 || formData.name.length > 100) {
      errors.name = "El campo nombre debe tener entre 5 y 100 caracteres";
    }
    if (!formData.logo) {
      errors.logo = "El campo Logo es requerido";
    }
    if (!formData.description) {
      errors.description = "El campo Descripción es requerido";
    } else if (
      formData.description.length < 10 ||
      formData.description.length > 200
    ) {
      errors.description =
        "El campo Descripción debe tener entre 10 y 200 caracteres";
    }
    if (!formData.date_release) {
      errors.date_release = "El campo Fecha de lanzamiento es requerido";
    } else {
      const currentDate = new Date();
      const selectedDate = parseISO(formData.date_release);
      if (!(isAfter(selectedDate, currentDate) || isToday(selectedDate))) {
        errors.date_release =
          "La fecha debe ser igual o mayor a la fecha actual";
      }
    }
    if (!formData.date_revision) {
      errors.date_revision = "El campo Fecha de revisión es requerido";
    }
    return errors;
  };

  return (
    <>
      <Header />

      <div className="form-container">
        <div className="title-container">
          <h1>Formulario de Registro</h1>
        </div>
        <form
          className="add-product-form"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled={action === "edit"}
              />
              {formErrors.id && (
                <span className="error-message">{formErrors.id}</span>
              )}
            </div>
            <div className="form-column">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <span className="error-message">{formErrors.name}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="description">Descripción:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {formErrors.description && (
                <span className="error-message">{formErrors.description}</span>
              )}
            </div>
            <div className="form-column">
              <label htmlFor="logo">Logo:</label>
              <input
                type="text"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
              />
              {formErrors.logo && (
                <span className="error-message">{formErrors.logo}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="date_release">Fecha de lanzamiento:</label>
              <input
                type="date"
                id="date_release"
                name="date_release"
                value={formData.date_release}
                onChange={handleChange}
              />
              {formErrors.date_release && (
                <span className="error-message">{formErrors.date_release}</span>
              )}
            </div>
            <div className="form-column">
              <label htmlFor="date_revision">Fecha de revisión:</label>
              <input
                type="date"
                id="date_revision"
                name="date_revision"
                value={revisionDate || formData.date_revision}
                onChange={handleChange}
                disabled
              />
              {formErrors.date_revision && (
                <span className="error-message">
                  {formErrors.date_revision}
                </span>
              )}
            </div>
          </div>
          <div className="form-button-row">
            <Link to="/" className="button-form">
              Regresar
            </Link>
            <button type="reset" className="button-form">
              Reset
            </button>
            <button type="submit" className="button-form">
              Agregar
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddProductForm;
