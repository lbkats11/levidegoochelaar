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
      if (typeof value !== "string" || value === "") return;

      if (el.tagName === "IMG") {
        // Afbeelding: vervang de bronlink
        el.setAttribute("src", value);
      } else {
        el.textContent = value;
        // E-mailadres: werk ook de mailto-link bij (het contactformulier
        // loopt via Netlify Forms en heeft geen mailto-actie nodig)
        if (el.hasAttribute("data-cms-email")) {
          el.setAttribute("href", "mailto:" + value);
        }
      }
    });

    renderGallery(data);
  }

  // Bouwt de fotogalerij opnieuw op uit content/site.json,
  // zodat foto's via /admin toe te voegen, te verwijderen en te herschikken zijn.
  function renderGallery(data) {
    var gallery = document.getElementById("gallery");
    var images = data && data.gallery && data.gallery.images;
    if (!gallery || !Array.isArray(images) || images.length === 0) return;

    gallery.innerHTML = "";
    images.forEach(function (item) {
      if (!item || !item.image) return;
      var fig = document.createElement("figure");
      fig.className = "gallery__item is-visible";
      var img = document.createElement("img");
      img.src = item.image;
      img.alt = item.alt || "Foto van Levi de Goochelaar";
      img.loading = "lazy";
      fig.appendChild(img);
      gallery.appendChild(fig);
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
