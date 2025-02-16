import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Ingresar from "../pages/componentsProductores/Ingresar"; 
import Listar from "../pages/componentsProductores/Listar";  

const Productores = () => {
  const [productores, setProductores] = useState([]);
  const [message] = useState(""); 
  const [messageType] = useState("");

  // Función para obtener productores desde el backend
  const fetchProductores = useCallback(() => {
    axios
      .get("http://localhost:8000/api/productores/")
      .then(response => setProductores(response.data))
      .catch(error => console.error("Error al cargar productores:", error));
  }, []);

  // Cargar productores al montar el componente
  useEffect(() => {
    fetchProductores();
  }, [fetchProductores]);

  return (
    <div className="container-fluid">
      <header className="text-center">
        <h1>Gestión de Productores</h1>
      </header>

      {/* Mensaje de notificación */}
      {message && (
        <div className={`alert alert-${messageType} text-center`} role="alert">
          {message}
        </div>
      )}

      {/* Contenedor principal con dos columnas */}
      <div className="container mt-4">
        <div className="row">
          {/* Formulario a la izquierda */}
          <div className="col-md-4">
            <Ingresar fetchProductores={fetchProductores} />
          </div>

          {/* Tabla a la derecha */}
          <div className="col-md-8">
            <Listar productores={productores} fetchProductores={fetchProductores} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productores;