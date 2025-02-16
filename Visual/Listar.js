import React, { useState, useEffect } from "react";
import axios from "axios";

const Listar = ({ productores, fetchProductores }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [searchCedula, setSearchCedula] = useState("");
  const [filteredProductor, setFilteredProductor] = useState(null);

  const productoresPerPage = 5;
  const [editProductor, setEditProductor] = useState(null);
  const [editFormData, setEditFormData] = useState({ nombre: "", contacto: "", direccion: "" });

  useEffect(() => {
    fetchProductores();
  }, [fetchProductores]);

  // Ordenar productores
  const sortedProductores = [...productores].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Paginación
  const indexOfLastProductor = currentPage * productoresPerPage;
  const indexOfFirstProductor = indexOfLastProductor - productoresPerPage;
  const currentProductores = sortedProductores.slice(indexOfFirstProductor, indexOfLastProductor);

  // Manejo de edición
  const handleEditClick = (productor) => {
    setEditProductor(productor);
    setEditFormData({ nombre: productor.nombre, contacto: productor.contacto, direccion: productor.direccion });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/productores/${editProductor.id}/`, editFormData);
      if (response.status === 200) {
        fetchProductores();
        setEditProductor(null);
      } else {
        console.error("❌ Error al actualizar productor:", response.data);
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error.response?.data || error);
    }
  };

  // Buscar por cédula
  const handleSearch = () => {
    const productorEncontrado = productores.find((p) => p.cedula === searchCedula);
    setFilteredProductor(productorEncontrado);
  };

  return (
    <div className="table-container">
      <h3>Lista de Productores</h3>
      <div className="mb-3">
        <label>Ordenar por:</label>
        <select onChange={(e) => setSortConfig({ key: e.target.value, direction: sortConfig.direction })}>
          <option value="id">ID</option>
          <option value="nombre">Nombre</option>
        </select>
        <button onClick={() => setSortConfig({ ...sortConfig, direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
          {sortConfig.direction === "asc" ? "⬆ Asc" : "⬇ Desc"}
        </button>
      </div>

      <div className="mb-3">
        <input type="text" placeholder="Buscar por cédula" value={searchCedula} onChange={(e) => setSearchCedula(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {filteredProductor && (
        <div>
          <h4>Productor Encontrado</h4>
          <p><strong>ID:</strong> {filteredProductor.id}</p>
          <p><strong>Cédula:</strong> {filteredProductor.cedula}</p>
          <p><strong>Nombre:</strong> {filteredProductor.nombre}</p>
          <p><strong>Contacto:</strong> {filteredProductor.contacto}</p>
          <p><strong>Dirección:</strong> {filteredProductor.direccion}</p>
        </div>
      )}

      <table className="table table-striped table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProductores.map((productor) => (
            <tr key={productor.id}>
              <td>{productor.id}</td>
              {editProductor?.id === productor.id ? (
                <td colSpan="5">
                  <form onSubmit={handleEditSubmit}>
                    <input type="text" name="cedula" value={productor.cedula} disabled />
                    <input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditChange} required />
                    <input type="text" name="contacto" value={editFormData.contacto} onChange={handleEditChange} required />
                    <input type="text" name="direccion" value={editFormData.direccion} onChange={handleEditChange} required />
                    <button type="submit" className="btn btn-success me-2">Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditProductor(null)}>Cancelar</button>
                  </form>
                </td>
              ) : (
                <>
                  <td>{productor.cedula}</td>
                  <td>{productor.nombre}</td>
                  <td>{productor.contacto}</td>
                  <td>{productor.direccion}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => handleEditClick(productor)}>Editar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-buttons text-center mt-3">
        <button className="btn btn-secondary me-2" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>← Anterior</button>
        <button className="btn btn-secondary ms-2" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastProductor >= productores.length}>Siguiente →</button>
      </div>
    </div>
  );
};

export default Listar;
