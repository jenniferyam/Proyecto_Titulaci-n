import React from "react";

const About = () => {
  return (
    <div className="modal fade" id="aboutModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Acerca de Nosotros</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body d-flex align-items-center">
            <p className="flex-grow-1 text-justify" style={{ textAlign: "justify" }}>
              La Asociación San Pedro de Licto fue creada con el propósito de promover el desarrollo económico y cultural de los productores locales. A través de la colaboración y el esfuerzo conjunto, trabajamos para preservar las tradiciones y costumbres de nuestra comunidad mientras buscamos mejorar las oportunidades para todos nuestros miembros.
            </p>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/896/896841.png" 
              alt="Asociación" 
              className="img-fluid ms-3" 
              style={{ width: '100px', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;