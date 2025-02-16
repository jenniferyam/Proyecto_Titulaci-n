import React from "react";

const Contacts = () => {
  return (
    <div className="modal fade" id="contactosModal" tabIndex="-1" aria-labelledby="contactosModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="contactosModalLabel">Contactos</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {/* Texto de contacto */}
              <div style={{ flex: 1, textAlign: "justify" }}>
                <p>
                  Puedes contactarnos a través de nuestro correo electrónico:  
                  <a href="mailto:sanpedrodelicto@hotmail.com" className="text-primary">sanpedrodelicto@hotmail.com</a>,  
                  o llamarnos al número <strong>(03) 233 4113</strong>.
                </p>
                <p>
                  También estamos activos en redes sociales, donde compartimos todas nuestras noticias y eventos. 
                  Además, puedes enviarnos un mensaje directo a través de WhatsApp haciendo clic en el siguiente enlace:
                </p>
                <p>
                  <a href="https://wa.me/593994942293" target="_blank" className="text-success fw-bold" rel="noopener noreferrer">
                    Enviar mensaje por WhatsApp
                  </a>
                </p>
              </div>
              {/* Imagen de contacto */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1935/1935165.png"
                  alt="Contactos"
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

export default Contacts;
