-- Crear tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    rol VARCHAR(50) NOT NULL,  -- Administrador, Recolector
    contraseña VARCHAR(255) NOT NULL
);

-- Crear tabla de Productores
CREATE TABLE productores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    identificacion VARCHAR(50) UNIQUE NOT NULL,
    contacto VARCHAR(100),
    direccion VARCHAR(255)
);

-- Crear tabla de Entregas
CREATE TABLE entregas (
    id SERIAL PRIMARY KEY,
    productor_id INT REFERENCES productores(id),
    fecha DATE NOT NULL,
    cantidad_leche DECIMAL(10, 2) NOT NULL -- Cantidad en litros
);

-- Crear tabla de Pagos
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    productor_id INT REFERENCES productores(id),
    mes DATE NOT NULL,
    total_pago DECIMAL(10, 2) NOT NULL
);

-- Crear tabla de Reportes (esto puede generar reportes sobre entregas y pagos)
CREATE TABLE reportes (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    descripcion TEXT
);

-- Crear tabla de Información de la Asociación
CREATE TABLE informacion_asociacion (
    id SERIAL PRIMARY KEY,
    seccion VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL
);
