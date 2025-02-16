import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Ingreso from "../pages/componentsUsuario/Ingreso";
import Listar from "../pages/componentsUsuario/Listar";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState("");

  const usuarioId = parseInt(localStorage.getItem("usuario_id"));

  // Función para obtener usuarios
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/usuarios/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  }, []);

  // Solo ejecutar una vez al montar
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Cambiar estado de usuario (Activar/Desactivar)
  const toggleUserStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/usuarios/${id}/toggle/`);
      fetchUsers(); // Solo llamamos una vez tras el cambio
      setMessage("✅ Estado actualizado correctamente.");
      setMessageType("success");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      setMessage("❌ Error al actualizar el estado.");
      setMessageType("danger");
    }
  };

  return (
    <div className="container-fluid">
      <header className="text-center">
        <h1>Gestión de Usuarios</h1>
      </header>

      {message && (
        <div className={`alert alert-${messageType} text-center`} role="alert">
          {message}
        </div>
      )}

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <Ingreso fetchUsers={fetchUsers} />
          </div>
          <div className="col-md-8">
            <Listar users={users} fetchUsers={fetchUsers} toggleUserStatus={toggleUserStatus} usuarioId={usuarioId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;