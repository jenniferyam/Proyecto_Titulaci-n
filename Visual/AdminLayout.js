import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Para la localización de las páginas

const AdminLayout = ({ children }) => {

  // Para saber si estoy en la página del admin o en las otras páginas
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("admin-mode");

    return () => {
      document.body.classList.remove("admin-mode");  // Elimina la clase al salir
    };
  }, []);

  return (
    <div className="admin-container">
    

      <div className="admin-content"> {children} </div>

      <section className="d-flex justify-content-between p-1">
      {location.pathname === "/admin" ? (
          <>
            <button
              className="btn btn-danger"
              onClick={() => window.location.href = '/'}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => window.location.href = "/admin"}
          >
            Regresar al Administrador
          </button>
        )}
      </section>

      <footer className="text-center p-3 mt-3">
        <p>© 2025 Asociación San Pedro de Licto. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;