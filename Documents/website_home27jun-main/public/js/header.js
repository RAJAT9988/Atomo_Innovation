(function () {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (!header) return;

  const OPEN_DELAY = 0;
  const CLOSE_DELAY = 100;
  const DURATION = 280;
  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DESKTOP = window.matchMedia("(min-width: 1024px)");

  function updateHeader() {
    const mobileOpen = mobileNav && !mobileNav.classList.contains("hidden");
    header.classList.toggle("site-header--menu-open", mobileOpen);
  }

  updateHeader();

  /* ── Mobile menu ── */
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      const isOpen = !mobileNav.classList.contains("hidden");
      mobileNav.classList.toggle("hidden", isOpen);
      mobileNav.classList.toggle("flex", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      toggle.querySelector(".menu-icon").classList.toggle("hidden", !isOpen);
      toggle.querySelector(".close-icon").classList.toggle("hidden", isOpen);
      document.body.style.overflow = isOpen ? "" : "hidden";
      updateHeader();
    });
  }

  /* ── Desktop mega menu ── */
  const mega = header.querySelector("[data-nav-mega]");
  if (!mega) return;

  const triggers = Array.from(header.querySelectorAll("[data-nav-trigger][data-has-dropdown='true']"));
  const panels = Array.from(mega.querySelectorAll("[data-nav-panel]"));

  let activeIndex = null;
  let openTimer = null;
  let closeTimer = null;
  let isOpen = false;
  let keyboardMode = false;

  function panelByIndex(index) {
    return panels.find(function (p) {
      return p.dataset.navPanel === String(index);
    });
  }

  function triggerByIndex(index) {
    return triggers.find(function (t) {
      return t.dataset.navIndex === String(index);
    });
  }

  function setAriaExpanded(index, expanded) {
    triggers.forEach(function (trigger) {
      const link = trigger.querySelector(".nav-link");
      if (!link) return;
      const match = index !== null && trigger.dataset.navIndex === String(index);
      link.setAttribute("aria-expanded", match && expanded ? "true" : "false");
    });
  }

  function revealLinks(panel, options) {
    options = options || {};
    if (!panel) return;
    if (REDUCED_MOTION) {
      panel.querySelectorAll(".nav-mega__link").forEach(function (link) {
        link.classList.add("nav-mega__link--visible");
      });
      return;
    }
    panel.querySelectorAll(".nav-mega__link").forEach(function (link) {
      link.classList.remove("nav-mega__link--visible");
    });
    const reveal = function () {
      panel.querySelectorAll(".nav-mega__link").forEach(function (link) {
        link.classList.add("nav-mega__link--visible");
      });
    };
    if (options.defer) {
      requestAnimationFrame(function () {
        requestAnimationFrame(reveal);
      });
      return;
    }
    requestAnimationFrame(reveal);
  }

  function showPanel(index, options) {
    options = options || {};
    const switching = isOpen && activeIndex !== null && String(activeIndex) !== String(index);

    if (switching) {
      mega.classList.add("is-switching");
    }

    panels.forEach(function (panel) {
      const active = panel.dataset.navPanel === String(index);
      panel.hidden = false;
      panel.classList.toggle("is-active", active);
      if (!active) {
        panel.querySelectorAll(".nav-mega__link").forEach(function (link) {
          link.classList.remove("nav-mega__link--visible");
        });
      }
    });

    triggers.forEach(function (trigger) {
      trigger.classList.toggle("is-active", trigger.dataset.navIndex === String(index));
    });

    revealLinks(panelByIndex(index), { defer: options.deferLinks });
    activeIndex = index;
    setAriaExpanded(index, true);

    if (switching) {
      window.setTimeout(function () {
        mega.classList.remove("is-switching");
      }, 200);
    }
  }

  function openMega(index) {
    if (!DESKTOP.matches) return;
    clearTimeout(closeTimer);
    clearTimeout(openTimer);

    openTimer = setTimeout(function () {
      if (activeIndex === index && isOpen) {
        return;
      }

      const firstOpen = !isOpen;

      if (firstOpen) {
        isOpen = true;
        mega.classList.add("is-open");
        mega.setAttribute("aria-hidden", "false");
        header.classList.add("site-header--mega-open");
      }

      showPanel(index, { deferLinks: firstOpen });
    }, OPEN_DELAY);
  }

  function closeMega() {
    if (!DESKTOP.matches || !isOpen) return;
    clearTimeout(openTimer);
    clearTimeout(closeTimer);

    closeTimer = setTimeout(function () {
      isOpen = false;
      keyboardMode = false;
      activeIndex = null;
      mega.classList.remove("is-open");
      mega.classList.add("is-closing");
      mega.setAttribute("aria-hidden", "true");
      header.classList.remove("site-header--mega-open");
      triggers.forEach(function (t) {
        t.classList.remove("is-active");
      });
      setAriaExpanded(null, false);

      window.setTimeout(function () {
        mega.classList.remove("is-closing", "is-switching");
        panels.forEach(function (panel) {
          panel.hidden = true;
          panel.classList.remove("is-active");
          panel.querySelectorAll(".nav-mega__link").forEach(function (link) {
            link.classList.remove("nav-mega__link--visible");
          });
        });
      }, REDUCED_MOTION ? 0 : DURATION);
    }, CLOSE_DELAY);
  }

  function cancelClose() {
    clearTimeout(closeTimer);
  }

  function handlePointerEnter(index) {
    if (!DESKTOP.matches) return;
    keyboardMode = false;
    openMega(index);
  }

  triggers.forEach(function (trigger) {
    const index = trigger.dataset.navIndex;

    trigger.addEventListener("mouseenter", function () {
      handlePointerEnter(index);
    });

    trigger.addEventListener("focusin", function () {
      if (keyboardMode) handlePointerEnter(index);
    });

    const link = trigger.querySelector(".nav-link");
    if (link) {
      link.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          if (trigger.dataset.hasDropdown !== "true") return;
          e.preventDefault();
          keyboardMode = true;
          openMega(index);
          const panel = panelByIndex(index);
          const first = panel && panel.querySelector(".nav-mega__link");
          if (first) first.focus();
        }
        if (e.key === "ArrowDown") {
          if (trigger.dataset.hasDropdown !== "true") return;
          e.preventDefault();
          keyboardMode = true;
          openMega(index);
          const panel = panelByIndex(index);
          const first = panel && panel.querySelector(".nav-mega__link");
          if (first) first.focus();
        }
      });
    }
  });

  mega.addEventListener("mouseenter", cancelClose);
  header.addEventListener("mouseenter", cancelClose);

  header.addEventListener("mouseleave", function (e) {
    if (!DESKTOP.matches) return;
    if (!header.contains(e.relatedTarget)) {
      closeMega();
    }
  });

  panels.forEach(function (panel) {
    panel.querySelectorAll(".nav-mega__link").forEach(function (link, i, links) {
      link.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeMega();
          const trigger = activeIndex !== null ? triggerByIndex(activeIndex) : null;
          const triggerLink = trigger && trigger.querySelector(".nav-link");
          if (triggerLink) triggerLink.focus();
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const next = links[i + 1] || links[0];
          next.focus();
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          const prev = links[i - 1] || links[links.length - 1];
          prev.focus();
        }
        if (e.key === "Tab" && e.shiftKey && i === 0) {
          closeMega();
        }
      });
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (mobileNav && !mobileNav.classList.contains("hidden")) {
        mobileNav.classList.add("hidden");
        mobileNav.classList.remove("flex");
        document.body.style.overflow = "";
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.querySelector(".menu-icon").classList.remove("hidden");
        toggle.querySelector(".close-icon").classList.add("hidden");
        updateHeader();
        return;
      }
      if (isOpen) {
        e.preventDefault();
        closeMega();
        if (activeIndex !== null) {
          const trigger = triggerByIndex(activeIndex);
          const link = trigger && trigger.querySelector(".nav-link");
          if (link) link.focus();
        }
      }
    }
  });

  document.addEventListener("click", function (e) {
    if (!header.contains(e.target)) closeMega();
  });

  DESKTOP.addEventListener("change", function () {
    closeMega();
  });
})();
