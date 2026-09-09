document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const registerMessage = document.getElementById('register-message');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const dob = document.getElementById('reg-dob').value;
      
      // Limpiar mensajes previos
      registerMessage.textContent = '';
      registerMessage.className = 'message';

      // Validación de correo DuocUC
      const validEmailDomains = ['@duocuc.cl', '@profesor.duoc.cl'];
      const isValidEmail = validEmailDomains.some(domain => email.endsWith(domain));

      if (!isValidEmail) {
        showError('Debes registrarte utilizando un correo institucional válido (@duocuc.cl o @profesor.duoc.cl).');
        return;
      }

      // Validación de mayoría de edad (18 años)
      if (!isAdult(dob)) {
        showError('Debes ser mayor de 18 años para registrarte en Level-Up Gamer.');
        return;
      }

      // Si todo es correcto
      showSuccess(`¡Registro exitoso, ${name}! Tu descuento del 20% ha sido vinculado a ${email}.`);
      registerForm.reset();
    });
  }

  function isAdult(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }

  function showError(message) {
    registerMessage.textContent = message;
    registerMessage.classList.add('error');
  }

  function showSuccess(message) {
    registerMessage.textContent = message;
    registerMessage.classList.add('success');
  }
});