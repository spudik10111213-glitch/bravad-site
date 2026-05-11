document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  const submitButton = document.querySelector(".contact-form__submit");
  const successModal = document.getElementById("requestSuccessModal");

  if (!contactForm || !submitButton || !successModal || !window.bootstrap) {
    return;
  }

  const modal = new bootstrap.Modal(successModal);
  const requiredFields = [
    contactForm.elements.name,
    contactForm.elements.email,
  ];

  const markField = (field, isValid) => {
    field.classList.toggle("is-invalid", !isValid);
    field.setAttribute("aria-invalid", String(!isValid));
  };

  const validateField = (field) => {
    const value = field.value.trim();
    const isEmail = field.type === "email";
    const isValid = isEmail ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : value.length > 0;

    markField(field, isValid);
    return isValid;
  };

  requiredFields.forEach((field) => {
    field.setAttribute("required", "required");

    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) {
        validateField(field);
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isFormValid = requiredFields.every(validateField);

    if (!isFormValid) {
      requiredFields.find((field) => field.classList.contains("is-invalid"))?.focus();
      return;
    }

    modal.show();
  });

  successModal.addEventListener("shown.bs.modal", () => {
    contactForm.reset();
    requiredFields.forEach((field) => markField(field, true));
  });

  successModal.addEventListener("hidden.bs.modal", () => {
    submitButton.focus();
  });
});
