// Inlined into every fixed-format artifact: fit-to-window scaling, keyboard/touch paging, export hooks. No dependencies.
(function () {
  var pages = Array.prototype.slice.call(document.querySelectorAll('.carry-pageframe'));
  var stage = document.querySelector('.carry-stage');
  var flags = {}; location.search.replace(/[?&]([^=&]+)=?([^&]*)/g, function (_, k, v) { flags[k] = v || '1'; });
  if (flags.export) document.documentElement.setAttribute('data-export', '1');
  if (flags.grey) document.documentElement.style.filter = 'grayscale(1)';
  var cur = 0;
  function fit() {
    var f = pages[cur]; if (!f) return;
    var w = parseFloat(f.getAttribute('data-w')), h = parseFloat(f.getAttribute('data-h'));
    var s = flags.fitwidth ? (window.innerWidth / w) : Math.min(window.innerWidth / w, window.innerHeight / h);
    stage.style.setProperty('--carry-scale', s);
    document.documentElement.style.setProperty('--carry-scale', s);
    stage.style.height = flags.fitwidth ? (h * s) + 'px' : '';
  }
  function go(i) {
    if (!pages.length) return;
    cur = Math.max(0, Math.min(pages.length - 1, i));
    pages.forEach(function (p, j) { p.hidden = j !== cur; });
    var c = document.querySelector('.carry-counter'); if (c) c.textContent = (cur + 1) + ' / ' + pages.length;
    if (location.hash !== '#' + (cur + 1)) history.replaceState(null, '', '#' + (cur + 1));
    fit();
  }
  window.__carry = { go: go, count: pages.length, current: function () { return cur; } };
  window.addEventListener('resize', fit);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { go(cur + 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { go(cur - 1); e.preventDefault(); }
    else if (e.key === 'Home') go(0); else if (e.key === 'End') go(pages.length - 1);
    else if (e.key === 'f' || e.key === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }
  });
  var tx = null;
  document.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) { if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1); tx = null; }, { passive: true });
  var fromHash = parseInt((location.hash || '#1').slice(1), 10);
  go(isNaN(fromHash) ? 0 : fromHash - 1);
})();
