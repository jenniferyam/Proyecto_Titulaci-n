import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importar componentes
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Carousel from "./components/Carousel";
import Recommendations from "./components/Recommendations";
import Contacts from "./components/Contacts";
import About from "./components/About";
import Location from "./components/Location";
import Login from "./components/Login";

// Importar páginas del admin
import AdminLayout from "./pages/AdminLayout"; 
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import Pagos from "./pages/Pagos";
import Prediction from "./pages/Prediction";
import Entregas from "./pages/Entregas";
import Productores from "./pages/Productores";
import Reportes from "./pages/Reportes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página Principal */}
        <Route path="/" element={
          <div className="container-fluid">
            <Header />
            <Sidebar />
            <div className="main-content" style={{ marginLeft: "220px", padding: "20px" }}>
              <Carousel />
              <Recommendations />
            </div>

            <Contacts />

            <footer className="text-center py-4" style={{ backgroundColor: "#0056b3", color: "white" }}>
              <p>&copy; 2025 Asociación San Pedro de Licto. Todos los derechos reservados.</p>
            </footer>

            <Location />
            <About />
            <Login />
          </div>
        } />

        {/* Rutas de Administración - Usando el AdminLayout */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
        <Route path="/admin/pagos" element={<AdminLayout><Pagos /></AdminLayout>} />
        <Route path="/admin/prediccion" element={<AdminLayout><Prediction /></AdminLayout>} />
        <Route path="/admin/entregas" element={<AdminLayout><Entregas /></AdminLayout>} />
        <Route path="/admin/productores" element={<AdminLayout><Productores /></AdminLayout>} />
        <Route path="/admin/reportes" element={<AdminLayout><Reportes /></AdminLayout>} />
      </Routes>
    </Router>
  );
};

export default App;