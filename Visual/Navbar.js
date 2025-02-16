import React from "react";

const Navbar = () => {
  return (
    <header className="p-3">
      <div className="d-flex align-items-center">
        <img
          src="ruta_del_sello.png"
          alt="Sello Asociación San Pedro de Licto"
          className="logo-sello me-3"
        />
        <h1 className="mb-0">Asociación de Productores San Pedro de Licto</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link text-white" data-bs-toggle="modal" data-bs-target="#contactosModal">
                <i className="bi bi-telephone"></i> Contactos
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;