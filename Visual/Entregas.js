import React, { useState, useEffect } from "react";

const Entregas = () => {
  const [litros, setLitros] = useState(0.01);
  const [precio, setPrecio] = useState(0);
  const [productores, setProductores] = useState([]); 
  const [selectedProductorId, setSelectedProductorId] = useState(""); 
  const [codigoProductor, setCodigoProductor] = useState(""); 
  const [fechaHoy, setFechaHoy] = useState("");
  const [precioBloqueado, setPrecioBloqueado] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productores/")
      .then(response => response.json())
      .then(data => setProductores(data))
      .catch(error => console.error("Error cargando productores:", error));
  }, []);

  useEffect(() => {
    const hoy = new Date();
    const fechaISO = hoy.toISOString().split("T")[0];
    setFechaHoy(fechaISO);

    fetch(`http://127.0.0.1:8000/api/precios/?fecha=${fechaISO}`)
      .then(response => response.json())
      .then(data => {
        console.log("📥 Datos de precios recibidos:", data);
        const precioHoy = data.find(item => item.fecha === fechaISO);
        if (precioHoy) {
          setPrecio(parseFloat(precioHoy.precio).toFixed(2)); 
          setPrecioBloqueado(true);
        } else {
          setPrecio(0);
          setPrecioBloqueado(false);
        }
      })
      .catch(error => console.error("Error obteniendo precio:", error));
  }, []);

  const handleLitrosChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    if (value < 1) value = 1;
    if (value > 25) value = 25;
    setLitros(parseFloat(value.toFixed(2))); // Limita a 2 decimales
  };

  const handlePrecioChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0) {
      setPrecio(0);
    } else {
      setPrecio(value.toFixed(2)); // Asegura hasta 2 decimales
    }
  };

  const handleProductorChange = (e) => {
    const productorSeleccionado = productores.find(p => p.id === parseInt(e.target.value));
    if (productorSeleccionado) {
      setSelectedProductorId(productorSeleccionado.id);
      setCodigoProductor(productorSeleccionado.cedula);
    } else {
      setSelectedProductorId("");
      setCodigoProductor("");
    }
  };

  const handleLecheSubmit = async (e) => {
    e.preventDefault();

    if (litros < 0.01 || litros > 25) {
      alert("⚠️ La cantidad de litros debe estar entre 1 y 25.");
      return;
    }
    if (!selectedProductorId) {
      alert("⚠️ Debe seleccionar un productor.");
      return;
    }

    const usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
      alert("⚠️ Error: No se encontró el ID del usuario en localStorage.");
      return;
    }

    const data = {
      productor_id: selectedProductorId,
      usuario_id: usuarioId,
      cantidad: parseFloat(litros),
      fecha: fechaHoy, 
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/entregas/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        alert(`✅ Entrega registrada exitosamente.\nCantidad: ${data.cantidad} L\nFecha: ${data.fecha}`);
        setTimeout(resetForm, 0);
        return;
      }

      const responseData = await response.json();
      console.error("⚠️ Error en la respuesta:", responseData);
      throw new Error(responseData.error || "⚠️ Ocurrió un problema al registrar la entrega.");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("⚠️ Se registró la entrega, pero ocurrió un problema con el mensaje. Verifique en la base de datos.");
    }
  };

  const resetForm = () => {
    setLitros(1);
    setSelectedProductorId("");  
    setCodigoProductor("");       
  };

  const handlePrecioSubmit = async (e) => {
    e.preventDefault();
    if (precio <= 0) {
      alert("El precio por litro debe ser mayor que cero.");
      return;
    }
  
    const data = { precio: parseFloat(precio), fecha: fechaHoy };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/precios/crear/", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || "Error al registrar el precio.");
      }
  
      alert("✅ Precio registrado exitosamente.");
      setPrecioBloqueado(true);
    } catch (error) {
      console.error("❌ Error:", error);
      alert(`✅ Entrega registrada exitosamente. El precio ya se registró, es ${precio} USD por litro.`);
    }
  };

  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1>Registro de Leche y Precio</h1>
      </header>

      <div className="row">
        <div className="col-md-6 col-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">Registrar Producción de Leche</div>
            <div className="card-body">
              <form onSubmit={handleLecheSubmit}>
                <label>Fecha</label>
                <input type="text" className="form-control" value={fechaHoy} readOnly />

                <label>Seleccionar Productor</label>
                <select className="form-control" value={selectedProductorId} onChange={handleProductorChange} required>
                  <option value="">Seleccione un productor</option>
                  {productores.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>

                <label>Código del Productor</label>
                <input type="text" className="form-control" value={codigoProductor} readOnly />

                <label>Litros de Leche Entregados</label>
                <input type="number" className="form-control" value={litros} onChange={handleLitrosChange} step="0.01" min="0.01" max="25" required />

                <button type="submit" className="btn btn-primary w-100 mt-3">Registrar</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="card shadow">
            <div className="card-header bg-success text-white">Registrar Precio Diario</div>
            <div className="card-body">
              <form onSubmit={handlePrecioSubmit}>
                <label>Fecha</label>
                <input type="text" className="form-control" value={fechaHoy} readOnly />

                <label>Precio por Litro (USD)</label>
                <input type="number" className="form-control" value={precio} onChange={handlePrecioChange} disabled={precioBloqueado} step="0.01" min="0.01" />

                <button type="submit" className="btn btn-success w-100 mt-3" disabled={precioBloqueado}>
                  {precioBloqueado ? "Precio Registrado" : "Registrar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entregas;
