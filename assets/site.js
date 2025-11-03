// Footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// CTA mailto (if you add a button with id="cta" later)
document.getElementById("cta")?.addEventListener("click", () => {
  location.href = "mailto:you@example.com";
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
  });
});

// ---- Rotating multilingual greeting ----------------------------------------
(function(){
  const el = document.getElementById("greeting");
  if (!el) return;

  const greetings = [
    { text: "Hi — how are you today?",            lang: "en",      dir: "ltr" },
    { text: "你好，今天好吗？",                          lang: "zh-Hans", dir: "ltr" },
    { text: "你好，今天好嗎？",                          lang: "zh-Hant", dir: "ltr" },
    { text: "안녕하세요, 오늘 기분 어때요?",               lang: "ko",      dir: "ltr" },
    { text: "こんにちは、ご機嫌いかがですか？",              lang: "ja",      dir: "ltr" },
    { text: "Merhaba, bugün nasılsın?",            lang: "tr",      dir: "ltr" },
    { text: "مرحبًا، كيف حالك اليوم؟",                lang: "ar",      dir: "rtl" },
    { text: "Salve, quid agis hodie?",            lang: "la",      dir: "ltr" },
    { text: "Γεια, τι κάνεις σήμερα;",             lang: "el",      dir: "ltr" },
    { text: "Bonjour, comment ça va aujourd’hui ?", lang: "fr",    dir: "ltr" },
    { text: "Ciao, come stai oggi?",              lang: "it",      dir: "ltr" },
    { text: "Hallo, wie geht es dir heute?",      lang: "de",      dir: "ltr" },
    { text: "Hoi, hoe gaat het vandaag?",         lang: "nl",      dir: "ltr" },
    { text: "नमस्ते, आज आप कैसे हैं?",                 lang: "hi",      dir: "ltr" },
    { text: "नमस्ते, कथं भवति अद्य?",                   lang: "sa",      dir: "ltr" },
    { text: "Hej, hvordan har du det i dag?",     lang: "da",      dir: "ltr" },
    { text: "Hei, hvordan har du det i dag?",     lang: "no",      dir: "ltr" },
    { text: "Hej, hur mår du idag?",              lang: "sv",      dir: "ltr" },
    { text: "Hei, mitä kuuluu tänään?",           lang: "fi",      dir: "ltr" },
    { text: "היי, מה שלומך היום?",                 lang: "he",      dir: "rtl" }
  ];

  let i = 0;
  function next(){
    el.classList.add("is-fading");
    setTimeout(() => {
      const g = greetings[i = (i + 1) % greetings.length];
      el.textContent = g.text;
      el.setAttribute("lang", g.lang);
      el.setAttribute("dir", g.dir);
      requestAnimationFrame(() => el.classList.remove("is-fading"));
    }, 350);
  }
  el.setAttribute("lang", greetings[0].lang);
  el.setAttribute("dir", greetings[0].dir);
  setInterval(next, 3500);
})();

// ---- Maps (Leaflet) ---------------------------------------------------------

// Add HTTPS tiles with a fallback source to avoid blank maps on GH Pages
function addTiles(map) {
  const primary = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { attribution: "© OpenStreetMap contributors" }
  );
  const fallback = L.tileLayer(
    "https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    { attribution: "© OpenStreetMap France" }
  );

  primary.on("tileerror", () => {
    if (!map.__usedFallback) {
      map.__usedFallback = true;
      map.removeLayer(primary);
      fallback.addTo(map);
    }
  });

  primary.addTo(map);
}

function initMapsIfPresent() {
  // Wait until Leaflet has loaded
  if (typeof window !== "undefined" && typeof window.L === "undefined") {
    setTimeout(initMapsIfPresent, 120);
    return;
  }
  if (typeof L === "undefined") return;

  const mapChicagoEl = document.getElementById("map-chicago");
  const mapLAEl = document.getElementById("map-la");
  const mapBeijingEl = document.getElementById("map-beijing");
  if (!mapChicagoEl || !mapLAEl || !mapBeijingEl) return;

  if (window._mapsBootstrapDone) return;
  window._mapsBootstrapDone = true;

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
  addTiles(mapChi);
  L.marker([42.0560, -87.6752], { icon: icon("🏛️") })
    .addTo(mapChi)
    .bindPopup("<b>Northwestern — Evanston</b><br>2023–2026 • Physics & Legal Studies (Classics minor)");
  L.marker([41.8807, -87.6256], { icon: icon("💼") })
    .addTo(mapChi)
    .bindPopup("<b>Federal Defender Program</b><br>55 E Monroe, Chicago");

  // --- Slide 2: Los Angeles (UCLA) ---
  const mapLA = L.map("map-la", { scrollWheelZoom:false }).setView([34.070, -118.445], 13);
  addTiles(mapLA);
  L.marker([34.0716, -118.4513], { icon: icon("❤️") })
    .addTo(mapLA)
    .bindPopup("<b>UCLA — De Neve Birch</b><br>memories / love");
  L.marker([34.0689, -118.4437], { icon: icon("💼") })
    .addTo(mapLA)
    .bindPopup("<b>UCLA — Engineering V</b><br>PSPL • Engineering V");

  // --- Slide 3: Beijing ---
  const mapBJ = L.map("map-beijing", { scrollWheelZoom:false }).setView([39.9395, 116.3596], 12);
  addTiles(mapBJ);
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
    setTimeout(() => {
      try { mapChi.invalidateSize(); } catch {}
      try { mapLA.invalidateSize(); } catch {}
      try { mapBJ.invalidateSize(); } catch {}
    }, 150);
  }
  document.getElementById("prevSlide")?.addEventListener("click", () => {
    idx = (idx - 1 + slides.length) % slides.length; show(idx);
  });
  document.getElementById("nextSlide")?.addEventListener("click", () => {
    idx = (idx + 1) % slides.length; show(idx);
  });
  show(0);
}

document.addEventListener("DOMContentLoaded", initMapsIfPresent);
