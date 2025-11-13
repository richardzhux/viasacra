// ---- Footer year ------------------------------------------------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Smooth anchor scroll ---------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href")?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});
