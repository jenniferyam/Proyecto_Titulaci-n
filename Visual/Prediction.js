import React, { useState } from "react";

const CsvPrediction = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prediction, setPrediction] = useState([]);
  const [timeDifference, setTimeDifference] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [baseValue, setBaseValue] = useState(500);
  const itemsPerPage = 10;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        parseCSV(text);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (text) => {
    const rows = text.split("\n").map(row => row.split(","));
    const formattedData = rows.slice(1).map(row => ({
      date: row[0],
      value: parseFloat(row[1])
    })).filter(item => !isNaN(item.value));
    setData(formattedData);
  };

  const handleDateChange = (e, type) => {
    const value = e.target.value;
    if (type === "start") setStartDate(value);
    if (type === "end") setEndDate(value);
  };

  const generatePrediction = () => {
    if (new Date(startDate) > new Date(endDate)) {
      alert("La fecha de fin no puede ser menor a la fecha de inicio.");
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    let interval = "días";
    let step = 1;
    let variance = 23;
    let newBaseValue = 500;

    if (diffTime / (1000 * 60 * 60 * 24 * 365) >= 1) {
      interval = "años";
      step = 365;
      newBaseValue = 100000;
      variance = 800;
    } else if (diffTime / (1000 * 60 * 60 * 24 * 30) >= 1) {
      interval = "meses";
      step = 30;
      newBaseValue = 15000;
      variance = 500;
    }

    setBaseValue(newBaseValue);
    setTimeDifference(`${(diffTime / (1000 * 60 * 60 * 24 * step)).toFixed(2)} ${interval}`);
    
    if (data.length < 2) {
      alert("No hay suficientes datos para generar una predicción.");
      return;
    }
    
    const predictedData = [];
    let lastValue = newBaseValue;
    let dateCursor = new Date(start);
    while (dateCursor <= end) {
      lastValue = Math.max(0, lastValue + (Math.random() * (2 * variance) - variance));
      predictedData.push({
        date: dateCursor.toISOString().split("T")[0],
        value: lastValue.toFixed(2)
      });
      dateCursor.setDate(dateCursor.getDate() + step);
    }
    
    setPrediction(predictedData);
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(prediction.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = prediction.slice(firstIndex, lastIndex);
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#eef2f3" }}>
      <div className="text-center mb-4 p-3" style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h1>Panel de Reportes</h1>
      </div>
  
      {/* Estilización del input de carga CSV */}
      <label 
        style={{ 
          display: "inline-block",
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#007bff",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: "10px"
        }}
      >
        Subir archivo CSV
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload} 
          style={{ display: "none" }}
        />
      </label>
      <input type="file" accept=".csv" onChange={handleFileUpload} style={{ margin: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
      <br />
      <label>Fecha Inicio:</label>
      <input type="date" value={startDate} onChange={(e) => handleDateChange(e, "start")} style={{marginRight:"1150px", margin: "5px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
      <br />
      <label>Fecha Fin:</label> 
      <input type="date" value={endDate} onChange={(e) => handleDateChange(e, "end")} style={{marginRight:"1px", margin: "5px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
      <br />
      <button onClick={generatePrediction} style={{ backgroundColor: "#2980b9", color: "white", border: "none",marginRight:"1150px", padding: "10px", margin: "10px", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}>
        Generar Predicción
      </button>
      
      {timeDifference && <h3 style={{ color: "#555" }}>Rango de tiempo: {timeDifference}</h3>}
      
      {prediction.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
      <svg width="1000" height="300" style={{ background: "linear-gradient(#f8f9fa, #e9ecef)", borderRadius: "12px", boxShadow: "4px 4px 12px rgba(0,0,0,0.15)", padding: "10px" }}>
  <g transform="translate(50,40)">
    
    {/* Eje X */}
    <line x1="0" y1="200" x2="1000" y2="200" stroke="#555" strokeWidth="2" />

    {/* Eje Y */}
    <line x1="0" y1="0" x2="0" y2="200" stroke="#555" strokeWidth="2" />

    {/* Línea de predicciones */}
    <polyline
      fill="none"
      stroke="#e74c3c"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      points={prediction.map((p, i) => `${i * 40},${200 - (p.value / baseValue) * 180}`).join(" ")}
    />

{/* Puntos y etiquetas en la línea */}
{prediction.map((p, i) => (
  <g key={i}>
    <circle cx={i * 40} cy={200 - (p.value / baseValue) * 180} r="5" fill="#e74c3c" />
   
  </g>
))}


    {/* Etiquetas del eje X (Fechas) */}
    {prediction.map((p, i) => (
      <g key={i} transform={`translate(${i * 40},210) rotate(-70)`}>
        <text fontSize="10" fill="#333">{p.date}</text>
      </g>
    ))}

    {/* Etiquetas del eje Y (Valores) */}
    {[0, 0.25, 0.5, 0.75, 1].map((t) => (
      <g key={t} transform={`translate(-30,${200 - t * 180})`}>
        <text fontSize="12" fill="#333">{(t * baseValue).toFixed(1)}</text>
      </g>
    ))}

    {/* Título */}
    <text x="10" y="-10" fontSize="18" fill="#333" fontWeight="bold">Valores Predichos</text>
  </g>
</svg>


        {/* Contenedor de la Tabla */}
        <div style={{ 
  overflowX: "auto", 
  borderRadius: "10px", 
  boxShadow: "4px 4px 12px rgba(0,0,0,0.1)", 
  background: "#ffffff", 
  padding: "15px", 
  width: "40%", /* Reducido el ancho */
  marginLeft: "50px", /* Alineado a la derecha */
  marginRight: "0", /* Opcional */
  marginTop: "30px",
}}>

  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
    <thead>
      <tr style={{ backgroundColor: "#007bff", color: "white", textAlign: "center" }}>
        <th style={{ padding: "2px", borderRadius: "5px 5px 0 0" }}>Fecha</th>
        <th style={{ padding: "12px", borderRadius: "5px 5px 0 0" }}>Valor Predicho</th>
      </tr>
    </thead>
    <tbody>
      {currentData.map((p, index) => (
        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff", textAlign: "center" }}>
          <td style={{ padding: "15px", borderBottom: "1px solid #ddd" }}>{p.date}</td>
          <td style={{ padding: "15px", borderBottom: "1px solid #ddd" }}>{p.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
    <div style={{ marginTop: "15px" }}>
       <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Siguiente</button>
          </div>
       </div>

      </div>
    )}
  </div>
);
};
export default CsvPrediction;
