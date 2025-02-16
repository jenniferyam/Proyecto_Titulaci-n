import React from "react";

const Header = () => {
  return (
    <header
      className="p-4 shadow-lg"
      style={{
        background: "linear-gradient(90deg, #003366, #007bff)",
        color: "white",
        borderBottom: "4px solid #ffcc00",
        padding: "80px 80px"
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src="https://scontent.fatf2-1.fna.fbcdn.net/v/t39.30808-6/469856924_1272753557322258_8419782961566076390_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHsOCu7ip8vyvXTb2jxXWf2jWq8_yMRP9ONarz_IxE_04v9tcmF6f_Etwcmewe9ICHlUQUIRWOITWYjh3Notf6g&_nc_ohc=vvm7h6fDW-kQ7kNvgEnoyH3&_nc_oc=AdhuKjzoQPuJrDsBQNCr9m9kGyMWWZeYRg2hR2sc5L2TnNyHIJFa5lxmWbsb9wy5KamF8ICg-gOrrFo-yT7RBMxx&_nc_zt=23&_nc_ht=scontent.fatf2-1.fna&_nc_gid=ArUi-JNPMCorG9GiP6SG46O&oh=00_AYAyzr5MAm71V-R3DQiKS7NHmMk8knaKaVitW_wx9vf3iw&oe=67B1DB8D"
            alt="Sello Asociación San Pedro de Licto"
            className="me-3"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
              marginRight: "50px"
            }}
          />
          <h1 className="fw-bold" style={{ fontSize: "2rem", textShadow: "2px 2px 5px rgba(0,0,0,0.5)", margin: "0" }}>
            Asociación de Productores San Pedro de Licto
          </h1>
        </div>
        <nav>
          <ul className="nav d-flex justify-content-center" style={{ gap: "10px" }}>
            <li className="nav-item">
              <button
                className="nav-link text-white btn btn-link"
                data-bs-toggle="modal"
                data-bs-target="#aboutModal"
                style={{ transition: "0.3s", fontSize: "1.2rem", padding: "10px 15px" }}
                onMouseOver={(e) => (e.target.style.color = "#ffcc00")}
                onMouseOut={(e) => (e.target.style.color = "white")}
              >
                <i className="bi bi-info-circle"></i> Acerca de nosotros
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white btn btn-link"
                data-bs-toggle="modal"
                data-bs-target="#ubicacionModal"
                style={{ transition: "0.3s", fontSize: "1.2rem", padding: "10px 15px" }}
                onMouseOver={(e) => (e.target.style.color = "#ffcc00")}
                onMouseOut={(e) => (e.target.style.color = "white")}
              >
                <i className="bi bi-geo-alt"></i> Ubicación
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white btn btn-link"
                data-bs-toggle="modal"
                data-bs-target="#contactosModal"
                style={{ transition: "0.3s", fontSize: "1.2rem", padding: "10px 15px" }}
                onMouseOver={(e) => (e.target.style.color = "#ffcc00")}
                onMouseOut={(e) => (e.target.style.color = "white")}
              >
                <i className="bi bi-telephone"></i> Contactos
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white btn btn-link"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                style={{ transition: "0.3s", fontSize: "1.2rem", padding: "10px 15px" }}
                onMouseOver={(e) => (e.target.style.color = "#ffcc00")}
                onMouseOut={(e) => (e.target.style.color = "white")}
              >
                <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
