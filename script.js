// ===== Levi de Goochelaar — interactions =====
(function () {
  "use strict";

  // ---- Content laden uit content/site.json (bewerkt via /admin) ----
  // De HTML bevat standaardteksten als fallback; deze worden overschreven
  // zodra content/site.json is geladen. Zo blijft de site werken zonder JS.
  function resolvePath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      if (acc == null) return undefined;
      return acc[key];
    }, obj);
  }

  function applyContent(data) {
    document.querySelectorAll("[data-cms]").forEach(function (el) {
      var value = resolvePath(data, el.getAttribute("data-cms"));
      if (typeof value === "string") {
        el.textContent = value;
        // E-mailadres: werk ook de mailto-link en het formulier bij
        if (el.hasAttribute("data-cms-email")) {
          el.setAttribute("href", "mailto:" + value);
          var form = document.getElementById("contactForm");
          if (form) form.setAttribute("action", "mailto:" + value);
        }
      }
    });
  }

  fetch("content/site.json", { cache: "no-cache" })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) { if (data) applyContent(data); })
    .catch(function () { /* fallback: standaardteksten uit de HTML blijven staan */ });

  // ---- Mobiel menu ----
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Schaduw onder de navigatiebalk bij scrollen ----
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Fade-in bij scrollen ----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- Jaartal in de footer ----
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
