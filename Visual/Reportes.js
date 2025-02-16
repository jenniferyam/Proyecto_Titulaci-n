import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Reportes = () => {
  const [reportType, setReportType] = useState("entregas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    if (new Date(endDate) < new Date(startDate)) {
      alert("⚠️ La fecha de fin no puede ser menor a la fecha de inicio.");
      return;
    }
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("⚠️ Debe seleccionar un rango de fechas.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("⚠️ La fecha de fin no puede ser menor a la fecha de inicio.");
      return;
    }

    setLoading(true);
    try {
      let url =
        reportType === "entregas"
          ? `http://127.0.0.1:8000/reportes/entregas/?start_date=${startDate}&end_date=${endDate}`
          : `http://127.0.0.1:8000/reportes/pagos/?start_date=${startDate}&end_date=${endDate}`;

      const response = await axios.get(url);
      
      console.log("📥 Datos recibidos de la API:", response.data);  // 🔥 Verificación de datos en la consola
    
      setReportData(response.data);
    } catch (error) {
      console.error("❌ Error al obtener el reporte:", error);
      alert("Hubo un error al generar el reporte.");
    }
    setLoading(false);
  };

  const generatePDF = () => {
    if (reportData.length === 0) {
      alert("⚠️ No hay datos para generar el PDF.");
      return;
    }

    const doc = new jsPDF();
    let totalSum = 0;

    doc.setFontSize(16);
    doc.text(`Reporte de ${reportType === "entregas" ? "Entregas" : "Pagos"}`, 14, 15);
    doc.setFontSize(12);
    doc.text(`Desde: ${startDate}  Hasta: ${endDate}`, 14, 22);

    const tableColumn = ["Fecha", reportType === "entregas" ? "Litros" : "Monto", "Productor"];

    const tableRows = reportData.map((item) => {
      let cantidad = reportType === "entregas" ? item.cantidad : parseFloat(item.total).toFixed(2);
      totalSum += parseFloat(cantidad);
      
      let productorNombre = reportType === "pagos" 
        ? item.nombre_productor || "Desconocido"  // ✅ Corregido para pagos
        : item.productor ? item.productor.nombre : "Desconocido";  // ✅ Corregido para entregas

      return [item.fecha, cantidad, productorNombre];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.text(`Total: ${totalSum.toFixed(2)} ${reportType === "entregas" ? "Litros" : "USD"}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save(`Reporte_${reportType}_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const totalSum = reportData.reduce(
    (acc, item) => acc + parseFloat(reportType === "entregas" ? item.cantidad : item.total),
    0
  );

  return (
    <div className="container mt-4">
      <div className="text-center mb-4 p-3" style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h1>Panel de Reportes</h1>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card border-primary shadow">
            <div className="card-header bg-primary text-white text-center">Generar Reporte</div>
            <div className="card-body">
              <form onSubmit={handleGenerateReport}>
                <div className="mb-3">
                  <label className="form-label">Tipo de Reporte:</label>
                  <select className="form-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <option value="entregas">Entregas</option>
                    <option value="pagos">Pagos</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha de Inicio:</label>
                  <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha de Fin:</label>
                  <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Generar Reporte
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h4 className="text-center">📋 Lista de Reportes</h4>
          <div className="table-responsive">
            {loading ? (
              <p className="text-center">Cargando...</p>
            ) : (
              <>
                <table className="table table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Fecha</th>
                      <th>{reportType === "entregas" ? "Litros" : "Monto"}</th>
                      <th>Productor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.length > 0 ? (
                      reportData.map((item, index) => {
                        let productorNombre = reportType === "pagos" 
                          ? item.nombre_productor || "Desconocido"
                          : item.productor ? item.productor.nombre : "Desconocido";

                        return (
                          <tr key={index}>
                            <td>{item.fecha}</td>
                            <td>{reportType === "entregas" ? item.cantidad : `$${parseFloat(item.total).toFixed(2)}`}</td>
                            <td>{productorNombre}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">⚠️ No hay datos para el rango de fechas seleccionado.</td>
                      </tr>
                    )}
                  </tbody>
                  {reportData.length > 0 && (
                    <tfoot>
                      <tr className="table-secondary">
                        <td><strong>Total</strong></td>
                        <td><strong>{totalSum.toFixed(2)} {reportType === "entregas" ? "Litros" : "USD"}</strong></td>
                        <td></td>
                      </tr>
                    </tfoot>
                  )}
                </table>

                <button className="btn btn-danger mt-2" onClick={generatePDF} disabled={reportData.length === 0}>
                  📄 Descargar PDF
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
