import React from "react";

const Location = () => {
  return (
    <div className="modal fade" id="ubicacionModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ubicación</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {/* Texto de ubicación */}
              <div style={{ flex: 1, textAlign: "justify" }}>
                <p>
                  Nos encontramos ubicados en la Parroquia Licto, Provincia de Chimborazo, Cantón Riobamba.
                  Nuestra sede principal está en la cabecera del pueblo, siendo esta el punto de 
                  encuentro para todas nuestras actividades y reuniones.
                </p>
                <p>
                  <a href="https://maps.app.goo.gl/WLeQGqgNuWPiV8qs6" target="_blank" rel="noopener noreferrer" 
                     style={{ color: "#0056b3", textDecoration: "underline" }}>
                    <i className="bi bi-geo-alt"></i> Ver en Google Maps
                  </a>
                </p>
              </div>
              {/* Imagen de ubicación */}
              <div style={{ flexShrink: 0 }}>
                <img 
                  src="https://img.freepik.com/vector-gratis/mapa-gris-pin-ubicacion_78370-4979.jpg" 
                  alt="Ubicación" 
                  style={{ width: "100px", height: "auto", borderRadius: "8px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;