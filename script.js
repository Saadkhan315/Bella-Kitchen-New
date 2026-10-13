
const menuToggle = document.querySelector("#menuToggle");
const navigation = document.querySelector("#navigation");
const yearElement = document.querySelector("#year");

// Mobile navigation: open and close the menu.
if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  // Close the menu after a navigation link is selected.
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });

  // Let keyboard users close the mobile menu with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.focus();
    }
  });
}

// Automatically update the copyright year.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Add the restaurant's authorised WhatsApp number here.
// Use international format with digits only: no +, spaces, or dashes.
// Leave empty until you have the correct number.
const restaurantWhatsAppNumber = "";

const whatsappButton = document.querySelector("#whatsappOrder");
const whatsappNote = document.querySelector("#whatsappNote");

if (whatsappButton) {
  // Accept a number containing 10–15 digits.
  const hasValidNumber = /^\d{10,15}$/.test(
    restaurantWhatsAppNumber
  );

  if (hasValidNumber) {
    const message = encodeURIComponent(
      "Hello! I'd like to ask about your menu."
    );

    whatsappButton.href =
      `https://wa.me/${restaurantWhatsAppNumber}?text=${message}`;

    whatsappButton.target = "_blank";
    whatsappButton.rel = "noopener noreferrer";
    whatsappButton.removeAttribute("aria-disabled");
    whatsappButton.classList.remove("is-disabled");

    if (whatsappNote) {
      whatsappNote.textContent =
        "Contact us on WhatsApp to ask about the menu.";
    }
  } else {
    // Do not send visitors to an example or unverified number.
    whatsappButton.href = "#contact";
    whatsappButton.setAttribute("aria-disabled", "true");
    whatsappButton.classList.add("is-disabled");

    if (whatsappNote) {
      whatsappNote.textContent =
        "Demo contact button. Add the authorised business number in script.js to enable WhatsApp.";
    }

    whatsappButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (whatsappNote) {
        whatsappNote.textContent =
          "WhatsApp is not configured yet. Add the correct business number in script.js first.";
      }
    });
  }
}
 
