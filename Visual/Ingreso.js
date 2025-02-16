import React, { useState, useEffect } from "react";
import axios from "axios";

const Ingreso = ({ fetchUsers }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("Moderador");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [usuarios, setUsuarios] = useState(new Set());

  const dominiosValidos = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", 
    "company.com", "example.org", "mybusiness.io", "espoch.edu.ec",
  ];

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/usuarios/");
        setUsuarios(new Set(data.map((user) => user.correo.toLowerCase())));
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsersData();
  }, []);

  const formatCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleNombreChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Solo letras y espacios
    if (value !== e.target.value) {
      setErrorNombre("⚠️ Solo se permiten letras y espacios.");
    } else {
      setErrorNombre("");
    }
    setNombre(formatCamelCase(value));
  };

  const handleCorreoChange = (e) => {
    const email = e.target.value.toLowerCase().trim();
    setCorreo(email);

    if (!email.includes("@")) {
      setErrorCorreo("⚠️ Ingrese un correo válido.");
      return;
    }

    const dominio = email.split("@")[1];

    if (!dominiosValidos.includes(dominio)) {
      setErrorCorreo("⚠️ Solo se permiten correos con dominios válidos.");
      return;
    }

    if (usuarios.has(email)) {
      setErrorCorreo("⚠️ Este correo ya está registrado.");
      return;
    }

    setErrorCorreo(""); // No hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !correo) {
      setErrorCorreo("⚠️ Todos los campos son obligatorios.");
      return;
    }

    if (errorCorreo || errorNombre) {
      return;
    }

    try {
      await axios.post("http://localhost:8000/usuarios/", {
        nombre,
        correo,
        contrasenia: "password123",
        rol,
        estado: true,
      });

      setNombre("");
      setCorreo("");
      setRol("Moderador");

      setUsuarios(new Set([...usuarios, correo])); // Agregar nuevo correo a la lista
      fetchUsers();
    } catch (error) {
      setErrorCorreo("⚠️ Error al registrar usuario.");
      console.error("❌ Error:", error.response?.data || error);
    }
  };

  return (
    <div className="card shadow p-3">
      <h4 className="text-center text-primary">Registrar Usuario</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errorNombre ? "is-invalid" : ""}`}
            value={nombre}
            onChange={handleNombreChange}
            required
          />
          {errorNombre && <div className="invalid-feedback">{errorNombre}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className={`form-control ${errorCorreo ? "is-invalid" : ""}`}
            value={correo}
            onChange={handleCorreoChange}
            required
          />
          {errorCorreo && <div className="invalid-feedback">{errorCorreo}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select className="form-control" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="Moderador">Moderador</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Registrar</button>
      </form>
    </div>
  );
};

export default Ingreso;
