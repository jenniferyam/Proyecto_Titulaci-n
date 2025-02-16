    import React from "react";

    const Recommendations = () => {
      return (
        <section className="my-5 p-4" style={{ background: "linear-gradient(to right, #f9f9f9, #ffffff)" }}>
      <div className="text-center mb-4">
        <h2 className="text-primary fw-bold">
          <i className="bi bi-box-seam"></i> Recomendaciones - Acopio
        </h2>
        <p className="text-muted">Sigue estas recomendaciones para garantizar la calidad e higiene de la leche.</p>
      </div>
    
      <div className="row">
        {[
          { icon: "bi bi-droplet", title: "Higiene", text: "Mantén los equipos de ordeño siempre limpios y desinfectados.", color: "text-primary" },
          { icon: "bi bi-heart-pulse", title: "Condiciones de las Vacas", text: "Realiza chequeos sanitarios regulares para garantizar la calidad de la leche.", color: "text-success" },
          { icon: "bi bi-thermometer-snow", title: "Temperatura al Ordeño", text: "Mantén la leche a 4°C inmediatamente después del ordeño.", color: "text-info" },
          { icon: "bi bi-thermometer", title: "Temperatura de Almacenamiento", text: "Utiliza tanques de refrigeración adecuados para evitar la contaminación.", color: "text-danger" },
          { icon: "bi bi-clock-history", title: "Tiempo de Almacenamiento", text: "La leche debe ser procesada en un máximo de 24 horas después de su recolección.", color: "text-warning" },
          { icon: "bi bi-truck", title: "Transporte Seguro", text: "Usa vehículos refrigerados para transportar la leche a las plantas de procesamiento.", color: "text-dark" },
          { icon: "bi bi-clipboard-check", title: "Control de Calidad", text: "Realiza pruebas de calidad como pH y conteo de bacterias antes del almacenamiento.", color: "text-secondary" },
          { icon: "bi bi-person-badge", title: "Capacitación del Personal", text: "Capacita a los trabajadores en buenas prácticas de higiene y manejo de leche.", color: "text-success" },
          { icon: "bi bi-box", title: "Uso de Envases Adecuados", text: "Utiliza envases sanitizados y certificados para el almacenamiento de leche.", color: "text-primary" }
        ].map((item, index) => (
          <div className="col-md-4 mt-3" key={index}>
            <div 
              className="card shadow-sm border-0 p-3 animate-card"
              style={{
                borderRadius: "12px",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div className="card-body text-center">
                <h5 className={`card-title ${item.color} fw-bold`}>
                  <i className={`${item.icon} fs-3`}></i> {item.title}
                </h5>
                <p className="card-text">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    
      
      );
    };
    
    export default Recommendations;
    
