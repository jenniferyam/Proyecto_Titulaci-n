import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      {/* Encabezado */}
      <header style={styles.header}>Panel de Administración - Asociación San Pedro de Licto</header>

      {/* Mensaje de bienvenida */}
      <h2 style={styles.welcomeText}>Opciones de Administración</h2>

      {/* Panel de opciones */}
      <div style={styles.panel}>
        <div style={styles.buttonsContainer}>
          <Link to="/admin/users" style={{ ...styles.button, ...styles.usuarios }}>
            <span style={styles.icon}>👥</span> Gestionar Usuarios
          </Link>
          <Link to="/admin/productores" style={{ ...styles.button, ...styles.productores }}>
            <span style={styles.icon}>👤</span> Gestionar Productores
          </Link>
          <Link to="/admin/entregas" style={{ ...styles.button, ...styles.registroLeche }}>
            <span style={styles.icon}>🥛</span> Gestionar Registro de Leche
          </Link>
          <Link to="/admin/pagos" style={{ ...styles.button, ...styles.pagos }}>
            <span style={styles.icon}>💰</span> Gestionar Pagos
          </Link>
               <Link to="/admin/reportes" style={{ ...styles.button, ...styles.reportes }}>
            <span style={styles.icon}>📑</span> Gestionar Reportes
          </Link>
          <Link to="/admin/prediccion" style={{ ...styles.button, ...styles.prediccion }}>
            <span style={styles.icon}>📊</span> Gestionar Predicción
          </Link>
     
        </div>
      </div>
    </div>
  );
};

const styles = {
  /*  Fondo general */
  container: {
    background: "linear-gradient(180deg, #f8f9fa, #e3f2fd)",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  },

  /*  Encabezado */
  header: {
    background: "#007bff",
    color: "white",
    textAlign: "center",
    padding: "2rem",
    width: "100%",
    fontSize: "2rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    borderRadius: "0px 0px 20px 20px",
  },

  /* Texto de bienvenida */
  welcomeText: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    margin: "20px 0",
    textAlign: "center",
    color: "#0056b3",
  },

  /*  Panel */
  panel: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "1100px",
    textAlign: "center",
  },

  /*  Contenedor de botones */
  buttonsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  /* 🔘 Botón general */
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    fontWeight: "bold",
    padding: "20px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "white",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    height: "80px",
  },

  /*  Efecto hover */
  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
  },

  /*  Colores personalizados */
  usuarios: { background: "linear-gradient(90deg, #007bff, #00c6ff)" , color: "black" },
  productores: { background: "linear-gradient(90deg, #ff9900, #ffcc00)", color: "black" },
  registroLeche: { background: "linear-gradient(90deg, #9900ff, #cc66ff)",color: "black"  },
  pagos: { background: "linear-gradient(90deg, #00cc99, #00ffcc)",color: "black"  },
  prediccion: { background: "linear-gradient(90deg,rgb(19, 174, 161),rgb(132, 216, 225))", color: "black" },
  reportes: { background: "linear-gradient(90deg, #cc0066, #ff3399)",color: "black"  },

  /*  Ícono */
  icon: {
    fontSize: "2rem",
    marginRight: "10px",
  },
};

export default AdminDashboard;
