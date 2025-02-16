import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

// Importar el archivo css
import "../styles/sidebar.css";
import Tradiciones from "../components/Tradiciones";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(null);

  // Contenido de cada modal
  const modalContent = {
    tradiciones: {
      title: "Tradiciones",
      content: <Tradiciones setShowModal={setShowModal} />,
    },
    historia: {
      title: "Historia",
      content: (
        <ul className="custom-bullets text-justify">
          <li><strong>1540:</strong> Licto fue fundada por el militar Diego de Torres.</li>
          <li><strong>1588:</strong> Fundación de Licto atribuida a Juan Clavijo por la Real Audiencia de Quito.</li>
          <li><strong>1575:</strong> Primera partida bautismal registrada en Licto, firmada por Fray Francisco Diez.</li>
          <li><strong>1605:</strong> Licto es mencionada como San Pedro de Licto con siete ayllus.</li>
          <li><strong>1621:</strong> La encomienda de Licto pasa a la Real Corona.</li>
          <li><strong>1735-1739:</strong> La encomienda se extiende a Chambo, Quimiag, Mitimás y Sisibíes.</li>
          <li><strong>Ubicación:</strong> A 18 km al sureste de Riobamba, provincia de Chimborazo.</li>
          <li><strong>Población:</strong> 7,499 habitantes, representando el 2% de la población provincial.</li>
          <li><strong>Superficie:</strong> Aproximadamente 6,500 hectáreas.</li>
          <li><strong>Comunas:</strong> 27 comunas distribuidas en tres sectores (bajo, medio y alto).</li>
          <li><strong>Límites:</strong> 
            <ul>
              <li><strong>Norte:</strong> Cantón y Río Chambo.</li>
              <li><strong>Sur:</strong> Parroquia Cevadas.</li>
              <li><strong>Este:</strong> Parroquia Pungalá y Río Chambo.</li>
              <li><strong>Oeste:</strong> Parroquias Flores y Punín.</li>
            </ul>
          </li>
        </ul>
      ),
    },
    directiva: {
      title: "Directiva Actual",
      content: (
        <div className="d-flex align-items-start">
          <div>
            <p className="text-justify">
            <li><strong>Presidente:</strong> Enrique Yambay</li>
        <li><strong>Vicepresidente:</strong> Segundo Yambay</li>
        <li><strong>Secretario:</strong> Juan Zambrano</li>
        <li><strong>Administrador:</strong> Ángel Yambay</li>
        <li><strong>Contadora:</strong> Rosario Tenelema</li>
            </p>
          </div>
          <img 
            src="https://scontent.fatf2-1.fna.fbcdn.net/v/t1.6435-9/91059784_204462614220180_179863360521633792_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGdlG3a4_KmtOIdXRbVpjJltM-mfs_mQ_60z6Z-z-ZD_jgZXQNeNMHUwRQzVAYU9fFvvRewvA0kIW5kJNRQXUwj&_nc_ohc=8snJ-TEpoJ4Q7kNvgGDhEj8&_nc_oc=AdhXQRisZ50JezGLBfyij9zxB46zxm7gYuZ4z6Z1_gBwR3pUSI1_HjM-9kyyrauSYTI7vhaXPygmccXWeYdqszTZ&_nc_zt=23&_nc_ht=scontent.fatf2-1.fna&_nc_gid=A2ltyh1ITBrL6ZDG1GPUMI6&oh=00_AYDnyrAfstlyl6JXkTNUq0J27EA13O0lYbMZ5vuVBpWsmQ&oe=67D3AEB2" 
            alt="Directiva San Pedro de Licto" 
            className="ms-3 img-fluid rounded shadow" 
            style={{ width: "300px", height: "auto" }}
          />
        </div>
      ),
    },
    reglamento: {
      title: "Reglamento",
      content: (
        <p className="text-justify">
          El reglamento de la Asociación San Pedro de Licto establece las normas que guían las actividades y decisiones dentro de la organización. Este reglamento es fundamental para mantener la armonía 
          y asegurar que todos los miembros trabajen de manera ética y eficiente.{" "}
          <a href="https://drive.google.com/file/d/1TdN7KvbddDD8613O8J220XXY26faojzy/view?usp=sharing" 
             target="_blank" rel="noopener noreferrer">
            Ver reglamento completo
          </a>
        </p>
      ),
    },
  };

  return (
    <>
      {/* Menú lateral */}
      <nav className="vertical-nav">
        <ul className="nav flex-column">
          {Object.keys(modalContent).map((key) => (
            <li key={key} className="nav-item mb-2">
              <Button
                className="nav-link text-white"
                variant="link"
                onClick={() => setShowModal(key)}
              >
                <i className={`bi bi-${key === "tradiciones" ? "flag" 
                      : key === "historia" ? "book" 
                      : key === "platos" ? "egg-fried" 
                      : key === "directiva" ? "person-lines-fill" 
                      : "file-earmark-text"}`}></i>{" "}
                {modalContent[key].title}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modales */}
      {showModal && modalContent[showModal] && (
        <Modal show={true} onHide={() => setShowModal(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{modalContent[showModal].title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent[showModal].content}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(null)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Sidebar;
