/* ============================================================
   site-data.js
   ------------------------------------------------------------
   Carga los datos que el dueño del negocio gestiona desde el
   panel de administración (carpeta "admin") y los aplica a la
   página: datos de contacto, fotos de portada, fotos de
   categorías, galería de proyectos y opiniones de clientes.

   Todo vive en archivos .json dentro de la carpeta "data". Esta
   web NO tiene servidor propio: simplemente se leen esos archivos
   con fetch() en el navegador del visitante. Por eso, si algún
   archivo no existe, está vacío o mal formado, cada función de
   aquí debajo falla en silencio y la página se queda con el
   contenido de ejemplo que ya trae por defecto (nunca se rompe).

   IMPORTANTE: fetch() para leer archivos locales no funciona si
   abres index.html directamente haciendo doble clic (protocolo
   "file://"). Para probarlo en tu ordenador usa un servidor local
   sencillo (lee GUIA-PUBLICAR-Y-PANEL.md), y una vez publicada en
   Netlify funcionará siempre sin nada especial.
   ============================================================ */
(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHTML(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function digitsOnly(str) {
    return String(str == null ? "" : str).replace(/\D/g, "");
  }

  // Convierte una URL en un valor seguro para usar dentro de background-image:
  // url(...). JSON.stringify escapa comillas y barras invertidas, evitando
  // que una URL "rara" (con comillas, por ejemplo) rompa el CSS. Además solo
  // se aceptan rutas relativas o direcciones http(s)/data: — cualquier otra
  // cosa se ignora, como precaución extra aunque estos datos ya solo los
  // puede escribir alguien con acceso al panel (protegido por login).
  function safeCssUrl(url) {
    const value = String(url == null ? "" : url).trim();
    if (!/^(https?:\/\/|data:image\/|\.?\/)/i.test(value)) return null;
    return "url(" + JSON.stringify(value) + ")";
  }

  async function loadJSON(path) {
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      // Archivo no encontrado, sin conexión, JSON inválido, o la
      // página se abrió como file:// (no hay fetch de archivos locales).
      return null;
    }
  }

  function setPhoto(id, url, caption) {
    const node = $(id);
    if (!node || !url) return;
    const cssUrl = safeCssUrl(url);
    if (!cssUrl) return;
    node.style.backgroundImage = cssUrl;
    node.classList.add("has-photo");
    if (caption) {
      let cap = node.querySelector(".ph-caption");
      if (!cap) {
        cap = document.createElement("span");
        cap.className = "ph-caption";
        node.appendChild(cap);
      }
      cap.textContent = caption;
    }
  }

  /* ---------- Ajustes generales (contacto + fotos de portada) ---------- */
  function applySettings(settings) {
    if (!settings || typeof settings !== "object") return;

    // Email
    if (settings.email) {
      const email = String(settings.email).trim();
      const emailText = $("contactEmailText");
      if (emailText) emailText.textContent = email;
      const footerEmail = $("footerEmailLink");
      if (footerEmail) footerEmail.textContent = email;
      document.querySelectorAll(".js-email-link").forEach(function (a) {
        a.setAttribute("href", "mailto:" + email);
      });
    }

    // WhatsApp
    if (settings.whatsapp) {
      const digits = digitsOnly(settings.whatsapp);
      const display = settings.whatsappDisplay ? String(settings.whatsappDisplay).trim() : "+" + digits;
      if (digits) {
        document.querySelectorAll(".js-wa-link").forEach(function (a) {
          const href = a.getAttribute("href") || "https://wa.me/";
          a.setAttribute("href", href.replace(/wa\.me\/\d*/, "wa.me/" + digits));
        });
      }
      const waText = $("contactWhatsappText");
      if (waText) waText.textContent = display;
      const footerWa = $("footerWaText");
      if (footerWa) footerWa.textContent = display;
    }

    // Instagram
    if (settings.instagram) {
      const handle = String(settings.instagram).trim().replace(/^@/, "");
      if (handle) {
        document.querySelectorAll(".js-ig-link").forEach(function (a) {
          a.setAttribute("href", "https://instagram.com/" + handle);
        });
        const footerIg = $("footerIgLink");
        if (footerIg) footerIg.textContent = "@" + handle;
      }
    }

    // Zona de trabajo / entrega
    if (settings.zona) {
      const zona = String(settings.zona).trim();
      const zonaText = $("contactZonaText");
      if (zonaText) zonaText.textContent = zona;
      const footerZona = $("footerZonaText");
      if (footerZona) footerZona.textContent = zona;
    }

    // Fotos de portada (hero)
    if (settings.heroImage) setPhoto("heroImageMain", settings.heroImage);
    if (settings.heroImage2) setPhoto("heroImageFloat", settings.heroImage2);
  }

  /* ---------- Fotos de categorías ---------- */
  function applyCategories(cats) {
    if (!cats || typeof cats !== "object") return;
    const map = {
      mesas: "catImgMesas",
      sillas: "catImgSillas",
      armarios: "catImgArmarios",
      estanterias: "catImgEstanterias",
      auxiliares: "catImgAuxiliares",
      medida: "catImgMedida"
    };
    Object.keys(map).forEach(function (key) {
      if (cats[key]) setPhoto(map[key], cats[key]);
    });
  }

  /* ---------- Galería de proyectos ---------- */
  function renderGallery(data) {
    const items = data && Array.isArray(data.items) ? data.items.filter(function (it) { return it && it.image; }) : [];
    if (!items.length) return; // se conservan los bloques de ejemplo
    const grid = $("galleryGrid");
    if (!grid) return;
    grid.classList.add("is-dynamic");
    grid.innerHTML = "";
    items.forEach(function (it) {
      const cssUrl = safeCssUrl(it.image);
      if (!cssUrl) return;
      const div = document.createElement("div");
      div.className = "ph has-photo";
      div.style.backgroundImage = cssUrl;
      if (it.title) {
        const cap = document.createElement("span");
        cap.className = "ph-caption";
        cap.textContent = it.title;
        div.appendChild(cap);
      }
      grid.appendChild(div);
    });
  }

  /* ---------- Opiniones de clientes ---------- */
  function renderTestimonials(data) {
    const items = data && Array.isArray(data.items)
      ? data.items.filter(function (it) { return it && it.name && it.text; })
      : [];
    if (!items.length) return; // se conservan las tarjetas de ejemplo + el aviso
    const grid = $("testimonialsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    items.forEach(function (it) {
      const rating = Math.max(1, Math.min(5, parseInt(it.rating, 10) || 5));
      let starsHTML = "";
      for (let i = 0; i < 5; i++) {
        starsHTML += '<svg viewBox="0 0 24 24" style="opacity:' + (i < rating ? 1 : 0.25) + '">' +
          '<path d="m12 2 3 7h7l-5.5 4.2L18.5 21 12 16.5 5.5 21l2-7.8L2 9h7l3-7Z"/></svg>';
      }
      const card = document.createElement("div");
      card.className = "test-card";
      card.innerHTML =
        '<div class="stars">' + starsHTML + "</div>" +
        "<p>“" + escapeHTML(it.text) + "”</p>" +
        '<div class="test-who">' +
        '<div class="test-avatar"></div>' +
        "<div><strong>" + escapeHTML(it.name) + "</strong><span>" + escapeHTML(it.piece || "") + "</span></div>" +
        "</div>";
      grid.appendChild(card);
    });
    const note = $("testimonialsNote");
    if (note) note.style.display = "none";
  }

  /* ---------- Arranque ---------- */
  async function init() {
    const [settings, categories, gallery, testimonials] = await Promise.all([
      loadJSON("data/settings.json"),
      loadJSON("data/categories.json"),
      loadJSON("data/gallery.json"),
      loadJSON("data/testimonials.json")
    ]);
    try { applySettings(settings); } catch (e) { /* nunca romper la página */ }
    try { applyCategories(categories); } catch (e) { /* nunca romper la página */ }
    try { renderGallery(gallery); } catch (e) { /* nunca romper la página */ }
    try { renderTestimonials(testimonials); } catch (e) { /* nunca romper la página */ }
  }

  init();
})();
