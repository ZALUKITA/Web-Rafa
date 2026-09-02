/* Netlify Identity: gestiona el enlace de invitación / confirmación de
   email del panel de administración (carpeta "admin"). No hace nada si
   no se usa Netlify Identity (por ejemplo, mientras se prueba en local).
   Se mantiene como archivo externo (en vez de <script> inline) para que
   la política de seguridad (CSP) del archivo "_headers" pueda bloquear
   cualquier script inline no autorizado. */
(function () {
  "use strict";
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", function (user) {
      if (!user) {
        window.netlifyIdentity.on("login", function () {
          document.location.href = "/admin/";
        });
      }
    });
  }
})();
