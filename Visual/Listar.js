import React, { useState, useEffect } from "react";
import axios from "axios";

const Listar = ({ users, fetchUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [editUser, setEditUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    correo: "",
    rol: ""
  });

  useEffect(() => {
    fetchUsers(); // Cargar usuarios al montar el componente
  }, [fetchUsers]);

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const sortedUsers = [...users].sort((a, b) => a.id - b.id); 
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  // Función para manejar la edición
  const handleEditClick = (user) => {
    setEditUser(user);
    setEditFormData({
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol
    });
  };

  // Manejar cambios en los inputs de edición
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Enviar cambios a la API
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/usuarios/${editUser.id}/`, editFormData);
      if (response.status === 200) {
        console.log("✅ Usuario actualizado correctamente");
        fetchUsers(); // Refrescar lista
        setEditUser(null); // Cerrar formulario de edición
      } else {
        console.error("❌ Error al actualizar usuario:", response.data);
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error.response?.data || error);
    }
  };

  // Cambiar estado de usuario (Activar/Desactivar)
  const toggleUserStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/usuarios/${id}/toggle/`);
      fetchUsers(); // Recargar usuarios después del cambio
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
    }
  };

  return (
    <div className="table-container">
      <h3>Lista de Usuarios</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {editUser?.id === user.id ? (
                <td colSpan="5">
                  <form onSubmit={handleEditSubmit}>
                    <input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditChange} required />
                    <input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange} required />
                    <select name="rol" value={editFormData.rol} onChange={handleEditChange} className="form-control">
                      <option value="Moderador">Moderador</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                    <button type="submit" className="btn btn-success me-2 mt-2">Guardar</button>
                    <button type="button" className="btn btn-secondary mt-2" onClick={() => setEditUser(null)}>Cancelar</button>
                  </form>
                </td>
              ) : (
                <>
                  <td>{user.nombre}</td>
                  <td>{user.correo}</td>
                  <td>{user.rol}</td>
                  <td>
                    <span className={`badge ${user.estado ? "bg-success" : "bg-danger"}`}>
                      {user.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="d-flex justify-content-center gap-2">
                    <button className="btn btn-info" onClick={() => handleEditClick(user)}>
                      Editar
                    </button>
                    <button 
                      className={`btn ${user.estado ? "btn-warning" : "btn-success"}`} 
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.estado ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination-buttons text-center mt-3">
        <button className="btn btn-secondary me-2" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          ← Anterior
        </button>
        <button className="btn btn-secondary ms-2" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastUser >= users.length}>
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default Listar;
