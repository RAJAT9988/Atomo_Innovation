// Minimal stub so the page doesn't 404 on this script in dev/prod.
// Replace with the official MediaMTX WebRTC reader if you use WHEP/WHIP.
// This file intentionally does not implement a real WebRTC player.
(function () {
  if (typeof window === "undefined") return;
  if (window.MediaMTXWebRTCReader) return;

  window.MediaMTXWebRTCReader = function MediaMTXWebRTCReader(opts) {
    var onError = opts && typeof opts.onError === "function" ? opts.onError : null;
    setTimeout(function () {
      if (onError) onError("MediaMTXWebRTCReader stub: replace public/digital-twin/mediamtx-reader.js with the real implementation.");
    }, 0);

    this.close = function () {};
  };
})();

