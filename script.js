
const menuToggle = document.querySelector("#menuToggle");
const navigation = document.querySelector("#navigation");

// Open and close the mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close the mobile menu after someone chooses a section.
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Keep the copyright year up to date.
document.querySelector("#year").textContent = new Date().getFullYear();

// Replace this example with the real restaurant's WhatsApp number.
// Use the international country code and digits only, without + or spaces.
const restaurantWhatsAppNumber = "923001234567";

const whatsappButton = document.querySelector("#whatsappOrder");
whatsappButton.href =
  "https://wa.me/" + restaurantWhatsAppNumber +
  "?text=" + encodeURIComponent("Hello! I'd like to ask about the menu.");

whatsappButton.target = "_blank";
whatsappButton.rel = "noopener noreferrer";
