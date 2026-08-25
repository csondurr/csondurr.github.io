(function () {
  "use strict";

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
