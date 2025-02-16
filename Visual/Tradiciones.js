import React, { useState } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import "../styles.css";

const tradicionesData = [
  {
    id: 1,
    nombre: "Año Nuevo",
    descripcion: [
      "Se lleva a cabo desde el 01 al 08 de enero.",
      "Acompañado de baile popular y música en el parque central de la parroquia.",
      "Se realiza la quema de los tradicionales años viejos.",
      "Acompañamiento de bandas de pueblo."
    ],
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcvHZfDNfeM8Vc0_9sy0BRCoYWL_IRZMM9Ww&s",
  },
  {
    id: 2,
    nombre: "Carnaval",
    descripcion: [
      "Se celebra en febrero o marzo con juegos de agua, desfiles y comparsas.",
      "Incluye comparsas de disfrazados con la entrada del Taita Carnaval.",
      "Se entonan coplas carnavaleras con guitarras, flautas, tambores y bombos.",
      "Participación en juegos tradicionales con agua, harina y huevos."
    ],
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfwlQ6HXcKAejf4m1LuYoNDCpj7i2-9UMPXw&s",
  },
  {
    id: 3,
    nombre: "Semana Santa",
    descripcion: [
      "Viacrucis con feligreses recorriendo la parroquia.",
      "Escenificación de la Pasión de Cristo con actores de la comunidad.",
      "Procesiones en la Iglesia de San Pedro de Licto.",
      "Todos los feligreses acompañan caminando y rezando."
    ],
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVCtdXMx3gln1PbxKLUxRBd78O5-vlVnu8Q&s",
  },
  {
    id: 4,
    nombre: "Padre Eterno",
    descripcion: [
      "Se lleva a cabo el 27 y 28 de agosto.",
      "Se oficia una misa campal en la que el padre predica en castellano y kichwa.",
      "Los feligreses organizan una romería desde el centro parroquial hasta la comunidad de Gueseche, llevando en brazos la imagen del santo patrono.",
      "Se realizan actividades deportivas, como campeonatos de fútbol.",
      "Durante toda la fiesta, las tradicionales bandas de pueblo acompañan a la gente."
    ],
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK0hPxFruXzk5rHuS6-Wga1YyVjb-7ffL1WQ&s",
  },
  {
    id: 5,
    nombre: "Finados",
    descripcion: [
      "Se lleva a cabo el 01 y 02 de noviembre.",
      "El 1 de noviembre se recuerda el Día de Todos los Santos.",
      "El 2 de noviembre se conmemora el Día de los Difuntos.",
      "Se elabora la tradicional colada morada y guaguas de pan.",
      "Una de las tradiciones consiste en llevar comida preparada al cementerio.",
      "Se acostumbra brindar con el difunto como muestra de respeto y memoria."
    ],
    imagen: "https://licto.gob.ec/wp-content/uploads/2024/05/licto-46.jpg",
  },
  {
    id: 6,
    nombre: "Fiestas de la Parroquia",
    descripcion: [
      "Se lleva a cabo el 5 de junio.",
      "Se desarrollan actividades como la sesión solemne y desfile cívico.",
      "Se realizan actividades culturales como concursos de bandas de pueblo.",
      "Hay un baile general en la plaza central de la parroquia."
    ],
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCglkhfwcFRXgctONF2SaJugIYEFDkSIqO4N3gaUTt8p-XhEzgKUsScMmlmfnT1OkzGB0&usqp=CAU",
  },
  {
    id: 7,
    nombre: "Fiestas - Virgen de la Merced",
    descripcion: [
      "Se lleva a cabo la primera semana del mes de septiembre.",
      "La festividad inicia con la novena.",
      "Continúa con la procesión hasta la iglesia principal.",
      "La imagen es acompañada por bandas de pueblo y danzas."
    ],
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW9yCaEZxE6Us9jgWCGQN3EZNTxQYGFj4UoQ&s",
  },
  {
    id: 8,
    nombre: "Fiestas - Virgen Dolorosa",
    descripcion: [
      "Se lleva a cabo las dos primeras semanas del mes de mayo.",
      "Se celebran novenas en conmemoración a la festividad de la Virgen.",
      "La Virgen desfila por la parroquia en procesión.",
      "Se realiza la misa principal.",
      "Se organizan comparsas y otras actividades como bailes populares.",
      "Se realizan juegos tradicionales en los que participan los niños."
    ],
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGcPSA2KRASeWy-A4tcG2KsCf5VjGUjx8bLw&s",
  },
  {
    id: 9,
    nombre: "Fiestas - San Pedro de Licto",
    descripcion: [
      "Se lleva a cabo el 28 de junio.",
      "Se celebra a San Pedro, patrono de la parroquia de Licto.",
      "La festividad incluye bandas de pueblo, danzas y pregones.",
      "Se realizan juegos pirotécnicos como parte de la celebración."
    ],
    imagen: "https://img.goraymi.com/2020/02/26/b15ef555a63d691a89e96d1caecb7c37_xl.jpg",
  },
];

const Tradiciones = () => {
  const [tradicionSeleccionada, setTradicionSeleccionada] = useState(null);

  return (
    <Container className="my-5">
      <Row className="g-4 justify-content-center">
        {tradicionesData.map((tradicion) => (
          <Col md={4} key={tradicion.id}>
            <div
              className="tradicion-card"
              onClick={() => setTradicionSeleccionada(tradicion)}
              style={{ cursor: "pointer" }}
            >
              <img src={tradicion.imagen} alt={tradicion.nombre} />
              <div className="card-content">
                <p>{tradicion.nombre}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal de Detalle */}
      <Modal show={!!tradicionSeleccionada} onHide={() => setTradicionSeleccionada(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{tradicionSeleccionada?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="custom-bullets">
            {tradicionSeleccionada?.descripcion.map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Tradiciones;
