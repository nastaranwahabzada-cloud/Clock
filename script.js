(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const state = {
    is24Hour: true,
    showSeconds: true,
    usePersianDate: true,
    timezone: "local"
  };

  const planets = {
    Mercury: {
      fa: "عطارد",
      position: "۱",
      type: "سنگی",
      description: "نزدیک‌ترین سیاره به خورشید؛ کوچک، پرسرعت و پوشیده از دهانه‌های برخوردی.",
      color: "radial-gradient(circle at 30% 25%, #e2d3bd, #82786d 55%, #363b4c 88%)",
      shadow: "0 0 35px #b8a18b99, inset -12px -10px 20px #302a2699"
    },
    Venus: {
      fa: "زهره",
      position: "۲",
      type: "سنگی",
      description: "جهانی پوشیده از ابرهای ضخیم؛ جوّ بسیار گرم آن زهره را به داغ‌ترین سیاره تبدیل کرده است.",
      color: "radial-gradient(circle at 30% 25%, #fff0c1, #d69a55 55%, #74452d 88%)",
      shadow: "0 0 35px #e6b77a99, inset -12px -10px 20px #74452d99"
    },
    Earth: {
      fa: "زمین",
      position: "۳",
      type: "سنگی",
      description: "خانه‌ی ما؛ سیاره‌ای آبی با اقیانوس‌های گسترده و شرایط مناسب برای زندگی شناخته‌شده.",
      color: "radial-gradient(circle at 30% 25%, #c7efff, #398ed1 48%, #17406f 80%)",
      shadow: "0 0 35px #4f9ee999, inset -12px -10px 20px #102c5599"
    },
    Mars: {
      fa: "مریخ",
      position: "۴",
      type: "سنگی",
      description: "سیاره‌ی سرخ؛ سطح آن سرشار از نشانه‌های آتشفشان‌ها، دره‌ها و گذشته‌ی آبی است.",
      color: "radial-gradient(circle at 30% 25%, #ffc29a, #c65d43 55%, #632e35 88%)",
      shadow: "0 0 35px #d56e5599, inset -12px -10px 20px #632e3599"
    },
    Jupiter: {
      fa: "مشتری",
      position: "۵",
      type: "غول گازی",
      description: "بزرگ‌ترین سیاره‌ی منظومه شمسی؛ با نوارهای ابری و توفان بزرگ سرخ‌رنگش شناخته می‌شود.",
      color: "radial-gradient(circle at 30% 25%, #f4dfc2, #bd956e 52%, #6e5147 88%)",
      shadow: "0 0 35px #d6ad8299, inset -12px -10px 20px #59413799"
    },
    Saturn: {
      fa: "زحل",
      position: "۶",
      type: "غول گازی",
      description: "زحل به خاطر حلقه‌های گسترده و چشمگیرش مشهور است؛ حلقه‌ها از ذرات یخ و سنگ ساخته شده‌اند.",
      color: "radial-gradient(circle at 30% 25%, #fff0bd, #c7a96f 55%, #746047 88%)",
      shadow: "0 0 35px #d8c18c99, inset -12px -10px 20px #74604799"
    },
    Uranus: {
      fa: "اورانوس",
      position: "۷",
      type: "غول یخی",
      description: "غول یخی آبی‌فام که محور چرخشش بسیار کج است و فصل‌های بسیار طولانی دارد.",
      color: "radial-gradient(circle at 30% 25%, #d5ffff, #83cbd1 55%, #397e91 88%)",
      shadow: "0 0 35px #8ed9df99, inset -12px -10px 20px #245b7099"
    },
    Neptune: {
      fa: "نپتون",
      position: "۸",
      type: "غول یخی",
      description: "دورترین سیاره‌ی منظومه شمسی؛ جهانی آبی با بادهایی بسیار سریع در جوّ خود.",
      color: "radial-gradient(circle at 30% 25%, #b7d3ff, #4d78d4 55%, #202e70 88%)",
      shadow: "0 0 35px #5278db99, inset -12px -10px 20px #17245799"
    }
  };

  const modal = $("planetModal");

  function getTimezone() {
    return state.timezone === "local" ? undefined : state.timezone;
  }

  function updateClock() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !state.is24Hour,
      timeZone: getTimezone()
    }).formatToParts(now);

    const part = (type) => parts.find((item) => item.type === type)?.value || "";
    const seconds = state.showSeconds ? `:${part("second")}` : "";

    $("time").textContent = `${part("hour")}:${part("minute")}${seconds}`;
    $("period").textContent = state.is24Hour
      ? "24H"
      : (part("dayPeriod") || "").toUpperCase();
    $("period").style.display = state.is24Hour ? "none" : "block";

    const locale = state.usePersianDate ? "fa-IR-u-ca-persian" : "en-US";

    $("date").textContent = new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: getTimezone()
    }).format(now);

    $("day").textContent = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: getTimezone()
    }).format(now);

    const hour = Number(new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hourCycle: "h23",
      timeZone: getTimezone()
    }).format(now));

    $("greeting").textContent = hour < 12
      ? "صبحی روشن در مدار شما"
      : hour < 17
        ? "روزتان سرشار از انرژی"
        : hour < 20
          ? "عصری آرام زیر آسمان"
          : "شبی آرام در کهکشان";

    $("zoneName").textContent = state.timezone === "local"
      ? "زمان محلی دستگاه"
      : $("timezone").selectedOptions[0].textContent;
  }

  function openPlanet(planetKey) {
    const planet = planets[planetKey];
    if (!planet) return;

    $("modalPlanetName").textContent = planet.fa;
    $("modalPlanetEnglish").textContent = planetKey.toUpperCase();
    $("modalPlanetDescription").textContent = planet.description;
    $("modalPosition").textContent = planet.position;
    $("modalType").textContent = planet.type;
    $("modalPlanetCore").style.background = planet.color;
    $("modalPlanetCore").style.boxShadow = planet.shadow;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    $("closePlanet").focus();
  }

  function closePlanet() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function setTimeFormat(use24Hour) {
    state.is24Hour = use24Hour;
    $("h24").classList.toggle("selected", use24Hour);
    $("h12").classList.toggle("selected", !use24Hour);
    updateClock();
  }

  $("h24").addEventListener("click", () => setTimeFormat(true));
  $("h12").addEventListener("click", () => setTimeFormat(false));

  $("seconds").addEventListener("change", (event) => {
    state.showSeconds = event.target.checked;
    updateClock();
  });

  $("persian").addEventListener("change", (event) => {
    state.usePersianDate = event.target.checked;
    updateClock();
  });

  $("timezone").addEventListener("change", (event) => {
    state.timezone = event.target.value;
    updateClock();
  });

  $("theme").addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
      "orbital-theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
  });

  $("full").addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // تمام‌صفحه ممکن است در بعضی مرورگرها پشتیبانی نشود.
    }
  });

  document.querySelectorAll(".planet-chip").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".planet-chip").forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      openPlanet(button.dataset.planet);
    });
  });

  $("closePlanet").addEventListener("click", closePlanet);

  modal.addEventListener("click", (event) => {
    if (event.target.dataset.close === "true") {
      closePlanet();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closePlanet();
    }
  });

  if (localStorage.getItem("orbital-theme") === "light") {
    document.body.classList.add("light");
  }

  updateClock();
  window.setInterval(updateClock, 250);
})();