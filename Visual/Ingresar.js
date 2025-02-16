import React, { useState } from "react";
import axios from "axios";

const Ingreso = ({ fetchProductores }) => {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    contacto: "",
    direccion: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Función para validar cédula ecuatoriana
  const validarCedula = (cedula) => {
    if (!/^\d{10}$/.test(cedula)) return false;

    const coefValidador = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const verificador = parseInt(cedula[9]);
    let suma = 0;

    for (let i = 0; i < 9; i++) {
      let valor = parseInt(cedula[i]) * coefValidador[i];
      if (valor > 9) valor -= 9;
      suma += valor;
    }

    let digitoCalculado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
    return digitoCalculado === verificador;
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cedula") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    if (name === "nombre") {
      const formattedValue = value
        .replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    if (name === "contacto") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    if (name === "direccion") {
      if (!/^[a-zA-Z0-9\s\-/]*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Guardar productor en la BD
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCedula(formData.cedula)) {
      setMessage("❌ Cédula inválida. Verifique el número.");
      setMessageType("danger");
      return;
    }

    if (formData.contacto.length < 7 || formData.contacto.length > 10) {
      setMessage("❌ El contacto debe tener entre 7 y 10 dígitos.");
      setMessageType("danger");
      return;
    }

    axios
      .post("http://localhost:8000/api/productores/", formData)
      .then((response) => {
        console.log("✅ Productor guardado:", response.data);

        // Recargar la lista de productores
        fetchProductores();

        // Restablecer el formulario
        setFormData({ cedula: "", nombre: "", contacto: "", direccion: "" });

        setMessage("✅ Productor guardado correctamente.");
        setMessageType("success");

        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch((error) => {
        console.error("❌ Error al guardar productor:", error.response?.data || error);
        setMessage("❌ Error al guardar el productor.");
        setMessageType("danger");
      });
  };

  return (
    <div className="card shadow-lg p-4">
      <h3 className="text-center text-primary">Registrar Nuevo Productor</h3>

      {/* Mensaje de éxito o error */}
      {message && <div className={`alert alert-${messageType} text-center`} role="alert">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cedula" className="form-label">Cédula:</label>
          <input
            type="text"
            className="form-control"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contacto" className="form-label">Contacto:</label>
          <input
            type="text"
            className="form-control"
            id="contacto"
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección:</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Guardar Productor</button>
      </form>
    </div>
  );
};

export default Ingreso;
