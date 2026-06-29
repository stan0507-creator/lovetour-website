// Phase 0 visual prototype interactions.
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const bookingForm = document.querySelector(".booking-form");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const checkin = formData.get("checkin") || "尚未選擇";
  const checkout = formData.get("checkout") || "尚未選擇";
  const guests = formData.get("guests") || "尚未選擇";
  const message = `您好，我想詢問樂圖漫遊會館空房：入住 ${checkin}，退房 ${checkout}，人數 ${guests}。`;

  navigator.clipboard?.writeText(message).then(() => {
    alert(`已複製詢問訊息：\n\n${message}`);
  }).catch(() => {
    alert(message);
  });
});
