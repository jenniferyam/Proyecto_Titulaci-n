import React, { useState, useEffect } from "react";
import axios from "axios";

const Pagos = () => {
  const [productores, setProductores] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [totalPago, setTotalPago] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pagosPerPage = 5;

  const [paymentData, setPaymentData] = useState({
    productor_id: "",
    fecha: new Date().toISOString().split("T")[0], // Inicializar con la fecha actual
  });

  useEffect(() => {
    fetchPagos();
  }, []);

  // 🔹 Obtener pagos registrados
  const fetchPagos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/pagos/");
      setPagos(response.data);
    } catch (error) {
      console.error("❌ Error al obtener pagos:", error);
    }
  };

  // 🔹 Obtener entregas de la fecha seleccionada
  useEffect(() => {
    const fetchEntregas = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/entregas/?fecha=${paymentData.fecha}`);
            setEntregas(response.data);

            const productoresFiltrados = [
                ...new Set(response.data.map((entrega) => entrega.productor.id)),
            ];

            fetchProductores(productoresFiltrados);
        } catch (error) {
            console.error("❌ Error al obtener entregas:", error);
        }
    };

    fetchEntregas();
  }, [paymentData.fecha]); // ✅ Ahora incluye la fecha como dependencia

  // 🔹 Obtener productores que entregaron en la fecha seleccionada
  const fetchProductores = async (productoresFiltrados) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/productores/");
      const productoresFiltradosData = response.data.filter((p) =>
        productoresFiltrados.includes(p.id)
      );
      setProductores(productoresFiltradosData);
    } catch (error) {
      console.error("❌ Error al obtener productores:", error);
    }
  };

  // 🔹 Manejar cambios en el input
  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  // 🔹 Calcular el monto total usando la fecha del input
  const handleCalcular = async () => {
    const { productor_id, fecha } = paymentData;

    if (!productor_id || !fecha) {
        alert("❌ Debe seleccionar un productor y una fecha.");
        return;
    }

    try {
        const entregasFiltradas = entregas.filter(
            (entrega) => entrega.productor.id === parseInt(productor_id) &&
                         entrega.fecha.split("T")[0] === fecha
        );

        if (entregasFiltradas.length === 0) {
            alert(`⚠️ No hay entregas registradas para este productor en ${fecha}.`);
            setTotalPago(0);
            return;
        }

        const totalCantidad = entregasFiltradas.reduce(
            (acc, entrega) => acc + parseFloat(entrega.cantidad),
            0
        );

        // 🔹 Obtener precio de la fecha seleccionada y FILTRARLO correctamente
        const preciosResponse = await axios.get(`http://127.0.0.1:8000/api/precios/?fecha=${fecha}`);

        if (!preciosResponse.data.length) {
            alert(`⚠️ No hay precio registrado para la fecha ${fecha}.`);
            setTotalPago(0);
            return;
        }

        // ✅ Filtrar el precio exacto de la fecha seleccionada
        const precioData = preciosResponse.data.find(item => item.fecha === fecha);
        
        if (!precioData) {
            alert(`⚠️ No se encontró un precio exacto para la fecha ${fecha}.`);
            setTotalPago(0);
            return;
        }

        const precio = parseFloat(precioData.precio);
        const total = (totalCantidad * precio) - (totalCantidad * 0.03);

        console.log(`✅ Monto total a pagar: ${total.toFixed(2)}`);
        setTotalPago(total.toFixed(2));
    } catch (error) {
        console.error("❌ Error en la operación:", error);
        alert("Pago ya realizado.");
    }
  };

  const handleRegistrarPago = async () => {
    if (!paymentData.productor_id || totalPago <= 0) {
      alert("❌ Debe calcular el pago antes de registrar.");
      return;
    }
  
    // ✅ Validar que no exista un pago registrado para el mismo productor y fecha
    const pagoExistente = pagos.find(
      (pago) =>
        pago.productor_id === parseInt(paymentData.productor_id) &&
        pago.fecha === paymentData.fecha
    );
  
    if (pagoExistente) {
      alert("⚠️ Ya existe un pago registrado para este productor en esta fecha.");
      return;
    }
  
    const data = {
      productor_id: parseInt(paymentData.productor_id),
      total: parseFloat(totalPago),
      fecha: paymentData.fecha,
    };
  
    try {
      await axios.post("http://127.0.0.1:8000/api/pagos/crear/", data);
      alert("✅ Pago registrado exitosamente.");
      setTotalPago(0);
      setPaymentData({ productor_id: "", fecha: new Date().toISOString().split("T")[0] });
  
      fetchPagos(); // 🔄 Actualizar la lista de pagos
    } catch (error) {
      console.error("❌ Error al registrar el pago:", error);
      alert("Usuario ya pagado.");
    }
  };
  

  // 🔹 Calcular el índice del primer y último pago en la página actual
  const indexOfLastPago = currentPage * pagosPerPage;
  const indexOfFirstPago = indexOfLastPago - pagosPerPage;
  const currentPagos = pagos.slice(indexOfFirstPago, indexOfLastPago);
  
  // 🔹 Total de páginas
  const totalPages = Math.ceil(pagos.length / pagosPerPage);

  // 🔹 Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 🔹 Función para ir a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-4">
     <div className="text-center mb-4 p-3" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h1> Panel de Pagos</h1>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card border-primary shadow">
            <div className="card-header bg-primary text-white text-center">Registrar Pago</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Productor:</label>
                  <select
                    name="productor_id"
                    value={paymentData.productor_id}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Seleccione un productor</option>
                    {productores.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha:</label>
                  <input
                    type="date"
                    name="fecha"
                    value={paymentData.fecha}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Monto Total:</label>
                  <input type="number" value={totalPago} className="form-control" readOnly />
                </div>

                <button type="button" className="btn btn-info w-100 mb-2" onClick={handleCalcular}>
                  Calcular
                </button>
                <button type="button" className="btn btn-primary w-100" onClick={handleRegistrarPago}>
                  Registrar Pago
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h4 className="text-center">📋 Lista de Pagos</h4>
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Productor</th>
                <th>Fecha</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {currentPagos.map((pago) => (
                <tr key={pago.id}>
                  <td>{pago.id}</td>
                  <td>{pago.nombre_productor || "Desconocido"}</td>
                  <td>{pago.fecha}</td>
                  <td>${parseFloat(pago.total).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔹 Controles de paginación */}
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-secondary" onClick={prevPage} disabled={currentPage === 1}>
              ← Anterior
            </button>
            <span className="fw-bold">Página {currentPage} de {totalPages}</span>
            <button className="btn btn-secondary" onClick={nextPage} disabled={currentPage === totalPages}>
              Siguiente →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pagos;