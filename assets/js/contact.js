(function () {
  "use strict";

  const professionalStylesheet = "/assets/css/professional-overrides.css?v=20260826-1";
  if (!document.querySelector('link[href^="/assets/css/professional-overrides.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = professionalStylesheet;
    document.head.appendChild(link);
  }

  const profileImage = document.getElementById("contact-profile-image");
  if (profileImage) {
    const showLocalFallback = () => {
      profileImage.hidden = true;
      const frame = profileImage.closest(".profile-image-frame");
      if (frame) frame.classList.add("is-empty");
    };
    profileImage.addEventListener("error", showLocalFallback);
    if (profileImage.complete && profileImage.naturalWidth === 0) showLocalFallback();
  }

  const button = document.getElementById("copy-email");
  const status = document.getElementById("copy-status");
  if (!button) return;

  function fallbackCopy(value) {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(field);
    return copied;
  }

  button.addEventListener("click", async () => {
    const email = button.dataset.email || "csondurr@gmail.com";
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        copied = true;
      } else {
        copied = fallbackCopy(email);
      }
    } catch (error) {
      copied = fallbackCopy(email);
    }

    const label = button.querySelector("span");
    if (label) label.textContent = copied ? "Email copied" : "Copy unavailable";
    if (status) status.textContent = copied ? "csondurr@gmail.com copied to clipboard" : "Use the email link above";

    window.setTimeout(() => {
      if (label) label.textContent = "Copy email";
      if (status) status.textContent = "";
    }, 2600);
  });
})();
