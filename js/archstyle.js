  // Año actual en el footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menú móvil
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Animaciones al hacer scroll (con red de seguridad por si el navegador
  // no soporta IntersectionObserver o algo falla: el contenido no debe
  // quedar nunca oculto de forma permanente)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    try {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(el => io.observe(el));
    } catch (err) {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
  // Red de seguridad adicional: si por lo que sea algo se queda sin
  // revelar pasado un tiempo razonable, se muestra igualmente.
  setTimeout(() => {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }, 4000);

  // Acordeón de preguntas frecuentes
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Formulario de encargos -> genera un email (mailto) con todos los datos
  const orderForm = document.getElementById('orderForm');
  const formMsg = document.getElementById('formMsg');

  // El email de contacto se lee del texto visible en la página (elemento
  // #contactEmailText) en el momento de enviar, no de un valor fijo aquí.
  // Así, si el dueño de la web cambia el email desde el panel de
  // administración (ver data/settings.json), el formulario lo usa
  // automáticamente sin tocar este archivo.
  function getContactEmail() {
    const el = document.getElementById('contactEmailText');
    const value = el && el.textContent ? el.textContent.trim() : '';
    return value || 'ejemplo@gmail.com';
  }

  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const CONTACT_EMAIL = getContactEmail();
    const name = document.getElementById('fName').value.trim();
    const phone = document.getElementById('fPhone').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const type = document.getElementById('fType').value;
    const desc = document.getElementById('fDesc').value.trim();
    const size = document.getElementById('fSize').value.trim();
    const budget = document.getElementById('fBudget').value;
    const contactPref = document.querySelector('input[name="fContact"]:checked').value;

    if (!name || !email || !type || !desc) {
      formMsg.textContent = 'Por favor, completa los campos obligatorios (*).';
      formMsg.style.color = '#c0392b';
      formMsg.classList.add('show');
      return;
    }

    const subject = `Nuevo encargo: ${type} — ${name}`;
    const body =
      `Nombre: ${name}\n` +
      `Email: ${email}\n` +
      `Teléfono: ${phone || '—'}\n` +
      `Tipo de mueble: ${type}\n` +
      `Medidas aproximadas: ${size || '—'}\n` +
      `Presupuesto aproximado: ${budget || 'A comentar'}\n` +
      `Contacto preferido: ${contactPref}\n\n` +
      `Descripción del encargo:\n${desc}`;

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    formMsg.textContent = 'Se está abriendo tu programa de correo con el encargo ya redactado. Si no ocurre nada, escríbenos directamente a ' + CONTACT_EMAIL + ' o por WhatsApp.';
    formMsg.style.color = '#3b6b3b';
    formMsg.classList.add('show');
  });
