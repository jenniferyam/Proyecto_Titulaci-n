// ScrollReveal
import ScrollReveal from 'scrollreveal';

export function initScrollReveal() {
  ScrollReveal().reveal('.carousel-inner img', { delay: 200, origin: 'bottom', distance: '20px' });
  ScrollReveal().reveal('.tradicion-card', { delay: 200, origin: 'bottom', distance: '30px', interval: 100 });
}

// Manejo de formulario de inicio de sesión
export function initLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === "" || password === "") {
        alert("Por favor, ingrese usuario y contraseña.");
        return;
      }

      // Redirigir a la página de administrador
      window.location.href = "/admin";
    });
  }
}

// Botón de ayuda con efecto hover
export function initHelpButton() {
  const helpButton = document.getElementById('helpButton');
  if (helpButton) {
    helpButton.addEventListener('mouseover', () => {
      helpButton.style.transform = 'scale(1.1)';
    });
    helpButton.addEventListener('mouseout', () => {
      helpButton.style.transform = 'scale(1)';
    });
  }
}