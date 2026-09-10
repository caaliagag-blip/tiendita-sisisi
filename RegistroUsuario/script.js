document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const dob = new Date(document.getElementById('reg-dob').value);
  const message = document.getElementById('register-message');
  const age = new Date().getFullYear() - dob.getFullYear();

  if (!email.endsWith('@duocuc.cl') && !email.endsWith('@profesor.duoc.cl')) {
    message.textContent = 'Debes usar un correo institucional (@duocuc.cl o @profesor.duoc.cl).';
    message.className = 'message error';
    return;
  }

  if (age < 18) {
    message.textContent = 'Debes ser mayor de 18 años para registrarte.';
    message.className = 'message error';
    return;
  }

  message.textContent = `¡Registro exitoso, ${name}! Tu descuento del 20% ha sido activado.`;
  message.className = 'message success';
  this.reset();
});