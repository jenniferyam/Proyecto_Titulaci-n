import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pagos = () => {
  const [pagos, setPagos] = useState([]);
  const [formData, setFormData] = useState({
    productor: '',
    usuario: '',
    mes: '',
    total_pago: '',
  });

  // Obtener datos de pagos desde Django
  const fetchPagos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/pagos/');
      setPagos(response.data);
    } catch (error) {
      console.error('Error al obtener pagos:', error);
    }
  };

  // Enviar un nuevo pago
  const agregarPago = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/pagos/', formData);
      setFormData({ productor: '', usuario: '', mes: '', total_pago: '' }); // Limpiar el formulario
      fetchPagos(); // Actualizar la lista de pagos
    } catch (error) {
      console.error('Error al agregar pago:', error);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Cargar pagos al montar el componente
  useEffect(() => {
    fetchPagos();
  }, []);

  return (
    <div>
      <h1>Gestión de Pagos</h1>
      <form onSubmit={agregarPago}>
        <div>
          <label>Productor:</label>
          <input
            type="text"
            name="productor"
            value={formData.productor}
            onChange={handleChange}
            placeholder="Nombre del productor"
            required
          />
        </div>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            placeholder="Usuario"
            required
          />
        </div>
        <div>
          <label>Mes:</label>
          <input
            type="month"
            name="mes"
            value={formData.mes}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Total Pago:</label>
          <input
            type="number"
            name="total_pago"
            value={formData.total_pago}
            onChange={handleChange}
            placeholder="Total del pago"
            required
          />
        </div>
        <button type="submit">Agregar Pago</button>
      </form>
      <h2>Lista de Pagos</h2>
      <ul>
        {pagos.map((pago) => (
          <li key={pago.id}>
            {pago.productor} - {pago.usuario} - {pago.mes} - ${pago.total_pago}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagos;