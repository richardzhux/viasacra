// Footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// CTA mailto (hero may not exist on all pages)
document.getElementById("cta")?.addEventListener("click", () => {
  location.href = "mailto:you@example.com";
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const id=a.getAttribute("href").slice(1);
    const el=document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:"smooth"}); }
  });
});

// --- Map + slider only on the homepage ---
function initMapsIfPresent() {
  const mapChicagoEl = document.getElementById("map-chicago");
  const mapLAEl = document.getElementById("map-la");
  const mapBeijingEl = document.getElementById("map-beijing");
  if (!mapChicagoEl || !mapLAEl || !mapBeijingEl || !window.L) return;

  // Emoji markers (simple Leaflet divIcons)
  const icon = (emoji) => L.divIcon({
    className: "emoji-pin",
    html: `<div style="
      font-size:20px; line-height:20px; text-align:center;
      width:28px; height:28px; border-radius:50%;
      background:#fff; border:1px solid #e0d9cd; box-shadow:0 4px 12px rgba(0,0,0,.08);
      display:flex; align-items:center; justify-content:center;
    ">${emoji}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  // --- Slide 1: Chicago ---
  const mapChi = L.map("map-chicago", { scrollWheelZoom:false }).setView([41.89, -87.65], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OSM" }).addTo(mapChi);

  // Northwestern (study)
  L.marker([42.0560, -87.6752], { icon: icon("🏛️") })
    .addTo(mapChi)
    .bindPopup("<b>Northwestern — Evanston</b><br>2023–2026 • Physics & Legal Studies (Classics minor)");

  // 55 E Monroe (work)
  L.marker([41.8807, -87.6256], { icon: icon("💼") })
    .addTo(mapChi)
    .bindPopup("<b>Federal Defender Program</b><br>55 E Monroe, Chicago");

  // --- Slide 2: Los Angeles (UCLA) ---
  const mapLA = L.map("map-la", { scrollWheelZoom:false }).setView([34.070, -118.445], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OSM" }).addTo(mapLA);

  // UCLA De Neve Birch (love/heart)
  L.marker([34.0716, -118.4513], { icon: icon("❤️") })
    .addTo(mapLA)
    .bindPopup("<b>UCLA — De Neve Birch</b><br>memories / love");

  // Engineering V (work/study-ish)
  L.marker([34.0689, -118.4437], { icon: icon("💼") })
    .addTo(mapLA)
    .bindPopup("<b>UCLA — Engineering V</b><br>PSPL • Engineering V");

  // --- Slide 3: Beijing ---
  const mapBJ = L.map("map-beijing", { scrollWheelZoom:false }).setView([39.9395, 116.3596], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OSM" }).addTo(mapBJ);

  // Experimental HS attached to BNU (study)
  L.marker([39.9395, 116.3596], { icon: icon("🏛️") })
    .addTo(mapBJ)
    .bindPopup("<b>Experimental High School Affiliated to BNU</b>");

  // Simple slider
  const slides = Array.from(document.querySelectorAll(".slide"));
  let idx = 0;
  const label = document.getElementById("slideLabel");
  const names = ["Chicago", "Los Angeles (UCLA)", "Beijing"];
  function show(i) {
    slides.forEach((s, n) => s.classList.toggle("active", n === i));
    if (label) label.textContent = `${names[i]} • ${i+1}/${slides.length}`;
    // Resize maps when their slide becomes visible
    setTimeout(() => {
      mapChi.invalidateSize();
      mapLA.invalidateSize();
      mapBJ.invalidateSize();
    }, 150);
  }
  document.getElementById("prevSlide")?.addEventListener("click", () => {
    idx = (idx - 1 + slides.length) % slides.length;
    show(idx);
  });
  document.getElementById("nextSlide")?.addEventListener("click", () => {
    idx = (idx + 1) % slides.length;
    show(idx);
  });
  show(0);
}
document.addEventListener("DOMContentLoaded", initMapsIfPresent);
