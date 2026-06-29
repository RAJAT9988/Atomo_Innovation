/**
 * Atomo homepage — hero video + section interactions
 */
(function () {
  "use strict";

  function initHeroVideo() {
    var hero = document.getElementById("hero-premium");
    var video = document.getElementById("hero-premium-video");
    if (!hero || !video) return;

    function markReady() {
      hero.classList.add("is-ready");
      video.classList.add("is-visible");
    }

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);

    if (video.readyState >= 2) {
      markReady();
    } else {
      video.play().catch(markReady);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroVideo);
  } else {
    initHeroVideo();
  }
})();
