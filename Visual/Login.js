import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ correo: "", contrasenia: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/usuarios/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("usuario_id", data.usuario_id);
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 500);
      } else {
        setError(data.error || "Error en el inicio de sesión");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setRecoveryMessage("");
    try {
      const response = await fetch("http://127.0.0.1:8000/usuarios/recover-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: recoveryEmail }),
      });
      const data = await response.json();

      if (response.ok) {
        setRecoveryMessage("Se ha enviado un correo con instrucciones para restablecer la contraseña.");
      } else {
        setRecoveryMessage(data.error || "No se pudo procesar la solicitud.");
      }
    } catch (error) {
      setRecoveryMessage("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Inicio de Sesión</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="correo" 
                    name="correo" 
                    placeholder="Ingrese su correo" 
                    value={formData.correo} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contrasenia" className="form-label">Contraseña</label>
                  <div className="input-group">
                    <input
                      type={mostrarContrasenia ? "text" : "password"}
                      className="form-control"
                      id="contrasenia"
                      name="contrasenia"
                      placeholder="Ingrese su contraseña"
                      value={formData.contrasenia}
                      onChange={handleChange}
                      required
                    />
                  <button
  type="button"
  className="btn btn-outline-secondary"
  onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
  style={{
    fontSize: "1.5rem",    // Tamaño del icono
    padding: "0.25rem",    // Espacio interno
    width: "45px",         // Ajusta el ancho del botón
    height: "38px",        // Ajusta la altura del botón
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {mostrarContrasenia ? "🚫" : "👁️"}
</button>

                  </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
              </form>
              
            </div>
          </div>
        </div>
      </div>

   
    </>
  );
};

export default Login;