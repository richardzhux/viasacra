// ---- Rotating multilingual greeting ----------------------------------------
(function () {
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

  function swap(toIndex) {
    const g = greetings[toIndex];
    el.classList.add("is-fading");
    setTimeout(() => {
      el.textContent = g.text;
      el.setAttribute("lang", g.lang);
      el.setAttribute("dir", g.dir);
      requestAnimationFrame(() => el.classList.remove("is-fading"));
    }, 200);
  }

  // Show the next greeting immediately, then continue every 3.5s
  swap(1);          // jump off English right away
  i = 1;
  setInterval(() => {
    i = (i + 1) % greetings.length;
    swap(i);
  }, 5000);
})();
