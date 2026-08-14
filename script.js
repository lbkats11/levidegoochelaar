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
        // Telefoonnummer: maak er een klikbare bel-link van
        if (el.hasAttribute("data-cms-phone")) {
          el.setAttribute("href", "tel:" + value.replace(/[^0-9+]/g, ""));
        }
      }
    });

    renderShows(data);
    renderOccasions(data);
    renderGallery(data);
    applyWhatsApp(data);
  }

  // Zet het telefoonnummer om naar internationaal formaat voor WhatsApp
  // (bijv. "06 40 49 41 89" -> "31640494189") en vult de wa.me-links.
  function applyWhatsApp(data) {
    var phone = data && data.contact && data.contact.phone;
    if (!phone) return;
    var digits = phone.replace(/[^0-9]/g, "");
    if (digits.indexOf("00") === 0) digits = digits.slice(2);
    else if (digits.charAt(0) === "0") digits = "31" + digits.slice(1);
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.setAttribute("href", "https://wa.me/" + digits);
    });
  }

  // Bouwt de shows-kaarten opnieuw op uit content/site.json,
  // zodat shows via /admin toe te voegen, te verwijderen en te herschikken zijn.
  function renderShows(data) {
    var list = document.getElementById("showsList");
    var items = data && data.shows && data.shows.items;
    if (!list || !Array.isArray(items) || items.length === 0) return;

    list.innerHTML = "";
    items.forEach(function (item) {
      if (!item || !item.title) return;
      var card = document.createElement("article");
      card.className = "card is-visible";
      var icon = document.createElement("div");
      icon.className = "card__icon";
      icon.textContent = item.icon || "✨";
      var h3 = document.createElement("h3");
      h3.textContent = item.title;
      var p = document.createElement("p");
      p.textContent = item.text || "";
      card.appendChild(icon);
      card.appendChild(h3);
      card.appendChild(p);
      list.appendChild(card);
    });
  }

  // Bouwt de gelegenheden opnieuw op uit content/site.json.
  function renderOccasions(data) {
    var list = document.getElementById("occasionsList");
    var items = data && data.occasions && data.occasions.items;
    if (!list || !Array.isArray(items) || items.length === 0) return;

    list.innerHTML = "";
    items.forEach(function (item) {
      if (!item || !item.title) return;
      var box = document.createElement("div");
      box.className = "occasion is-visible";
      var span = document.createElement("span");
      span.textContent = item.icon || "✨";
      var h3 = document.createElement("h3");
      h3.textContent = item.title;
      var p = document.createElement("p");
      p.textContent = item.text || "";
      box.appendChild(span);
      box.appendChild(h3);
      box.appendChild(p);
      list.appendChild(box);
    });
  }

  // Bouwt de fotogalerij opnieuw op uit content/site.json,
  // zodat foto's via /admin toe te voegen, te verwijderen en te herschikken zijn.
  function renderGallery(data) {
    var gallery = document.getElementById("gallery");
    var images = data && data.gallery && data.gallery.images;
    if (!gallery || !Array.isArray(images) || images.length === 0) return;

    // aantal foto's meegeven zodat de opmaak zich kan aanpassen
    gallery.setAttribute("data-count", String(images.length));
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
