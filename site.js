/* Mazo website v1.2 */
(function () {
  // TODO: ganti nomor WhatsApp (format internasional, tanpa + dan tanpa 0 di depan, contoh 6281234567890)
  var WA = "6281234567890";

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  var year = $("#year");
  if (year) { year.textContent = new Date().getFullYear(); }

  // menu di HP
  var burger = $("#burger"), menu = $("#menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // pencari solusi di halaman depan
  var tabs = $$("[data-tab]"), panels = $$("[data-panel]");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-tab");
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("on", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== id; });
    });
  });

  // form kontak ke WhatsApp
  var send = $("#wa-send");
  if (send) {
    var nama = $("#nama"), produk = $("#produk"), pesan = $("#pesan"), err = $("#err");
    var build = function () {
      var teks = "Halo Mazo, saya " + (nama.value.trim() || "(nama)") +
        ". Saya tertarik dengan: " + (produk.value || "belum tahu, mohon dibantu") + "." +
        (pesan.value.trim() ? "\n\n" + pesan.value.trim() : "");
      send.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(teks);
    };
    [nama, produk, pesan].forEach(function (el) {
      el.addEventListener("input", build);
      el.addEventListener("change", build);
    });
    send.addEventListener("click", function (e) {
      if (!nama.value.trim()) {
        e.preventDefault();
        err.hidden = false;
        nama.focus();
      } else {
        err.hidden = true;
      }
    });
    build();
  }

  // tombol salin
  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = $(btn.getAttribute("data-copy"));
      var text = target ? target.textContent.trim() : "";
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "Tersalin";
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      var fallback = function () {
        if (!target) { return; }
        var range = document.createRange();
        range.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      };
      try {
        navigator.clipboard.writeText(text).then(done, fallback);
      } catch (e) { fallback(); }
    });
  });
})();
