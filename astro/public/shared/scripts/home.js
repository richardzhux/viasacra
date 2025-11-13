function initCTA() {
  const cta = document.getElementById("cta");
  if (!cta) return;
  cta.addEventListener("click", () => {
    location.href = "mailto:you@example.com";
  });
}

function initGreeting() {
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

  let index = 0;

  function swap(nextIndex) {
    const greeting = greetings[nextIndex];
    el.classList.add("is-fading");
    setTimeout(() => {
      el.textContent = greeting.text;
      el.setAttribute("lang", greeting.lang);
      el.setAttribute("dir", greeting.dir);
      requestAnimationFrame(() => el.classList.remove("is-fading"));
    }, 200);
  }

  index = 1 + Math.floor(Math.random() * (greetings.length - 1));
  swap(index);
  setInterval(() => {
    index = (index + 1) % greetings.length;
    swap(index);
  }, 5000);
}

const icon = (emoji) => window.L?.divIcon({
  className: "emoji-pin",
  html: `<div style="
    font-size:24px; line-height:24px; text-align:center;
    width:36px; height:36px; border-radius:50%;
    background:#fff; border:1px solid #e0d9cd; box-shadow:0 4px 12px rgba(0,0,0,.10);
    display:flex; align-items:center; justify-content:center;
  ">${emoji}</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

function addTiles(map) {
  const primary = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { attribution: "© OpenStreetMap contributors", maxZoom: 19 }
  );

  const fallback = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    { attribution: "© OpenStreetMap contributors © CARTO", subdomains: "abcd", maxZoom: 19 }
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

function initMaps() {
  const mapChicagoEl  = document.getElementById("map-chicago");
  const mapLAEl       = document.getElementById("map-la");
  const mapBeijingEl  = document.getElementById("map-beijing");
  const hasMap = mapChicagoEl || mapLAEl || mapBeijingEl;
  if (!hasMap) return;

  if (typeof window !== "undefined" && typeof window.L === "undefined") {
    setTimeout(initMaps, 140);
    return;
  }
  if (typeof L === "undefined") return;

  if (!mapChicagoEl || !mapLAEl || !mapBeijingEl) return;

  if (window._mapsBootstrapDone) return;
  window._mapsBootstrapDone = true;

  const mapChi = L.map("map-chicago", { scrollWheelZoom: false, zoomControl: true })
    .setView([41.953752, -87.646160], 10);
  addTiles(mapChi);

  L.marker([42.0560, -87.6752], { icon: icon("❤️") })
    .addTo(mapChi)
    .bindPopup("<b>Northwestern — Evanston</b><br>2023–2026 • Physics & Legal Studies (Classics minor)")
    .bindTooltip("Northwestern — Evanston", {
      permanent: true, direction: "top", offset: [0, -20], className: "map-label"
    });

  L.marker([41.8807, -87.6256], { icon: icon("💼") })
    .addTo(mapChi)
    .bindPopup("<b>Federal Defender Program</b><br>55 E Monroe, Chicago")
    .bindTooltip("Federal Defender Program", {
      permanent: true, direction: "top", offset: [0, -20], className: "map-label"
    });

  const mapLA = L.map("map-la", { scrollWheelZoom: false })
    .setView([34.070, -118.445], 14);
  addTiles(mapLA);

  L.marker([34.070199, -118.45105764], { icon: icon("❤️") })
    .addTo(mapLA)
    .bindPopup("<b>UCLA — De Neve Birch</b><br>memories / love")
    .bindTooltip("UCLA — De Neve Birch", {
      permanent: true, direction: "top", offset: [0, -20], className: "map-label"
    });

  L.marker([34.0689, -118.4437], { icon: icon("💼") })
    .addTo(mapLA)
    .bindPopup("<b>UCLA — Engineering V</b><br>PSPL • Engineering V")
    .bindTooltip("UCLA — Engineering V", {
      permanent: true, direction: "top", offset: [0, -20], className: "map-label"
    });

  const mapBJ = L.map("map-beijing", { scrollWheelZoom: false })
    .setView([39.909854, 116.362622], 13);
  addTiles(mapBJ);

  L.marker([39.909854, 116.362622], { icon: icon("🏛️") })
    .addTo(mapBJ)
    .bindPopup("<b>Experimental High School Affiliated to BNU</b>")
    .bindTooltip("BNU Experimental High School", {
      permanent: true, direction: "top", offset: [0, -20], className: "map-label"
    });

  const slides = Array.from(document.querySelectorAll(".slide"));
  let idx = 0;
  const label = document.getElementById("slideLabel");
  const names = ["Chicago", "Los Angeles (UCLA)", "Beijing"];

  function show(nextIndex) {
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === nextIndex));
    if (label) label.textContent = `${names[nextIndex]} • ${nextIndex + 1}/${slides.length}`;
    setTimeout(() => {
      try { mapChi.invalidateSize(); } catch {}
      try { mapLA.invalidateSize(); } catch {}
      try { mapBJ.invalidateSize(); } catch {}
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

document.addEventListener("DOMContentLoaded", () => {
  initCTA();
  initGreeting();
  initMaps();
});
