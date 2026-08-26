(function () {
  "use strict";

  function loadOrdered(src) {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  }

  loadOrdered("/assets/js/projects-app-core.js?v=20260826-2");

  if (document.body && document.body.classList.contains("project-detail-page")) {
    loadOrdered("/assets/js/projects-math-enhancer.js?v=20260826-1");
  }
})();
